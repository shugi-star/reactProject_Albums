import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import React from 'react';
function Login(props){
const [currentUserName, setCurrentUserName] = useState("");
  const [currentPassWord, setCurrentPassWord] = useState("");
  const[currentUserEmail,setCurrentEmail]=useState("");
  const [userArray, setUserArray] = useState([]);
  const navigate = useNavigate();
  //שליפת המשתמשים
  useEffect(() => {
    fetch('http://localhost:3001/users')
      .then((response) => response.json())
      .then((json) => setUserArray(json))
      .catch((err) => console.error(err)); // טיפול בשגיאות
  }, []);

  //המרה של המשתמשים לרגיל
  const Allusers = userArray || [];  //מציאה אם המשתמש קיים
  //מציאה אם המשתמש קיים
  const isUserPresent = Allusers.find(user => user.name === currentUserName&& user.website === currentPassWord); //verify if name and login are right 
  const UserPresentPasswordWrong=Allusers.find(user=>user.name=== currentUserName&& user.website != currentPassWord);//password not good !!!

  const handleClick=(event)=>{
      if(isUserPresent){
        localStorage.setItem('currentUser',JSON.stringify(isUserPresent))
        props.setuserId(isUserPresent.id);
        console.log(props.userId);
        navigate(`/home`);
          }
      else if(UserPresentPasswordWrong){//message + reset the password
          alert("Your password is wrong. Please try again")
      }
          else{
              alert("The user is not found, you are transmitted to the sign up page")
              navigate(`/Register`);
          } 
      
  }
   return(
       <>
       <h3>Login</h3>
        <input placeholder="name" onChange={(e)=>setCurrentUserName(e.target.value)}></input>{/*Update state with input value* */} 
        <input type="password" placeholder="password" onChange={(e) => setCurrentPassWord(e.target.value)} />
        <input placeholder="email" onChange={(e) => setCurrentEmail(e.target.value)} />
        <br/>
        <br/>
        <button onClick={handleClick}> submit </button>
        
       </>
   ) 
}
export default Login;