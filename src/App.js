import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Home from './components/Home';
import Albums from './components/Albums';
import Posts from './components/Posts';
import Register from './components/Register';
import Photos from './components/Photos';
import Todos from './components/Todos';
import Comments from './components/Comments';
import SignOrLogin from './components/SignOrLogin';
import Profile from './components/Profile';
import NotFound from './components/NotFound';
import { Outlet, NavLink, useNavigate, useParams } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
function App() {
  const [userId,setuserId]=useState();//object
  //localStorage.setItem("currentuserId", userId.id, userId.name)||[];
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignOrLogin userId={userId} setuserId={setuserId}/>}/>{/* Default route, shows Login */}
        <Route path="/login" element={<Login userId={userId} setuserId={setuserId}/>}/>{/* Path i can write what i want */}
        <Route path="/register" element={<Register userId={userId} setuserId={setuserId}/>}/>
        <Route path="/profile" element={<Profile userId={userId} setuserId={setuserId}/>}/>
        <Route path="/posts" element={<Posts userId={userId} setuserId={setuserId}/>}/>
        <Route path="/posts/:postId" element={<Comments userId={userId} setuserId={setuserId}/>}/>
        <Route path="/Albums" element={<Albums userId={userId} setuserId={setuserId}/>}/>
        <Route path="/home" element={<Home userId={userId} setuserId={setuserId}/>}/>
        <Route path="/SignOrLogin" element={<SignOrLogin userId={userId} setuserId={setuserId}/>}/>
        <Route path="/Todos" element={<Todos userId={userId} setuserId={setuserId}/>}/>
        <Route path="*" element={<NotFound/>}/>
</Routes></BrowserRouter>
    </div>
  );
}
//if i am in a album and i want to go into a picture, so i need a route mekunan 
//because i am going more inside
export default App;
