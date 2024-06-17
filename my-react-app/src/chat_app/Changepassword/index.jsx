import React from "react";
import styles from './style.module.css';
import {AiOutlineMenu} from 'react-icons/ai';
import {AiFillEye} from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import  { useContext, useEffect, useState } from 'react';
import swal from 'sweetalert2';
export default function Changepassword()
{
  //   const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');
  // const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [lowerValid, setLowerValid] = useState(false);
  const [upperValid, setUpperValid] = useState(false);
  const [numValid, setNumValid] = useState(false);
  const [lengthValid, setLengthValid] = useState(false);
  const [specialValid, setSpecialValid] = useState(false);
  const [labelVisible, setLabelVisible] = useState(false);
  const [passwordType, setPasswordType] = useState('password');
  const [passwordType2, setPasswordType2] = useState('password');
  const navigate=useNavigate();
  useEffect(()=>{
    const t=localStorage.getItem("key");
    if(!t)
    {
      navigate("/login");
    }
  },[])
  const handleNewPasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    
    setLowerValid(/[a-z]/.test(value));
    setUpperValid(/[A-Z]/.test(value));
    setNumValid(/[0-9]/.test(value));
    setLengthValid(value.trim().length >= 8 && value.trim().length <= 15);
    setSpecialValid(/[!@#$%^&*_=+-]/.test(value));
  };
  const handleConfirmPasswordChange = (event) => {
    const value = event.target.value;
    setConfirmPassword(value);
  };
  
  const updatePassword = () => {
    if (password.trim() === '' && confirmPassword.trim() === '') {
      swal.fire({
        title:"Please fillout both the fields",
        icon:"warning"
      })
      
    }
     else if (password.trim() === confirmPassword.trim()) 
     {
      if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,15}$/.test(password.trim()))
      {
        
        const fun = async () => {
          let t=localStorage.getItem("key");
          // t=t.split(":");
          try {
            const response = await fetch("http://localhost:8000/change_password", {
              method: "POST",
              headers: { "Content-Type": "application/json",
              "x-access-token": `${t}` },
              body:JSON.stringify({value:password.trim()}),
            });
            if (response.status==200) {
              // console.log(response.status==402);
              
              navigate("/home");
            }
            else{
              navigate("/login");
            }
            // else if(response.status===403)
            // {
            //   navigate("/seller");
            // }
            // else if(response.status===404)
            // {
            //   navigate("/products");
            // }
          }
          catch (err) {
            console.log(err);
          }
    
        }
        fun();
      }
      
    } 
    else if(password.trim() != confirmPassword.trim()) {
      console.log("yes");
      setLabelVisible(true);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };
  const togglePasswordVisibility2 = () => {
    setPasswordType2(passwordType2 === 'password' ? 'text' : 'password');
  };
  
  const backgroundImageStyle = {
    // backgroundImage: 'url("/path-to-your-image.jpg")',
    // backgroundSize: 'cover',
    // backgroundRepeat: 'no-repeat',
    background: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    height:'600px',
    position:'relative',
    // backgroundBlendMode: 'darken'
  };
  return (
    <>
    
    <div style={backgroundImageStyle}>
      <h1>Change your login details</h1>
      <div>
        <p className={styles.green}>The Password has to be</p>
        <ul>
          <li className={`${lengthValid?styles.valid:styles.invalid} ${styles.list}`}>Minimum 8 characters long and maximum 15 characters</li>
          <li className={`${upperValid?styles.valid:styles.invalid} ${styles.list}`}>One Uppercase letter at least</li>
          <li className={`${lowerValid?styles.valid:styles.invalid} ${styles.list}`}>One Lowercase letter at least</li>
          <li className={`${numValid?styles.valid:styles.invalid} ${styles.list}`}>One Number</li>
          <li className={`${specialValid?styles.valid:styles.invalid} ${styles.list}`}>One Special character</li>
        </ul>
        <br />
        <input
          type={passwordType}
          placeholder="New Password"
          value={password}
          onChange={handleNewPasswordChange}
          className={styles.input}
          required
        />
        <span onClick={togglePasswordVisibility}>
          <AiFillEye/>
        </span>
        <br />
        <input
          type={passwordType2}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className={styles.input}
          required
        />
        <span onClick={togglePasswordVisibility2}>
          <AiFillEye/>
        </span>
       
        <br/>
        
        <input type="submit" value="Update" id="update" className={styles.update} onClick={updatePassword} />
        
        {labelVisible ?<label className={styles.label}>New password and confirm password must be same</label>:<p></p>}
         <br/>     
      </div>
    </div>
    
    </>
  );
    
}