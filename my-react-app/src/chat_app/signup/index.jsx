import React, { useState } from 'react';
import styles from './style.module.css';
import { Link } from "react-router-dom";
import swal from 'sweetalert2';
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const [region,setRegion]=useState('');
  const [nameexist,setNameexist]=useState(false);

  const p = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,15}$/;
  const p2 = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  const handleSubmit = async () => {
    if (name.trim() === '' || email.trim() === '' || password.trim() === '' || region.trim()==='') {
      swal.fire({
        title:"Please fill out all the fields",
        icon:"warning"
      })
      // alert('Please fill out all the fields');
    // } else if (!password.trim().match(p)) {
    //   swal.fire({
    //     title:"Please choose a strong password",
    //     icon:"warning"
    //   })
      // alert('Please choose a strong password');
    } else if (!email.trim().match(p2)) {
      swal.fire({
        title:"Please enter a valid email",
        icon:"warning"
      })
      // alert('Please enter a valid email');
    } else {
      try {
        const response = await fetch('http://localhost:8000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: name.trim(), email: email.trim(), password: password.trim(),region:region.trim(),mailtoken:Date.now() }),
        })
        .then(function(response)
        {
            if(response.status===200)
            {
                setCheckEmail(true);
                setEmailExists(false);
            }
            else if(response.status==201)
            {
                setEmailExists(true);
                setCheckEmail(false);
            }
            else if(response.status==202){
                // setEmailExists(false);
                setNameexist(true);
                setCheckEmail(false);
            }
        })

        // const data = await response.text();
        // if (data === 'exist') {
        //   setEmailExists(true);
        //   setCheckEmail(false);
        // } else if (data === 'check') {
        //   setCheckEmail(true);
        //   setEmailExists(false);
        // } else {
        //   setEmailExists(false);
        //   setCheckEmail(false);
        // }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div id={styles.signup}>
      <h1>SIGNUP</h1>
      <label>Enter username:</label>
      <input
        type="text"
        placeholder="Name"
        name="name"
        id="name"
        value={name}
        className={styles.back}
        onChange={(e) => setName(e.target.value)}
        required
      /><br />
      <label className={styles.email_i}>Enter Email:</label>
      <input
        type="email"
        placeholder="abc@gmail.com"
        name="email"
        
        value={email}
        className={styles.back}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br />
      <label>Enter Password:</label>
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        className={styles.back}
        onChange={(e) => setPassword(e.target.value)}
        required
      /><br />
      <label className={styles.email_i}>Enter Region:</label>
      <input
        type="text"
        placeholder="Region"
        name="region"
        value={region}
        className={styles.back}
        onChange={(e) => setRegion(e.target.value)}
        required
      /><br />
      <Link to="/login" className={styles.btn}>Login</Link>
      <input
        type="submit"
        value="Submit"
        id={styles.submit_signup}
        
        onClick={handleSubmit}
      /><br /><br />
      
      {/* <Link to="/signupas_seller">Signup as Seller</Link> */}
      <p>{message}</p>
      <p id={styles.e} className={styles.p} style={{ display: emailExists ? 'block' : 'none' }}>Your Email already exists</p>
      <p id={styles.c} className={styles.p} style={{ display: checkEmail ? 'block' : 'none' }}>Check Your Email</p>
      <p id={styles.c} className={styles.p} style={{ display: nameexist ? 'block' : 'none' }}>Choose a unique Username</p>
    </div>
  );
}

export default Signup;

