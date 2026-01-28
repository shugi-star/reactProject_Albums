import { useState, useEffect } from "react";



function Photos(){
    const [pictures, setPictures] = useState([]);
    useEffect(() => { //שליפת תמונותץ של כולם
        fetch(`http://localhost:3001/photos`)
        .then((response) => response.json())
        .then((json) => {
            setPictures(json);
        })
        .catch((error) => console.log(error));
    },[]); 

return(
<>
<h3>Pictures</h3>
{pictures}
</>
)


}
export default Photos;