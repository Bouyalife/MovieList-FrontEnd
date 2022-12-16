import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import react,{useEffect,useState} from 'react';

function App() {

  const [catFact, setCatFact] = useState("");
  const [movieData,setMovieData] = useState([]);
  const [list,setList] = useState([]);
  
  useEffect(()=>{
      axios.get("http://localhost:8080/getcatfact").then(function(response){
         setCatFact(JSON.stringify(response.data));
      })
  },[])

  
  function searchMovieWithId(event){
    if(event.key === 'Enter')
    {
      console.log("http://localhost:8080/getmovie?id=" + event.target.value);
      axios.get("http://localhost:8080/getmovie?id=" + event.target.value).then(function(response){
        console.log(response.data);
        setMovieData(response.data.results);
      })
    }
  }

  useEffect(() =>{
    console.log("hit2");
    console.log("length: " + localStorage.length)
    if(localStorage.length > 1){
      setList(localStorage.getItem("movie"))
    }
  },[])
  

  const addMovieToList = (event,title)=> {
    console.log(title);
    setList(oldArray=>[...oldArray,title]);
    localStorage.setItem('movie',list)
    console.log(list);
  }

  return (
    
      <div id="app">
        <div id="mainScene">
          <div id="siteHeader">
            <p>MovieList</p>
          </div>
          <div>Your lists: {list}</div>
          <div><input type="text" onKeyDown={searchMovieWithId}></input></div>
          <div>{movieData.map((movie,index)=>(<div id="searchedMovies">{"Title: " + movie.original_title + " Release year: " + movie.release_date + " Popularity: " + movie.popularity} <button onClick={event => addMovieToList(event,movie.original_title)}>Add to List</button></div>))}</div>
        </div>
       
        <div>
          <div id="catFact"><div>CatFact</div><div>{catFact}</div></div>
        </div>
      </div>
  );
}

export default App;
