import react from "react";
import { useParams, useNavigate } from 'react-router-dom';
function Home(props){
    const { id } = useParams();
    const navigate = useNavigate();
    function handelClickAlbums(){
        navigate(`/Albums`);

    }
    function handelClickLogOut(){
        navigate(`/SignOrLogin`);
    }
    function handelClickProfile(){
        navigate(`/Profile`);
    }
    function handelClickPosts(){
        navigate(`/Posts`);
    }
    function handelClickTodos(){
        navigate(`/Todos`);
    }
    return (
        <>
            <h1>home!</h1>
            <button onClick={handelClickLogOut}>LogOut</button>
            <button onClick={handelClickAlbums}>Albums</button>
            <button onClick={handelClickProfile}>Profile</button>
            <button onClick={handelClickPosts}>Posts</button>
            <button onClick={handelClickTodos}>Todos</button>

        </>
    )
}
export default Home;