import React, { Component } from 'react';
//import '../style.css';

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
  render() {
    return (
      <div >
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
          <div  style={{display: this.state.isSignup?'none':'block'}} onClick={this.showSignupForm} >Sign Up Now</div>
          <div  style={{display: this.state.isSignup?'block':'none'}} onClick={this.showLoginForm} >Go Back To Login</div>
      
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
