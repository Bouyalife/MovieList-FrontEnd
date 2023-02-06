import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import react,{useEffect,useState} from 'react';

function App() {

  const [catFact,setCatFact] = useState("")
  const [accountName,setAccountName] = useState("")
  const [loggedIn,setLoggedIn] = useState(false)
  const [allLists,setAllLists] = useState([])
  const [user,setUser] = useState({})
  const [addList,setAddList] = useState(false)
  const [searchBar,setSearch] = useState("")
  const [fromSearchBar,setFromSearchBar] = useState([])
  const [addMovieToList,setAddMovieToList] = useState(false)
  const [movie,setMovie] = useState("")
  const [showList,setShowList] = useState(false)
  const [chosenList, setList] = useState("")
  const [listMovie,setListMovies] = useState([])
  const [newMovie,setNewMovie] = useState(0)

  useEffect(()=>{
    axios.get("http://localhost:8080/user/catfact").then(function(response){
      setCatFact(JSON.stringify(response.data))
    })
  },[])

  const handleChange = (event) =>{
    const name = event.target.name
    const value = event.target.value
    setUser({...user,[name]:value})
  }

  const login = (event) =>{
    console.log("login")
    axios.post("http://localhost:8080/user/login",user).then(function(response){
      if(response.data === true){
        setLoggedIn(true);
        setAccountName(user.username)
      }
    })
    // Login api
  }
  
  const logout = (event) =>{
    setAllLists([])
    setList("")
    setAccountName("")
    setLoggedIn(false)
    setShowList(false)
  }

  const createaccount = (event) =>{
    axios.post("http://localhost:8080/user/adduser",null,{params:{username:user.username,password:user.password}}).then(function(response){
    //if response 200 then clear input and show account created  
    console.log(response);
    })
  }
  
  const addListButton = (event) =>{
    setAddList(!addList);
  }

  useEffect(()=>{
    console.log(user + " gdfgdfgdfg" )
    if(loggedIn){
      axios.get("http://localhost:8080/movie/getprofile",{params:{username: user.username}}).then(function (response){
        response.data.map(s => setAllLists(oldList =>[...oldList,s.listName]))
      })
    }

  },[loggedIn]);

  const addListInput = (event) =>{
      
    console.log(event.target.value)

    if(event.code === "Enter"){
      axios.post("http://localhost:8080/movie/createlist",user,{
        params : {
          listName : JSON.stringify(event.target.value)
        }
      }).then(function(response){
        if(response.status === 200){
          console.log(event.target.value + " gggg");
          setAllLists(oldArray => [...oldArray, event.target.value]);
        }
        console.log("ff" + response);
      })
    }
  }

  useEffect(()=>
  {
    console.log(searchBar.length)
    if(searchBar.length === 0){
      setFromSearchBar([])
    }
    else
    {
      console.log("http://localhost:8080/movie/searchbar/" + searchBar.replace("/",""))
      axios.get("http://localhost:8080/movie/searchbar/" + searchBar.replace("/","")).then(function (response){
        console.log(response.data)
        setFromSearchBar([])
        response.data.results.map(s=>setFromSearchBar(e=>[...e,s.original_title]));
      })
    }
  },[searchBar])

  const addToList = (event) =>
  {
    console.log(event)
    axios.post("http://localhost:8080/movie/addmovie",null,{params:{movieTitle:event,username: user.username, list: chosenList}}).then(function(response){
      setNewMovie(newMovie + 1)
    })
  }

  useEffect(()=>
  {
    console.log("http://localhost:8080/movie/getlist/" + accountName + "/" + chosenList)
    axios.get("http://localhost:8080/movie/getlist/" + accountName + "/" + chosenList).then(function(response){
      setListMovies(response.data)
    })
      // ny film läggs till ska den här uppdateras
  },[chosenList,newMovie])

  const deleteMovie = (event,event2) =>
  {
    axios.post("http://localhost:8080/movie/deletemovie",null,{params:{movieId:event,listName:chosenList,username:user.username,movieTitle:event2}}).then(function(response){
      setNewMovie(newMovie -1)
    })
  }

  const deleteList = () =>
  {
    axios.post("http://localhost:8080/movie/deletelist",null,{params:{listName:chosenList,username: user.username}}).then(function(response){
      setAllLists(allLists.filter(obj => (obj !== chosenList)))
    })
  }
  
  return (
    <div id="site">
      <div style={{display:"flex",justifyContent: "center",alignItems:"center"}}>
        <div style={{flex: 1,backgroundColor: "#E76F51", height: "3px"}}/>
        <div id="siteHeader">MovieList</div>
        <div style={{flex: 1,backgroundColor: "#E76F51", height: "3px"}}/>
      </div>
      
      <div id="app">
        <div>
          <div>{loggedIn ? <button onClick={e=>setShowList(!showList)}>Lists</button> : null}</div>
          <div> 
            {showList ? <div id="lists">{allLists.map((lists,index)=><button id="eachlist" onClick={e=>setList(lists)} key={index}>{lists}</button>)}</div>: null}
          </div>
         
        </div>

          {
          // Inuti mainScene visas allt 
          }
          <div id ="mainScene">
            <div id="search">
              <div><input id="searchBar" type="text" onChange={e => setSearch(e.target.value)} placeholder="Search"></input></div>
              <div>{fromSearchBar.map((search,index)=>
              <button id="titleSearches" onClick={e=> addToList(search)} key={index}>{search}</button>)
              }</div>
            </div>
            {
            // Login bar
            }
            <div id="login">{loggedIn ? <button onClick={logout}>Log Out</button>:<div><input type="text" onChange={handleChange} name="username" placeholder="username"/><input type="text" name="password" onChange={handleChange} placeholder="Password"/><button onClick={login}>Login</button></div>}</div>
            <div id="login">{loggedIn ? <div>{accountName + "!"}</div>: "Login to see List!"}</div>
            <div>{addList ? <input type="text" onKeyDown={addListInput}/> : null}</div>
            {
              // Create new account bar
            }
            <div id="createaccount">{loggedIn ? null : <div><input type="text" onChange={handleChange}  name="username" placeholder="username"/><input type="text" name="password" onChange={handleChange} placeholder="password"/><button onClick={createaccount}>Create account!</button></div>}</div>
            {
              // Shows chosen list name and the corresponding movies to the list
            }
            <div>{chosenList}</div>
            <div>
              {chosenList ? listMovie.map((movie)=><div>{movie.movieTitle}<button id="removeMovieFromList" onClick={s=>deleteMovie(movie.movieId,movie.movieTitle)}>-</button></div>): null}
              <div>{chosenList ? <button onClick={deleteList}>Delete list!</button> : null}</div>
            </div>
          </div>
          {
          // CATFACT rutan
          }
          <div>
            <div id="catFact"><div id="catFact-Header">Cat Fact!</div>{catFact}</div>
            <div id="addnewlistbutton">{loggedIn ? <button id="addnewlist" onClick={addListButton}>+</button> : null}</div>
          </div>
          
      </div>
    </div>
     
  );
}

export default App;