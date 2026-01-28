import {Link } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
const { useState } = require("react")

function Albums(props){
const [albumsArray, setAlbumsArray] = useState([]);
const [filterAlbumsArray, setFilterAlbumsArray] = useState([]);
const [isFiltered, setIsFiltered] = useState(false);
const { userId } = useParams();
//למה עשית ככה?
    useEffect(() => { //שליפת אלבומים של כולם
        fetch(`http://localhost:3001/albums`)
        .then((response) => response.json())
        .then((json) => {
            setAlbumsArray(json);
            setFilterAlbumsArray(json);
        })
        .catch((error) => console.log(error));
    }, [props.userId]); 

    function filterAlbum(){//מיון האלבומים
        if(!isFiltered){
            const myAlbums = albumsArray.filter(
                (album) => album.userId === userId
            );
            setFilterAlbumsArray(myAlbums);
        } else{
            setFilterAlbumsArray(albumsArray);
        }
        setIsFiltered(!isFiltered);
    }
    let listAlbum = filterAlbumsArray.map((album, index) => (//בעצם עושה מכל אלבום כמו קומפוננטה בתוך דיב של התמונות שלו
        <div key={index} className="album">
          <h4>Album No:</h4> {album.id}
          <br />
          <h4>Title:</h4><Link to={`/users/${userId}/albums/${album.id}/photos`} >{album.title}</Link>
        </div>
      ))


    return(
        <>
        <h3>Albums</h3>
        {listAlbum}
        <button id="btnAlbum" onClick={filterAlbum}>{isFiltered? "View Shared Albums" : "View Only My Albums"}</button>
        </>
    )
}
export default Albums;