import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SinglePost from '../components/SinglePost';
function Posts() {
  const [postArray, setPostArray] = useState([]); // List of all todos for user
  const [filteredPosts, setFilteredPosts] = useState([]); // List of filtered todos
  const { userId } = useParams(); // Getting userId from the route parameters
  const [isOpen, setIsOpen] = useState(false); // To toggle dropdown visibility
  const [selectedOption, setSelectedOption] = useState('title'); // Default filter criterion
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [searchText, setSearchText] = useState(''); // The search text
  const [allPostsArray, setAllPostsArray] = useState([]); // List of all todos
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [window, setWindow] = useState(false); // To toggle dropdown visibility

 
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);
    filterPosts(value, selectedOption);
  };
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  // Function to filter posts based on search text and selected filter criterion
  const filterPosts = (text, criterion) => {
    if (!text) {
      setFilteredPosts(postArray); // Show all todos if no search text
      return;
    }

    let filtered = postArray.filter((post) =>
      post[criterion].toString().toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/posts`)
      .then((response) => response.json())
      .then((json) => {
        setAllPostsArray(json);
      })
      .catch((err) => console.error(err));
  }, [])
  useEffect(() => {
    // Fetch todos for the user
    fetch(`http://localhost:3001/posts?userId=${userId}`)
      .then((response) => response.json())
      .then((json) => {
        setPostArray(json);
        setFilteredPosts(json); // Display all todos by default
      })
      .catch((err) => console.error(err));
  }, []);
  const openAddPost = () => {
    setWindow(true)
  };
  const addPost = () => {
    // Fetch todos for the user


    console.log(allPostsArray);
    let newPost = {
      userId: JSON.parse(userId),
      id: JSON.stringify(JSON.parse(allPostsArray[allPostsArray.length - 1].id) + 1),
      title: newPostTitle,
      body: newPostBody
    }
    fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // מוודא שהשרת מבין שזה JSON
      },
      body: JSON.stringify(newPost), // ממיר את formData למחרוזת JSON
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to post data');
        }
        return response.json();
      })

      .then((data) => {
        console.log('Successfully added:', data);
        setPostArray((prevPosts) => [...prevPosts, data]);
        setFilteredPosts((prevPosts) => [...prevPosts, data]);
        setAllPostsArray((prevPosts) => [...prevPosts, data]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    setWindow(false)
  };
;
    

    
  let postList = filteredPosts.map((post, index) => (
<SinglePost show={false} post={post} index={index} 
postArray={postArray} setPostArray={setPostArray} setFilteredPosts={setFilteredPosts} />
  ))
  return (
    <>
      <h3>Posts</h3>
      <div>
        <h6>Search by:</h6>
        <div className="dropdown">
          <button className="dropdown-button" onClick={toggleDropdown}>
            {selectedOption === 'id' ? 'ID' : selectedOption === 'title' ? 'Title' : 'State'}
            <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
          </button>
          {isOpen && (
            <ul className="dropdown-list">
              <li onClick={() => handleSelect('id')}>ID</li>
              <li onClick={() => handleSelect('title')}>Title</li>
              <li onClick={() => handleSelect('completed')}>State</li>
            </ul>
          )}
        </div>
        <input
          type="text"
          placeholder={`Search by ${selectedOption}`}
          value={searchText}
          onChange={handleSearch}
        />
      </div>

      <button onClick={openAddPost}>add-Post+</button>
      {window && (
        <div>

          <input
            type="text"
            id='pop-post-title'
            placeholder='title'
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <h3>body:</h3>
          <input
            type="text"
            id='pop-post-body'
            onChange={(e) => setNewPostBody(e.target.value)}
          />
          <button onClick={addPost}>+</button>
        </div>
      )}
      <div className="post-list">{postList}</div>
      <Outlet/>
    </>
  );
}

export default Posts;
