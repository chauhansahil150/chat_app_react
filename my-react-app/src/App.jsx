import Login from './chat_app/login';
import Signup from './chat_app/signup';
import Changepassword from './chat_app/Changepassword';
import Forgot from './chat_app/Forgot';
import Home from './chat_app/Home';
import Forgottoken from './chat_app/Forgot_token';
import Logout from './chat_app/Logout';
// const AuthContext =createContext(); 
// import { 
//     BrowserRouter as Router, 
//     Routes,
//     Route, 
//     Navigate, 
//   } from "react-router-dom"; 
import { Route, Routes } from 'react-router-dom';
import Dashboard from './chat_app/Dashboard';
import Invite from './chat_app/Invite';
// import { SocketState } from './states/socketState';
// import Forgottoken from './e-comm/Forgottoken';
export default function App() {

    return (
        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/login" element={<Login />} >
            </Route>
            <Route path="/signup" element={<Signup />} >
            </Route>

            <Route path="/changepassword" element={<Changepassword />}>
            </Route>

            <Route path="/forgot" element={<Forgot />}>
            </Route>
            <Route path="/home" element={<Home />} >
            </Route>
            {/* <Route path="/verifyemail/:token" element={}></Route> */}
            <Route path="/logout" element={<Logout />}></Route>
            <Route path="/forgot/:token" element={<Forgottoken />}>
            </Route>
            <Route path="/dashboard" element={<Dashboard />}>
            </Route>
            <Route path="/invite/:active" element={<Invite />}>
            </Route>

        </Routes>
    )


}