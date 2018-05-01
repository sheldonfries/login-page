import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
 
// App component - represents the whole app

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '', 
      pass: '',
      //confirmpass: ''
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const id = target.id;
    
    this.setState({[id]: value});
  }
  
  handleSubmit(event) {
    var ulen, user, plen, pass, confirmpass, msgSpan, error;
    user = this.state.user;
    pass = this.state.pass;
    ulen = user.length;
    plen = pass.length;
	error = false;
    //confirmpass = this.state.confirmpass;
    msgSpan = document.getElementById("message");
    msgSpan.textContent = '';
      
    /*if(pass != confirmpass) {
        msgSpan.textContent = msgSpan.textContent + ' Passwords do not match.';
    }*/
    
    // 2.5.c/f
    if(ulen < 6 || ulen > 8) {
      msgSpan.textContent = msgSpan.textContent + ' Username must be between 6 and 8 characters!';
    }
    if(plen < 8 || plen > 16) {
      msgSpan.textContent = msgSpan.textContent + ' Password must be between 8 and 16 characters!';
    }
    
    // 2.5.a/b/d/e
    if(!user.match("^[a-zA-Z0-9~!@#$%^]+$")) {
      msgSpan.textContent = msgSpan.textContent + ' Username should only include alpha numeric values or these special characters: ~, !, @, #, $, %, ^';
    }
    if(!pass.match("^[a-zA-Z0-9~!@#$%^]+$")) {
      msgSpan.textContent = msgSpan.textContent + ' Password should only include alpha numeric values or these special characters: ~, !, @, #, $, %, ^';
		error = true;
    }
    
    // 3
	if((user == "demo1234") && (pass == "demo~!@#$%^1234")) {
		msgSpan.textContent = msgSpan.textContent + ' Login successful.';
	}
	else {
    	msgSpan.textContent = msgSpan.textContent + ' Login unsuccessful.';
    }

    event.preventDefault();
  }

 
  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>Username:
        <input type="text" value={this.state.user} onChange={this.handleChange} id="user"/>
        </label>
        <br/>
        <label>Password: 
        <input type="password" value={this.state.pass} onChange={this.handleChange} id="pass"/>
        </label>  
        <br/>
        <input type="submit" id="submit" value="Submit"/>
      </form>
        <br/>
      <span id="message"></span>
    </div>
      );
  }
}
