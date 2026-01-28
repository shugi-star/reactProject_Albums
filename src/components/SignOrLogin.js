import React from "react"; 
import { useNavigate } from "react-router-dom";
function SignOrLogin() {//props receive from App
    
    const navigate = useNavigate();
    function handleClickLogin() {
        navigate(`/Login`);
    }

    function handleClickSignUp() {
        navigate(`/Register`); 
    }

    return (
        <div className="SignOrLogin">
            <h2>Welcome!</h2>
            <br />
            <button onClick={handleClickSignUp}>Sign Up</button>
            <button onClick={handleClickLogin}>Login</button>

            
        </div>
    );
}

export default SignOrLogin;