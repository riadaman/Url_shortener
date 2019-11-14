import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';

export default class Urls extends Component {
  state = {
    loggedIn:true
  }
  componentWillMount(){
    if(!localStorage.getItem('access_token')){
      this.setState({loggedIn:false});
    }
  }
  render() {
    if(this.state.loggedIn){
      return (<Ridirect to ="/"/>);
    }
    return (
      <div> Private Component </div>
    );
  }
}
