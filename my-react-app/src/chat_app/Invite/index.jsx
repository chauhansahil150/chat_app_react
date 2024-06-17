import { useEffect, useState } from "react"
import styles from './style.module.css';
import { json, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Invite()
{
    const [friends,setFriends]=useState([]);
    const [confirmationStatus, setConfirmationStatus] = useState({});
    const [buttonText, setButtonText] = useState({});

    const {active}=useParams();
    const navigate=useNavigate();
    console.log(active);
    let token=localStorage.getItem("key");
    if(token)
    {
    useEffect(()=>{
        async function fun()
        {
            try {
                const response = await fetch("http://localhost:8000/getfriends", {
                  method: "POST",
                  headers: { "Content-Type": "application/json",
                  "x-access-token": `${token}`},
                  body:JSON.stringify({g_id:active})
                });
        
                if (response) {
                  const f = await response.json();
                  console.log(f);
                  setFriends(f);
                }
              } catch (err) {
                console.log(err);
              }
        }
       fun();
    },[]);
}
else{
    navigate("/login");
}
async function inv(email)
{
    try {
        const response = await fetch("http://localhost:8000/sendinvitation", {
          method: "POST",
          headers: { "Content-Type": "application/json",
          "x-access-token": `${token}`},
          body:JSON.stringify({id:active,email:email})
        });

        if (response.status===200) {
        //   const f = await response.json();
        //   console.log(f);
        //   setFriends(f);
        
        setButtonText((prevButtonText) => ({
            ...prevButtonText,
            [email]: "Invited",
          }));
          setConfirmationStatus((prevStatus) => ({
            ...prevStatus,
            [email]: true,
          }));
        }
      } catch (err) {
        console.log(err);
      }
}
function load()
{
    console.log(friends);
    return(
        
    friends.map((f)=>(
        <tr key={f.email}>
            <td className={styles.cell}>{f.name}</td>
            <td className={styles.cell}>{f.email}</td>
            <td className={styles.cell}>{f.region}</td>
            <td className={styles.cell}><button disabled={confirmationStatus[f.email]}  className={
              confirmationStatus[f.email]
                ? styles.dis
                : styles.btn} onClick={()=>inv(f.email)}>{buttonText[f.email] || "Invite"}</button></td>
        </tr>
    )))
}    
return(
    <><h1>Invite Friends</h1>
      {friends.length==0?<>
      <h2 className={styles.no}>Oops!!</h2>
      <h2 className={styles.no}>No Available users to Invite</h2></>:
    //   (friends.map((f)=>{
    //     <p>{f.name}</p>
    //   }))
    (
        <table className={styles.back}>
            <tr className={styles.tr}>
            <th className={styles.cell}>User Name</th>
            <th className={styles.cell}>User Email</th>
            <th className={styles.cell}>Region</th>
            <th className={styles.cell}>Option</th>
            </tr>
            {load()}
        </table>
    )
      }
    </>)
}