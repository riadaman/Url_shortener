import React, { Component } from 'react';

export default class LoginSignup extends Component {
  render() {
    return (
      <div>
          <div className="loginsignup">
              <input style={styles.input} type="text" name="full name" placeholder ="Full Name"/>
              <input style={styles.input}  type="email" name="email" placeholder ="Email Address"/> 
              <input style={styles.input}  type="password" name="password" placeholder ="password"/>
          </div>
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
