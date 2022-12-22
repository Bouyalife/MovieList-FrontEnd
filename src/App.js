import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import react,{useEffect,useState} from 'react';

function App() {

  const [catFact,setCatFact] = useState("")
  const [accountName,setAccountName] = useState("")
  const [loggedIn,setLoggedIn] = useState(false)
  const [allLists,setAllLists] = useState([])
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  useEffect(()=>{
    axios.get("http://localhost:8080/catfact").then(function(response){
      setCatFact(JSON.stringify(response.data))
    })
  },[])

  function login(event){
    console.log(username + " + " + password);
  }

  return (
    <div id="site">
      <div style={{display:"flex",justifyContent: "center",alignItems:"center"}}>
        <div style={{flex: 1,backgroundColor: "#E76F51", height: "3px"}}/>
        <div id="siteHeader">MovieList</div>
        <div style={{flex: 1,backgroundColor: "#E76F51", height: "3px"}}/>
      </div>
      
      <div id="app">
          {
          // Inuti mainScene visas allt 
          }
          <div id ="mainScene">
            <div id="login">{loggedIn ? <button>Log Out</button>:<div><input type="text" onChange={e=>setUsername(e.target.value)} placeholder="Username"/><input type="text" onChange={e=>setPassword(e.target.value)} placeholder="Password"/><button onClick={login}>Login</button></div>}</div>
            <div id="login">{loggedIn ? accountName: "Login to see List!"}</div>
            <div><button id="addnewlist">+</button></div>
            <div>
              {allLists.map((list,index)=>(
                <div id="lists">list</div>
              )
            )}</div>
          </div>
          {
          // CATFACT rutan
          }
          <div id="catFact"><div id="catFact-Header">Cat Fact!</div>{catFact}</div>
      </div>
    </div>
     
  );
}

export default App;
