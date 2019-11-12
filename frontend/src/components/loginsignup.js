import React, { Component } from 'react';
import axios from 'axios';
import '../style.css';

export default class LoginSignup extends Component {
    state = {
        isSignup:false,
        fullname: "",
        email: " ",
        password: ""
    }
    showSignupForm = ()=>{
        this.setState({isSignup:true})
    }
    showLoginForm = ()=>{
        this.setState({isSignup:false})
    }
    updateStateValue = (e)=>{
        let tgt = e.target;
        let stateName = tgt.name;
        let val  = tgt.value
        //debugger;
        this.setState({
            [stateName]:val
        });
    }
    loginSignup = ()=>{
        if(this.state.isSignup){

        }
        else{

        }
    }
  render() {
    return (
      <div className="container">
          <div className="loginsignup">
              <input onChange = {this.updateStateValue}
              style={{...styles.input,display: this.state.isSignup?'block':'none'}} 
              type="text" 
              name="fullname" 
              placeholder ="Full Name"/>

              <input onChange = {this.updateStateValue}
              style={styles.input}  
              type="email" name="email" 
              placeholder ="Email Address"/> 

              <input onChange = {this.updateStateValue}
              style={styles.input}  
              type="password"
               name="password" 
               placeholder ="password"/>
          </div>
          <div className="button" onClick={this.loginSignup}>{this.state.isSignup?'Sign up' : 'Login'}</div>
          <div className="button" style={{display: this.state.isSignup?'none':'block'}} onClick={this.showSignupForm} >Sign Up Now →</div>
          <div className="button" style={{display: this.state.isSignup?'block':'none'}} onClick={this.showLoginForm} >← Go Back To Login</div>
      
      </div>
      
    );
  }
}
const styles ={
    input:{
        fontSize:18,
        color:'blue',
        display: 'block',
        margin: 20
    }
}
