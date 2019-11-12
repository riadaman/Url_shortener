import React, { Component } from 'react';

export default class LoginSignup extends Component {
    state = {
        isSignup:false
    }
    showSignupForm = ()=>{
        this.setState({isSignup:true})
    }
    showLoginForm = ()=>{
        this.setState({isSignup:false})
    }
  render() {
    return (
      <div>
          <div className="loginsignup">
              <input style={{...styles.input,display: this.state.isSignup?'block':'none',}} type="text" name="full name" placeholder ="Full Name"/>
              <input style={styles.input}  type="email" name="email" placeholder ="Email Address"/> 
              <input style={styles.input}  type="password" name="password" placeholder ="password"/>
          </div>
          <div style={{display: this.state.isSignup?'none':'block'}} onClick={this.showSignupForm} >Sign Up Now</div>
          <div style={{display: this.state.isSignup?'block':'none'}} onClick={this.showLoginForm} >Go Back To Login</div>
      
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
