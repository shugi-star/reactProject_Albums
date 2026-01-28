import React from 'react';
import { Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {useState} from 'react';
function SingleTodo({todo,index,todoArray,setTodoArray,setFilteredTodos}) {
    const [isEditing, setIsEditing] = useState(false); // Track if we are editing
    const [editTodoTitle, setEditTodoTitle] = useState(''); // Track the title being edited
    const [editTodoId, setEditTodoId] = useState(null); // Track the id of the todo being edited
  
  const { userId } = useParams(); 
  const deleteTodo = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log(`Todo with id ${id} deleted successfully`);
  
          // מחיקת המשימה מה-UI (באמצעות עדכון state)
          const updatedTodos = todoArray.filter((todo) => todo.id !== id);
          setTodoArray(updatedTodos);
          setFilteredTodos(updatedTodos);
        } else {
          console.error('Failed to delete todo');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
    // Function to handle checkbox change
    const handleCheckboxChange = (todoId, completedStatus) => {
        // Update todo state locally
        const updatedTodos = todoArray.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !completedStatus } : todo
        );
        setTodoArray(updatedTodos);
        setFilteredTodos(updatedTodos); // Update filtered todos as well
    
        // Optional: Send the updated todo to the server (if necessary)
        fetch(`http://localhost:3001/todos/${todoId}`, {
          method: 'PATCH',
          body: JSON.stringify({ completed: !completedStatus }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log('Todo updated:', json);
          })
          .catch((err) => console.error('Error updating todo:', err));
      };
  // Start editing a todo
  const editTodo = (id) => {
    const todoToEdit = todoArray.find(todo => todo.id === id);
    setEditTodoId(id); // Set the id of the todo being edited
    setEditTodoTitle(todoToEdit.title); // Pre-fill the input with the current title
    setIsEditing(true); // Enable editing mode
  };
  
  // Save the edited todo
  const saveEdit = () => {
    const updatedTodo = {
      title: editTodoTitle,
    };
  
    // Send the update request to the server
    fetch(`http://localhost:3001/todos/${editTodoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTodo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Todo updated:', data);
        
        // Update the UI with the new title
        const updatedTodos = todoArray.map(todo =>
          todo.id === editTodoId ? { ...todo, title: editTodoTitle } : todo
        );
        setTodoArray(updatedTodos);
        setFilteredTodos(updatedTodos); // Update filtered todos too
        setIsEditing(false); // Exit editing mode
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
      });
  };
  
  // Cancel editing and revert to the original title
  const cancelEdit = () => {
    setIsEditing(false); // Exit editing mode without saving changes
    setEditTodoTitle(''); // Clear the edit field
  };
  
  return (
    <div key={index} className="todo">
      <h4>No:</h4> {todo.id}
      <br />
      <h4>Title:</h4>
      
      {/* If editing, show input field for the title */}
      {isEditing && editTodoId === todo.id ? (
        <input
          type="text"
          value={editTodoTitle}
          onChange={(e) => setEditTodoTitle(e.target.value)} // Update title in real time
        />
      ) : (
        <h3>{todo.title}</h3>
      )}
  <br />
    <input
      type="checkbox"
      checked={todo.completed}
      onChange={() => handleCheckboxChange(todo.id, todo.completed)} // Handle checkbox click
    />
    <span>{todo.completed ? 'Completed' : 'Incomplete'}</span>
       <button onClick={() => deleteTodo(todo.id)} className="delete-btn">
      🗑️ 
    </button>
    {/* Edit button */}
    <button onClick={() => editTodo(todo.id)} className="edit-btn">
      ✏️ 
    </button>

    {/* If editing, show save and cancel buttons */}
    {isEditing && editTodoId === todo.id && (
      <div>
        <button onClick={saveEdit}>Save</button>
        <button onClick={cancelEdit}>Cancel</button>
      </div>
    )}
  </div>
  );
}

export default SingleTodo;