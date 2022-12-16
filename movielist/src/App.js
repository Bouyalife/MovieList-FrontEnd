import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import react,{useEffect,useState} from 'react';

function App() {

  const [catFact, setCatFact] = useState("");
  
  useEffect(()=>{
      axios.get("http://localhost:8080/getcatfact").then(function(response){
         setCatFact(JSON.stringify(response.data));
      })
  },[]);

  

  return (
      <div id="app">
        <div id="siteHeader">
          <p>MovieList</p>
        </div>
        <div id="catFact-header">CatFact</div>
        <div id="catFact">{catFact}</div>
      </div>
  );
}

export default App;
