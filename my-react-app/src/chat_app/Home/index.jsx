import { useEffect, useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import styles from './style.module.css';
import { Link, json } from "react-router-dom";
import { MdOutlineGroupAdd } from "react-icons/md";
import swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import { GrGroup } from "react-icons/gr";
import Highlighter from "react-highlight-words";
import { CiLocationArrow1 } from "react-icons/ci";
import { VscSend } from "react-icons/vsc";
import { HiUserGroup } from "react-icons/hi2";
import { BsChatLeftTextFill } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";
import io from "socket.io-client";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState([]);
  const [opengroup, setOpengroup] = useState(false);
  const [g_deatils, setGdetails] = useState([]);
  const [active, setActive] = useState([]);
  const [message, setMessage] = useState([]);
  const [mssg, setMsg] = useState("");
  const [username, setUsername] = useState("");
  const [searchm, setsearch] = useState("");
  const [start,setStart]=useState(10);
  const [HasMore,setHasMore]=useState(true);
  const [participants,setParticipants]=useState([]);
  const [v,setView]=useState(false);
  const [found_msg,setfound_msg]=useState(0);
  const [users,setusers]=useState([]);
  // const [flag,setflag]=useState([]);
  const [details,setdetails]=useState([]);
  const [openchat,setopenchat]=useState(false);
  const [fg,setfg]=useState(1);
  const navigate = useNavigate();
  const socket=io.connect("http://localhost:8000");
  
  let token = localStorage.getItem("key");
  
  if (!token) {
    navigate("/login");
  }
  else {
    useEffect(()=>{
      console.log("active",active);
        socket.emit("userId",active)
        socket.on("getusers",(users)=>{
            console.log(users)
        })
    },[active])
    // socket.emit('set_user_id', token);
    useEffect(() => {
      socket.on("server-message", (mess) => {
        let mes=JSON.parse(mess);
        console.log(mes);
        setMessage((prevState) => {
            return [...prevState, ...mes];
        });
      });
      socket.on("getmessage",(mess)=>{
        console.log("s_id",socket.id)
        console.log('hi')
        console.log(mess.data);
        mess=JSON.parse(mess.data);
        setMessage((prevState) => {
            return [...prevState, ...mess];
        });
      })
      
    }, [socket]);
    useEffect(() => {
      async function fun() {
        try {
          const response = await fetch("http://localhost:8000/getgroups", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${token}`
            },

          });

          if (response.ok) {
            const groups = await response.json();
            setGroupName(groups);
          }
        } catch (err) {
          console.log(err);
        }
      }
      fun();
    }, [])
    useEffect(() => {
      async function fun2() {
        try {
          const response = await fetch("http://localhost:8000/getname", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${token}`
            },

          });

          if (response) {
            const f = await response.json();
            // console.log(f);
            setUsername(f[0].name);
            // console.log(username);
            // setUsername(f[0].name);
          }
        }
        catch (err) {
          console.log(err);
        }

      }
      fun2();
    }, []);
    useEffect(() => {
      async function fun2() {
        try {
          const response = await fetch("http://localhost:8000/getalluser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": `${token}`
            },

          });

          if (response) {
            const f = await response.json();
            console.log(f);
            setusers(f);
            
          }
        }
        catch (err) {
          console.log(err);
        }
      }
      fun2();
    }, []);
  }
  const handleOpen = () => {
    setOpen(!open);
  };

  async function createGroup(g_name) {
    try {
      const response = await fetch("http://localhost:8000/creategroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
        body: JSON.stringify({ g_name: g_name }),
      });

      if (response) {
        const r = await response.json();
        return Promise.resolve(r);
      } else {

        return Promise.reject("Failed to create the group");
      }
    } catch (err) {
      console.log(err);
      return Promise.reject(err.message || "An error occurred");
    }
  }

  async function create() {
    try {
      const result = await swal.fire({
        title: "Group Creation",
        html: '<label>Enter Group Name' +
          '<input id="swal-input1" class="swal2-input"><br><br>',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
          return [document.getElementById('swal-input1').value];
        }
      });

      if (result.isConfirmed) {
        let v = result.value;
        if (result.value[0].trim() === "") {
          swal.fire({
            title: "Please Fillout all the fields",
            icon: "warning"
          })
        }
        else {
          const [groupname] = result.value;
          createGroup(groupname)
            .then((data) => {
              setGroupName((prevState) => {
                return [...prevState, data[0]];
              });
              swal.fire({
                title: "Group Created Successfully",
                icon: "success",
              }).then(() => {
                // console.log(groupname);
                // console.log(groupName);
                // setGroupName([...groupName, groupname]);
              });
            })
            .catch((err) => {
              swal.fire({
                title: err,
                icon: "error",
              });
            });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function open_group(id) {
    setHasMore(true);
    setfound_msg(0);
    setsearch("");
    socket.emit("join_group",id);
    // console.log(searchm);
    try {
      const response = await fetch("http://localhost:8000/getdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
        body: JSON.stringify({ id: id })
      });

      if (response) {
        const r = await response.json();
        setGdetails(r);
        setActive(id);
        setOpengroup(true);
      }
    }
    catch (err) {
      console.log(err);
    }
    try {
      const response = await fetch("http://localhost:8000/getmessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
        body: JSON.stringify({ id: id,start:0,count:10 })
      });

      if (response) {
        const r = await response.json();
        // console.log(r);
        r.reverse();
        setMessage(r);

      }
    }
    catch (err) {
      console.log(err);
    }
  }
  function sel() {
    navigate(`/invite/${active}`);
  }
  async function handlemessage() {
    if (mssg.trim() == "") {
      swal.fire({
        title: "Please enter something",
        icon: "warning"
      })
      setMsg("");
    }
    else {
      let obj={g_id:active,message:mssg.trim(),token:token};
      socket.emit("new-message",obj);
      setMsg("");
     }
  }
  async function handlemessage2() {
    if (mssg.trim() == "") {
      swal.fire({
        title: "Please enter something",
        icon: "warning"
      })
      setMsg("");
    }
    else {
      // let obj={g_id:active,message:mssg.trim(),token:token};
      socket.emit("sendMessage",{senderId:token,receiverId:active,message:mssg.trim()});
      setMsg("");
     }
  }
  function msg(e) {
    setMsg(e.target.value);
    // console.log(mssg);
  }
 
  async function search(e) {
    setsearch(e.target.value.trim());
    if(e.target.value.trim()!=="")
    {    
    try {
      const response = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
        body: JSON.stringify({ id:active,value:e.target.value.trim() })
      });

      if (response) {
        const r = await response.json();
        setfound_msg(r[0].total);

      }
    }
    catch (err) {
      console.log(err);
    }
  }
  else{
    setfound_msg(0);
    e.target.value="";
    setsearch("");
  }
  }

 async function fetchMoreData(e) {
    let a = e.target.scrollHeight, b = e.target.clientHeight;
    
    if ((-(((e.target.scrollTop).toFixed())) >= (a - b-5)) && HasMore) {
          // console.log("yes");
      try {
        const response = await fetch("http://localhost:8000/getmessages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
          body: JSON.stringify({ id: active,start:start,count:10 })
        });
  
        if (response.ok) {
          // console.log(response);
          const r = await response.json();
          // console.log(r);
          if(r.length===0)
          {
            setHasMore(false);
          }
          else{
            setStart(start+10);
          }
          // console.log(r);
          // r.reverse();
          setMessage((prevState)=>{return([...r.reverse(),...prevState])});
          e.target.scrollTo({
            top: -((a - b-5).toFixed()),
            behaviour: "smooth"
        })
  
        }
      }
      catch (err) {
        console.log(err);
      }
        
       }
}
async function fetchMoreData2(e) {
  let a = e.target.scrollHeight, b = e.target.clientHeight;
  
  if ((-(((e.target.scrollTop).toFixed())) >= (a - b-5)) && HasMore) {
        // console.log("yes");
    try {
      const response = await fetch("http://localhost:8000/getchatmessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
        body: JSON.stringify({ id: active,start:start,count:10 })
      });

      if (response.ok) {
        // console.log(response);
        const r = await response.json();
        // console.log(r);
        if(r.length===0)
        {
          setHasMore(false);
        }
        else{
          setStart(start+10);
        }
        // console.log(r);
        // r.reverse();
        setMessage((prevState)=>{return([...r.reverse(),...prevState])});
        e.target.scrollTo({
          top: -((a - b-5).toFixed()),
          behaviour: "smooth"
      })

      }
    }
    catch (err) {
      console.log(err);
    }
      
     }
}
async function view()
{
  if(v)
  {
    setView(false);
  }
  else{
  try {
    const response = await fetch("http://localhost:8000/getparticipants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": `${token}`,
      },
      body: JSON.stringify({ id: active})
    });

    if (response.ok) {
      let p=await response.json();
      // console.log(participants);
      setParticipants(p);
      setView(true);
    }
  }
  catch (err) {
    console.log(err);
  }
}
}
function fun_change(){
   if(fg===1){
    setfg(0)
   }
   else{
    setfg(1)
   }
}
async function open_chat(id){
    
    console.log(id);
    try {
      const response = await fetch("http://localhost:8000/getuserdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
        body: JSON.stringify({ id: id})
      });
  
      if (response.ok) {
        let p=await response.json();
        console.log(p);
        setdetails(p);
        setopenchat(true);
        setOpengroup(false);
        setActive(id);
      }
    }
    catch (err) {
      console.log(err);
    }
    try {
      const response = await fetch("http://localhost:8000/getchatmessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
        body: JSON.stringify({ id: id,start:0,count:10 })
      });

      if (response) {
        const r = await response.json();
        console.log(r);
        r.reverse();
        setMessage(r);

      }
    }
    catch (err) {
      console.log(err);
    }
    
}
  return (
    <>
      <div id={styles.body}>
        <div className={styles.dropdown}>
          <button onClick={handleOpen} className={styles.dropbtn}>
            <AiOutlineMenu />
          </button>
          {open ? (
            <div className={styles.dropdown_content}>
              <li>
                <Link to="/logout">Logout</Link>
              </li>
              <li>
                <Link to="/changepassword">Change Password</Link>
              </li>
              <li>
                <Link to="/dashboard">DashBoard</Link>
              </li>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <h1 className={styles.margin}>Welcome<MdOutlineGroupAdd className={styles.float} title="Create New Group" onClick={create} /></h1>
      </div>
      <div className={styles.flex}>
      <div><HiUserGroup title="Groups" className={styles.g2} onClick={fun_change}/>
      <BsChatLeftTextFill title="Chats" className={styles.g2} onClick={fun_change}/></div>
        <div >{fg==1?
          <div className={styles.left_side}>{groupName.length == 0 ? <div className={styles.nogroups}>No Groups Yet!!</div> :
            <div className={styles.groups}>
              {groupName.map((group) => (
                <li key={group.group_id} className={styles.li} onClick={() => open_group(group.group_id)}><MdOutlineGroupAdd className={styles.r} />{group.group_name}</li>
              ))}
            </div>}
          </div>:<div className={styles.left_side}>{users.length == 0 ? <div className={styles.nogroups}>No Users Yet!!</div> :
            <div className={styles.groups}>
              {users.map((group) => (
                <li key={group.mailtoken} className={styles.li} onClick={() => open_chat(group.mailtoken)}><BsPersonCircle  className={styles.r} />{group.name}</li>
              ))}
            </div>}
          </div>}
        </div>
        <div className={styles.ri}>
          {opengroup ? <div >
            <div className={styles.ri3}>
            <h2><MdOutlineGroupAdd />{g_deatils[0].group_name}
              <input type="search" placeholder="Search Post" className={styles.input} onChange={(e) => search(e)} value={searchm}/>
              {found_msg?<input type="text" value={`Match Found=${found_msg}`} className={styles.found}/>:<span></span>}
              {/* <button className={styles.btn} title="invite friends" onClick={sel}>Invite</button> */}
              {/* <BsSendArrowDown className={styles.btn}/> */}
              <CiLocationArrow1 className={styles.invite} title="Invite Friends" onClick={sel}/>
              {/* <FaLocationArr/> */}
              <GrGroup className={styles.parti} title="View Participants" onClick={view}/>
              
              <p className={styles.g}>Group created on {g_deatils[0].start_date}</p>
            </h2>
            </div>
            {v?<div className={styles.view}>
                {participants.map((p)=>(
                  <li>{p.name}</li>
                ))}
              </div>:<div></div>}
            
            <div className={styles.ri2} onScroll={(e)=>{fetchMoreData(e)}}>
            <ul >
              {message.map((message,i) => (
                <li className={styles.msg} key={i}>
                  <p className={styles.left}><b>{message.name === username ? "You" : message.name}</b></p><br></br>
                  <p className={styles.left}><Highlighter
                                                    highlightClassName={styles.highlight}
                                                    searchWords={[searchm]}
                                                    autoEscape={true}
                                                    textToHighlight={message.message}
                                                /></p>
                  <br></br>
                  <p className={`${styles.float} ${styles.s}`}>{message.date_message}<br />{message.time}</p>
                  
                </li>
                
              ))}
            </ul>
            </div>
            <div className={styles.post}>
              <input type="text" placeholder="Post Message.." className={styles.input} onChange={(e) => msg(e)} value={mssg}></input>
              <button className={styles.btn} onClick={handlemessage}><VscSend /></button>
            </div>
          </div> : openchat?<div>
            <h2><BsPersonCircle />{details[0].name}</h2>
            <input type="search" placeholder="Search Post" className={styles.input2} onChange={(e) => search(e)} value={searchm}/>

            <div className={styles.ri2} onScroll={(e)=>{fetchMoreData2(e)}}>
            <ul >
              {message.map((message,i) => (
                <li className={styles.msg} key={i}>
                  <p className={styles.left}><b>{message.name === username ? "You" : message.name}</b></p><br></br>
                  <p className={styles.left}><Highlighter
                                                    highlightClassName={styles.highlight}
                                                    searchWords={[searchm]}
                                                    autoEscape={true}
                                                    textToHighlight={message.message}
                                                /></p>
                  <br></br>
                  <p className={`${styles.float} ${styles.s}`}>{message.date_message}<br />{message.time_message}</p>
                  
                </li>
                
              ))}
            </ul>
            </div>

            <div className={styles.post}>
              <input type="text" placeholder="Post Message.." className={styles.input} onChange={(e) => msg(e)} value={mssg}></input>
              <button className={styles.btn} onClick={handlemessage2}><VscSend /></button>
            </div>
            </div>:<div className={styles.non}><h2>
            <MdOutlineGroupAdd />
            Select a group or Chat to see posts</h2></div>}
        </div>
      </div>
    </>
  )
}