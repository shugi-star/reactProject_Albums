
import { useState,useEffect } from 'react'

import React from 'react';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Comment_Single from '../components/Comment_Single'
function Photos() {
    const [allCommentsArray, setAllCommentsArray] = useState([]); // List of all todos
    const [allPostCommentsArray, setAllPostCommentsArray] = useState([]); // List of all todos
    const [window, setWindow] = useState(false); // To toggle dropdown visibility
    const [newCommentName, setNewCommentName] = useState('');
    const [newCommentBody, setNewCommentBody] = useState('');
 const [userArray,setUserArray]=useState([])
  const { postNum } = useParams(); 
  const user=JSON.parse(localStorage.getItem("userFound"))
  console.log(user);
  const myEmail=user.email

  useEffect(() => {
    fetch(`http://localhost:3001/comments?postId=${postNum}`)
      .then((response) => response.json())
      .then((json) => {
        setAllPostCommentsArray(json);

      })
      .catch((err) => console.error(err));
  }, [])
  useEffect(() => {
    fetch(`http://localhost:3001/comments`)
      .then((response) => response.json())
      .then((json) => {
        setAllCommentsArray(json);

      })
      .catch((err) => console.error(err));
  }, [])
 const openAddComment=()=>{

    setWindow(true)
 
  }
  const addComment = () => {
    // Fetch todos for the user


    console.log(allCommentsArray);
    let newComment = {
      postId: JSON.parse(postNum),
      id: JSON.stringify(JSON.parse(allCommentsArray[allCommentsArray.length - 1].id) + 1),
   
      name: newCommentName,
      body: newCommentBody,
email:myEmail
    }
    fetch('http://localhost:3001/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // מוודא שהשרת מבין שזה JSON
      },
      body: JSON.stringify(newComment), // ממיר את formData למחרוזת JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to post data');
        }
        return response.json();
      })

      .then((data) => {
        console.log('Successfully added:', data);
   
        setAllPostCommentsArray((prevPosts) => [...prevPosts, data]);
        setAllCommentsArray((prevPosts) => [...prevPosts, data]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setWindow(false)
  };

  let commentList = allPostCommentsArray
  .map((comment, index) => (
    
    <Comment_Single comment={comment} index={index} 
    // postArray={postArray} setPostArray={setPostArray} setFilteredPosts={setFilteredPosts}
    email={comment.email} />
  ))
  return (
   <>
   <h3>Post No` {postNum}</h3>
   <div>
{commentList}
<button onClick={openAddComment}>add-Comment+</button>
{window && (
        <div>

          <input
            type="text"
            id='pop-comment-name'
            placeholder='name'
            onChange={(e) => setNewCommentName(e.target.value)}
          />
          <h3>body:</h3>
          <input
            type="text"
            id='pop-comment-body'
            onChange={(e) => setNewCommentBody(e.target.value)}
          />
          <button onClick={addComment}>+</button>
        </div>
      )}
   </div>
   <Outlet/>
   </>
  );
}

export default Photos;
