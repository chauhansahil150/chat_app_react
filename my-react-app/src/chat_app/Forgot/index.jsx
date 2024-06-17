import { useState } from 'react';
import styles from './style.module.css';
import swal from 'sweetalert2';
export default function Forgot()
{
    const [email,setEmail]=useState('');
    const [status,setStatus]=useState('');
    const ptrn = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    async function check()
    {
        if(email.trim()=='')
        {
            swal.fire({
                title:"Please Enter email",
                icon:"warning"
            })
        }
        else if(!email.trim().match(ptrn))
        {
            swal.fire({
                title:"Enter valid email",
                icon:"warning"
            })
        }
        else{
            try{
                const response = await fetch("http://localhost:8000/forgot", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body:JSON.stringify({id:email.trim()}),
              })
              
              .then(function(response)
              {
                
                let data= response.json();
                return data;
              })
              .then(function(data){
                // setloggedin(true);
              
                if (data.status == 201) {
                    setStatus('correct');
                    localStorage.setItem("key", data.token);
                    console.log("true");
                }
                else if(data.status==203)
                {
                    setStatus('incorrect');
                }
               
              })}
              catch(err)
              {
                 console.log(err);
              }
        }
    }
    return (
        <>
        {status=='correct'?(<div className={styles.div}>
            <h1>Forgot Password</h1>
            <label>Enter your registered email address</label>
            <input type="email" placeholder="Email Address*" name="email" id="email"  value={email} 
                        onChange={(e) => setEmail(e.target.value)} className={styles.input}/>
            <input type="submit" value="RESET PASSWORD" className={styles.btn} onClick={()=>check()}/>
             <h3 className={styles.h} >Check your E-mail</h3>
                
                </div>):
        (status=='incorrect'?(<div className={styles.div}>
            <h1>Forgot Password</h1>
            <label>Enter your registered email address</label>
            <input type="email" placeholder="Email Address*" name="email" id="email"  value={email} 
                        onChange={(e) => setEmail(e.target.value)} className={styles.input}/>
            <input type="submit" value="RESET PASSWORD" className={styles.btn} onClick={()=>check()}/>
            <h3 className={styles.h} >Your E-mail is not registered</h3>

                </div>):
                (<div className={styles.div}>
                    <h1>Forgot Password</h1>
            <label>Enter your registered email address</label>
            <input type="email" placeholder="Email Address*" name="email" id="email"  value={email} 
                        onChange={(e) => setEmail(e.target.value)} className={styles.input}/>
            <input type="submit" value="RESET PASSWORD" className={styles.btn} onClick={()=>check()}/>
            
                </div>))}
        </> 
    )
}