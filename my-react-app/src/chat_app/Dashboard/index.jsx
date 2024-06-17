import { useEffect, useState } from 'react';
import styles from './style.module.css';
export default function Dashboard()
{
    const [groups,setGroups]=useState([]);
    const [users,setUsers]=useState([]);
    const [region,setRegion]=useState([]);
    function handledash(e)
    {
        console.log(e.target.value);
        async function fun()
        {
            try {
                const response = await fetch("http://localhost:8000/topgroup", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    // "x-access-token": `${token}`,
                },
                body:JSON.stringify({v:e.target.value})
      
                });
      
                if (response) {
                  const groups = await response.json();
      
                  // console.log(groups);
                  console.log(groups);
                  setGroups(groups);
                }
              } catch (err) {
                console.log(err);
              }
      
        }
        fun();
        async function fun2()
        {
            try {
                const response = await fetch("http://localhost:8000/topuser", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    // "x-access-token": `${token}`,
                },
                body:JSON.stringify({v:e.target.value})
      
                });
      
                if (response) {
                  const user = await response.json();
      
                  // console.log(groups);
                  console.log(user);
                  setUsers(user);
                }
              } catch (err) {
                console.log(err);
              }
      
        }
        fun2();
        async function fun3()
        {
            try {
                const response = await fetch("http://localhost:8000/topregion", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    // "x-access-token": `${token}`,
                },
                body:JSON.stringify({v:e.target.value})
      
                });
      
                if (response) {
                  const region = await response.json();
      
                  // console.log(groups);
                  console.log(region);
                  setRegion(region);
                }
              } catch (err) {
                console.log(err);
              }
      
        }
        fun3();

    }
    useEffect(()=>{
        async function fun()
        {
            try {
                const response = await fetch("http://localhost:8000/topgroup", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    // "x-access-token": `${token}`,
                },
                body:JSON.stringify({v:0})
      
                });
      
                if (response) {
                  const groups = await response.json();
      
                  // console.log(groups);
                  console.log(groups);
                  setGroups(groups);
                }
              } catch (err) {
                console.log(err);
              }
      
        }
        fun();
    },[])
    useEffect(()=>{
        async function fun2()
        {
            try {
                const response = await fetch("http://localhost:8000/topuser", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    // "x-access-token": `${token}`,
                },
                body:JSON.stringify({v:0})
      
                });
      
                if (response) {
                  const user = await response.json();
      
                  // console.log(groups);
                  console.log(user);
                  setUsers(user);
                }
              } catch (err) {
                console.log(err);
              }
      
        }
        fun2();
    },[])
    useEffect(()=>{
        async function fun2()
        {
            try {
                const response = await fetch("http://localhost:8000/topregion", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    // "x-access-token": `${token}`,
                },
                body:JSON.stringify({v:0})
      
                });
      
                if (response) {
                  const region = await response.json();
      
                  // console.log(groups);
                  console.log(region);
                  setRegion(region);
                }
              } catch (err) {
                console.log(err);
              }
      
        }
        fun2();
    },[])
    
    return(
        <>
        <h1>Welcome to Dashboard</h1>
        <div className={styles.flex}>
                 <div className={styles.div}><h2>Top 5 Trending Groups</h2>
                 {groups.length===0?<li className={styles.red}>Opps!<br></br>No Trending Groups</li>:(
                  <ul>
                 {groups.map((g,i)=>(
                    <li className={styles.li} key={i}><b>Group Name:</b>{g.group_name} <br></br><b>No. of message:</b>{g.m}</li>
                 ))}
                 </ul>)}
                 </div>
                 <div className={styles.div}><h2>Top 5 Trending Regions</h2>
                 {region.length===0?<li className={styles.red}>Opps!<br></br>No Trending Region</li>:
                 <ul>
                 {region.map((r,i)=>(
                      <li className={styles.li} key={i}><b>Region Name:</b>{r.region}<br></br><b>Active User:</b>{r.active_users_count}</li>
                  ))}
                  </ul>}
                 </div>
                 <div className={styles.div}><h2>Top 5 Users</h2>
                 {users.length===0?<li className={styles.red}>Opps!<br></br>No Trending Users</li>:
                 <ul>
                 {users.map((u,i)=>(
                    <li className={styles.li} key={i}><b>User Name:</b>{u.name}<br></br><b>No.of Messages:</b>{u.m}</li>
                 ))}
                 </ul>}
                 </div>
        </div>
        {/* <div>
            <input type="date"/>
            <input type="date" />
        </div> */}
        <div className={styles.select}>
            <select className={styles.s} onChange={(e)=>handledash(e)}>
                <option value="0">Today</option>
                <option className={styles.o} value="7">Last Week</option>
                <option className={styles.o} value="15">Last 15 Days</option>
                <option className={styles.o} value="30">Last 30 Days</option>
            </select>
        </div>
        </>
    )
}