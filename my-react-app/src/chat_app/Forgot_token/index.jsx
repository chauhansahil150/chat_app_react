import { useNavigate ,useParams} from "react-router-dom";
import { useEffect } from "react";

export default function Forgottoken() {
  const navigate = useNavigate();
  const { token } = useParams();
  console.log(token);
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await fetch(`http://localhost:8000/forgot/${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            
          },
        });

        if (response.status == 200) {
          
          navigate("/changepassword");
        } else if (response.status == 201) {
          navigate("/forgot");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
}
