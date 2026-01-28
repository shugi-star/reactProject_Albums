import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Comment_Single({
  comment,
  email
}) {
  // Define state variables for editing post title and body
  const [editCommentName, setEdiCommentName] = useState(comment.title || ''); // Default to comment title if available
  const [editCommentBody, setEditCommentBody] = useState(comment.body || ''); // Default to comment body if available
  const [window, setWindow] = useState(false); // To toggle dropdown 
  const [isEditing, setIsEditing] = useState(false); // To toggle dropdown 

  useEffect(() => {
    // Optional: Any side-effects or initializations can go here
  }, []);
const user=JSON.parse(localStorage.getItem("userFound"))
console.log(user);
const myEmail=user.email
console.log(email+myEmail);
  return (
    <div>
    {!isEditing&&(
    <div className="comment">
      <h3>{comment.name}</h3>
      <p>{comment.body}</p>
      <p>User: {email}</p>
      <br />
      </div>)
}
      { email===myEmail && (
    
         
        <>  <button //</>onClick={() => deletePost(comment.id)} className="delete-btn"
        >
            🗑
          </button>

          <button //onClick={() => editPost(comment.id, editPostTitle, editPostBody)} className="edit-btn"
          >
            ✏️
          </button></> )}
          {/* <>
          <input
            type="text"
            value={editCommentName}
            onChange={(e) => setEdiCommentName(e.target.value)} // Update title in real-time
          />
          <input
            type="text"
            value={editCommentBody}
            onChange={(e) => setEditCommentBody(e.target.value)} // Update body in real-time
          />
        </> */}
      
    </div>
  );
}

export default Comment_Single;
