import React, { Component } from 'react';
import axios from 'axios';
import valuse from '../value';
import '../style.css';
import {Redirect} from 'react-router-dom';

export default class LoginSignup extends Component {
    state = {
        isSignup:false,
        fullname: "",
        email: " ",
        password: "",
        loginSuccess:false
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

        let { email,password } = this.state;
        if(this.state.isSignup){
            //signup
            if(this.state.fullname && this.state.email && this.state.password){
                let name = this.state.fullname;
                axios.post(`${valuse.BASE}/signup`,{name,email,password})
                    .then(d=>{
                        alert("Congratulations! Sign up completed");
                        this.setState({
                            isSignup:false
                        });
                    })
                    .catch(e=>{
                        console.log('Signup error ! please try again');
                    })
                    .then(d=>{
                        this.setState({
                            fullname:"",
                            email: "",
                            password: ""
                        });
                    })
            }
            else{
                alert('parameter missing for signup')
            }
        }
        
        else{
             // Login Code
      axios.post(`${valuse.BASE}/login`,{email,password})
      .then(success=>{
        //debugger;
        localStorage.setItem('access_token',success.data.token);
        this.setState({loginSuccess:true});
      })
      .catch(e=>{
        alert(`Login Unsuccessful`);
      });
    if(this.state.email && this.state.password){
      
    }
    else{
      alert('Parameter missing for Login');
    }
  }
}
componentWillMount(){
    if(localStorage.getItem('access_token')){
        this.setState({loginSuccess:true});
    }
}
  render() {
      if(this.state.loginSuccess){
          return (<Redirect to="/"/>);
      }
    return (
      <div className="container">
          <h2 className="header">{this.state.isSignup?'Sign UP' : 'Login'}</h2>
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
