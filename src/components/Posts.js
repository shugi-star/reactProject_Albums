import React, { useState } from "react";
import { Link } from "react-router-dom";
function Posts(props){
    const [Title, setTitle] = useState("");
    const [text, settext] = useState("");
    const [AllPost, setAllPosts] = useState([]);
    function addPost(){
        //עדכון הפוסט החדש
        const newPost={
            UserId: props.userId,
            title: Title,
            Text: text
        }
        fetch('http://localhost:3001/posts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),//פה הוא לוקח את הנתונים
          })
          .then(res=>res.json()).then(//המרה לרגיל
          console.log(newPost));
    }    
    //שליפת כל הפוסטים של כולם
    function showAllPost(){
        fetch(`http://localhost:3001/posts`)
        .then((response) => response.json())
        .then((json) => {
            setAllPosts(json);
        })
        .catch((error) => console.log(error));
}
    return(

        <>
            <h3>To add a new post</h3>
            <input type="text" placeholder="enter your title" onChange={(e)=>setTitle(e.target.value)}></input>
            <br></br>
            <textarea placeholder="enter your text" onChange={(e)=>settext(e.target.value)}></textarea>
            <br></br>
            <button onClick={addPost}>add</button>
            <br></br>
            <button onClick={showAllPost}>showAllPost</button>
           {/* //לא עובד הלחיצה על פוסט חראות את התגובות שעליו */}
            <div>
        {AllPost.map(post => (
          <Link key={post.id} to={`/posts/${post.id}`}>
            <div>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </div>
          </Link>
        ))}
      </div>
    );</>
       )
      
}
export default Posts;