import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function SinglePost({
  post,
  index,
  postArray,
  setPostArray,
  setFilteredPosts,
}) {
  
  const [isShowing, setIsShowing] = useState(false);
  const [editPostTitle, setEditPostTitle] = useState(''); // Track the title being edited
  const [editPostBody, setEditPostBody] = useState(''); // Track the body being edited
  const [editPostId, setEditPostId] = useState(null); // Track the id of the post being edited
  const [isEditing, setIsEditing] = useState(false); // Track if we are editing
  const [toShowComments, setToShowComments] = useState(false); // Track if we are showing comments
  const {userId}=useParams()
const navigate=useNavigate()
  const deletePost = (id) => {
    fetch(`http://localhost:3001/posts/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Post with id ${id} deleted successfully`);
          const updatedPosts = postArray.filter((post) => post.id !== id);
          setPostArray(updatedPosts);
          setFilteredPosts(updatedPosts);
        } else {
          console.error('Failed to delete post');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const showComments = (id) => {
    navigate(`${id}/comments`)
  };

  const saveEdit = () => {
    const updatedPost = {
      title: editPostTitle,
      body: editPostBody,
    };

    // Send the update request to the server
    fetch(`http://localhost:3001/posts/${editPostId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Post updated:', data);
        const updatedPosts = postArray.map((post) =>
          post.id === editPostId ? { ...post, title: editPostTitle, body: editPostBody } : post
        );
        setPostArray(updatedPosts);
        setFilteredPosts(updatedPosts);
        setIsEditing(false); // Exit editing mode
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
  };

  const cancelEdit = () => {
    setIsEditing(false); // Exit editing mode without saving changes
    setEditPostTitle(''); // Clear the edit field
    setEditPostBody(''); // Clear the edit body field
  };

  const showPost = () => {
    setIsShowing(true); // Enable post display mode
  };

  const editPost = (id) => {
    const postToEdit = postArray.find((post) => post.id === id);
    setEditPostId(id);
    setEditPostTitle(postToEdit.title); // Pre-fill the input with the current title
    setEditPostBody(postToEdit.body); // Pre-fill the input with the current body
    setIsEditing(true); // Enable editing mode
  };

  return (
    <>
      {!isShowing && (
        <div key={index} className="post">
          <h4>id:</h4> {post.id}
          <br />
          <h4>Title:</h4>

          {/* If editing, show input fields for the title and body */}
          {isEditing && editPostId === post.id ? (
            <>
              <input
                type="text"
                value={editPostTitle}
                onChange={(e) => setEditPostTitle(e.target.value)} // Update title in real-time
              />
              <input
                type="text"
                value={editPostBody}
                onChange={(e) => setEditPostBody(e.target.value)} // Update body in real-time
              />
            </>
          ) : (
            <button onClick={showPost}>{post.title}</button>
          )}

          <button onClick={() => deletePost(post.id)} className="delete-btn">
            🗑
          </button>

          <button onClick={() => editPost(post.id)} className="edit-btn">
            ✏️
          </button>

          {/* If editing, show save and cancel buttons */}
          {isEditing && editPostId === post.id && (
            <div>
              <button onClick={saveEdit}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </div>
          )}
        </div>
      )}
      {isShowing && (
        <div key={index} className="post">
          <h4>id:</h4> {post.id}
          <br />
        

          <h3>{post.title}</h3>
          <br />
          

          <h3>{post.body}</h3>
<button onClick={()=>showComments(post.id)}>comments</button>
       

        </div>
      )}
    </>
  );
}

export default SinglePost;
