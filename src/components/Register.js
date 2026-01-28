import { useState,useEffect } from 'react'
import { useNavigate,useParams } from "react-router-dom";
import React from 'react';
function Register(props){
  //const UserContext = createContext();
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentPassWord, setCurrentPassWord] = useState("");
  const [currentUserEmail,setCurrentEmail]=useState("");
  const [userArray, setUserArray] = useState([]);
  // const [newUserData,setNewUserData]=useState({name:"", email:"", website:""})
  const navigate = useNavigate();
  //שליפת המשתמשים
  useEffect(() => {
    fetch(`http://localhost:3001/users`)
      .then((response) => response.json())
      .then((json) => setUserArray(json))
      .catch((err) => console.error(err)); // טיפול בשגיאות
  }, []);

  // //המרה של המשתמשים לרגיל
  // const Allusers = userArray ? JSON.parse(userArray) : [];
  // //מציאה אם המשתמש קיים
  // const isUserPresent = Allusers.find(user => user.name === currentUserName&& user.password === currentPassWord); //verify if name and login are right 
  
  const handleClick=(event)=>{
    //המרה של המשתמשים לרגיל
    const Allusers = userArray || [];  //מציאה אם המשתמש קיים
  const isUserPresent = Allusers.find(user => user.name === currentUserName&& user.website === currentPassWord); //verify if name and login are right 
     if(!isUserPresent){// אם לא קיים אחד כזה
    
      const NewUserData= {  //שמירת המשתמש הנוכחי
      name: currentUserName,
      email: currentUserEmail, 
      website: currentPassWord};

      // console.log(NewUserData);

    fetch('http://localhost:3001/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(NewUserData),//פה הוא לוקח את הנתונים
    })
    .then(res=>res.json())//המרה לרגיל
    .then(currentUser=>{
      // console.log(currentUser);
      console.log(props.userId);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    
      //שמירת רק של הid של המשתמש
    props.setuserId(currentUser.id);
   
       //ניתוב לדף הבית
    navigate(`/Home`);
    })
    .catch((error) => {
      console.error('Error:', error);
      
    });
    // //const newUser = {id:id, name: currentUserName, password: currentPassWord,email:currentUserEmail};
    // const allUsers = [...userArray, newUser];
    // localStorage.setItem("users", JSON.stringify(allUsers));  // Save updated user list   
        }
    else{
            alert("The user is already registered, you are transmitted to the login page")
            navigate(`/Login`);
        } 
}
    return(
        <>
        <h3>Register</h3>
         <input placeholder="name" onChange={(e)=>setCurrentUserName(e.target.value)}></input>{/*Update state with input value* */} 
         <input type="password" placeholder="password" onChange={(e) => setCurrentPassWord(e.target.value)} />
         <input placeholder="email" onChange={(e) => setCurrentEmail(e.target.value)} />
         <br/>
         <br/>
         <button onClick={handleClick}> submit </button>
         
        </>
    ) 
}
export default Register;