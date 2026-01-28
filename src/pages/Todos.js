import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SingleTodo from '../components/SingleTodo';

function Todos() {
  const [todoArray, setTodoArray] = useState([]); // List of all todos for user
  const [filteredTodos, setFilteredTodos] = useState([]); // List of filtered todos
  const [searchText, setSearchText] = useState(''); // The search text
  const [isOpen, setIsOpen] = useState(false); // To toggle dropdown visibility
  const [selectedOption, setSelectedOption] = useState('title'); // Default filter criterion
  const [selectedSort, setSelectedSort] = useState('id'); // Default filter criterion
  const [isOpenSort, setIsOpenSort] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState(''); 
  const [allTodoArray, setAllTodoArray] = useState([]); // List of all todos

  const [window, setWindow] = useState(false); // To toggle dropdown visibility

  // const navigate = useNavigate();
  const { userId } = useParams(); // Getting userId from the route parameters

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleDropdownSort = () => setIsOpenSort(!isOpenSort);

  // Handle selection from dropdown
  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // Handle search input change
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);
    filterTodos(value, selectedOption);
  };
  // Handle selection from dropdown
  const handleSelectSort = (option) => {
    setSelectedSort(option);
    setIsOpenSort(false);

    setFilteredTodos((prev) =>
      [...prev].sort((a, b) => {
        if (option === 'random') {
          return Math.random() - 0.5;  // מיון אקראי
        }
        if (option === 'id') {
          return a.id - b.id;
        } if (option === 'alphabetic') {
          return a.title.localeCompare(b.title); // Sorting alphabetically by title
        } if (option === 'completed') {
          return a.completed === b.completed ? 0 : a.completed ? -1 : 1; // Sorting by completion status
        }

      })
    );
  };
  // Function to filter todos based on search text and selected filter criterion
  const filterTodos = (text, criterion) => {
    if (!text) {
      setFilteredTodos(todoArray); // Show all todos if no search text
      return;
    }

    let filtered = todoArray.filter((todo) =>
      todo[criterion].toString().toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTodos(filtered);
  };



  useEffect(() => {
    // Fetch todos for the user
    fetch(`http://localhost:3001/todos?userId=${userId}`)
      .then((response) => response.json())
      .then((json) => {
        setTodoArray(json);
        setFilteredTodos(json); // Display all todos by default
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
  fetch(`http://localhost:3001/todos`)
       .then((response) => response.json())
       .then((json) => {
         setAllTodoArray(json);
       })
       .catch((err) => console.error(err));
      },[])
  // Filter todos based on completion status (completed or not)
  const filterByCompletion = (completed) => {
    if (completed === "all") {
      setFilteredTodos(todoArray)
      return
    }
    const filtered = todoArray.filter((todo) => todo.completed === completed);
    setFilteredTodos(filtered);
  };
  const openAddTodo = () => {
setWindow(true)
  };
  const addTodo = () => {
       // Fetch todos for the user
     
   
    console.log(allTodoArray);
let newTodo={
  userId:JSON.parse(userId),
  id:JSON.stringify(JSON.parse(allTodoArray[allTodoArray.length-1].id)+1),
title:newTodoTitle,
completed:false
}
fetch('http://localhost:3001/todos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json', // מוודא שהשרת מבין שזה JSON
  },
  body: JSON.stringify(newTodo), // ממיר את formData למחרוזת JSON
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to post data');
    }
    return response.json();
  })
  .then((data) => {
    console.log('Successfully added:', data);
    setTodoArray((prevTodos) => [...prevTodos, data]);
    setFilteredTodos((prevTodos) => [...prevTodos, data]);
    setAllTodoArray((prevTodos) => [...prevTodos, data]);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
    setWindow(false)
  };


  let todoList = filteredTodos.map((todo, index) => (
   <SingleTodo todo={todo} index={index} todoArray={todoArray} setTodoArray={setTodoArray}
   setFilteredTodos={setFilteredTodos} />
));
  return (
    <>
      <h3>My Todos</h3>
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

      {/* Buttons to filter by completion status */}
      <div>
        <button onClick={() => filterByCompletion(true)}>Show Completed</button>
        <button onClick={() => filterByCompletion(false)}>Show Incomplete</button>
        <button onClick={() => filterByCompletion("all")}>Show All</button>

      </div>
      <h3>sort by:</h3>
      <div className="dropdown">
        <button className="dropdown-button" onClick={toggleDropdownSort}>
          {selectedSort}
          <span className={`arrow ${isOpenSort ? 'open' : ''}`}>▼</span>
        </button>
        {isOpenSort && (
          <ul className="dropdown-list">
            <li onClick={() => handleSelectSort('id')}>id</li>
            <li onClick={() => handleSelectSort('alphabetic')}>alphabetic</li>
            <li onClick={() => handleSelectSort('completed')}>completed</li>
            <li onClick={() => handleSelectSort('random')}>random</li>

          </ul>
        )}
      </div>
      <button onClick={openAddTodo}>add-Todo+</button>
      {window && (
        <div>
          <h3>title of todo:</h3>
          <input
            type="text"
            id='pop-todo-title'
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <button onClick={addTodo}>+</button>
        </div>
      )}
      <div className="todos-list">{todoList}</div>
    </>
  );
}

export default Todos;
