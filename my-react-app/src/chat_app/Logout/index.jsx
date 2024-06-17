import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Logout()
{
    const navigate=useNavigate();
    useEffect(()=>{
          let t=localStorage.getItem("key");
          if(t)
          {
            localStorage.clear();
            navigate("/login");
          }
          else{
            navigate("/login");
          }
    },[])
}