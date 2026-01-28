import { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
// import './Albums.css'; // אופציונלי, לעיצוב מותאם אישית
import { Outlet,Link } from "react-router-dom";

function Albums() {
  const [albumArray, setAlbumArray] = useState([]);
  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false); // מצב פתוח/סגור של הרשימה
  const [selectedOption, setSelectedOption] = useState('title'); // קריטריון ברירת מחדל הוא 'title'
  const navigate = useNavigate();
  const { userId } = useParams(); // קבלת userId מהנתיב

  const toggleDropdown = () => setIsOpen(!isOpen); // פתיחה/סגירה של הרשימה

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // סגירת הרשימה לאחר בחירה
  };

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchText(value);
    filterAlbums(value, selectedOption); // חיפוש מידי על פי הטקסט והקריטריון
  };

  const filterAlbums = (text, criterion) => {
    if (!text) {
      setFilteredAlbums(albumArray); // אם אין טקסט, הצג את כל האלבומים
      return;
    }

    const filtered = albumArray.filter((album) =>
      album[criterion].toString().toLowerCase().includes(text.toLowerCase())
    );
    setFilteredAlbums(filtered);
  };

  // const openPhotos = (albumNum) => {
  
  //   navigate(`/users/${userId}/albums/${albumNum}/photos`);
  // };
  useEffect(() => {
    fetch(`http://localhost:3001/albums?userId=${userId}`)
      .then((response) => response.json())
      .then((json) => {
        setAlbumArray(json);
        setFilteredAlbums(json); // הצגת כל האלבומים כברירת מחדל
      })
      .catch((err) => console.error(err)); // טיפול בשגיאות
  }, [userId]);
 let albumList= filteredAlbums.map((album, index) => (
    <div key={index} className="album">
      <h4>Album No:</h4> {album.id}
      <br />
      <h4>Title:</h4><Link to={`/users/${userId}/albums/${album.id}/photos`} >{album.title}</Link>
    </div>
  ))
  return (
    <>
      <h3>Albums</h3>
      <div>
        <h6>Search by:</h6>
        <div className="dropdown">
          <button className="dropdown-button" onClick={toggleDropdown}>
            {selectedOption === 'id' ? 'ID' : 'Title'}
            <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
          </button>
          {isOpen && (
            <ul className="dropdown-list">
              <li onClick={() => handleSelect('id')}>ID</li>
              <li onClick={() => handleSelect('title')}>Title</li>
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

      <div className="albums-list">
     {albumList}
      </div>
      <Outlet/>

    </>
  );
}

export default Albums;
