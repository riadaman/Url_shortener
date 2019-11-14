import React, {Component} from 'react';
import LoginSignup from './components/loginsignup';
import Urls from '../src/components/Urls';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//import logo from './logo.svg';
//import './App.css';
function Home(){
  let token = localStorage.getItem('access_token');
  if(token){
    return (<Redirect to ="/urls"/>);
  }
  else{
    return (<Redirect to = "/loginsignup"/>);
  }
}

class App extends Component{
  render(){
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Home}/>
          <Route path="/loginsignup" component={LoginSignup}/>
          <Route path="/urls" component={Urls}/>
        </Router>
      </div>
    );
  }
  
}

export default App;
