import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

//import { Account } from '../../server/account.js';
 
// App component - represents the whole app

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '', 
      pass: '',
      valid: false,
      check1: false,
      check2: false,
      check3: false,
      check4: false
    };
    
    this.spanRef = React.createRef();
    
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
    var ulen, user, plen, pass, msgSpan;
    user = this.state.user;
    pass = this.state.pass;
    ulen = user.length;
    plen = pass.length;
    msgSpan = this.spanRef.current;
    msgSpan.textContent = '';
    this.state.check1 = false;
    this.state.check2 = false;
    this.state.check3 = false;
    this.state.check4 = false;
    this.state.valid = false;
    
    // 2.5.c/f
    if(ulen < 6 || ulen > 8)
     	msgSpan.textContent = msgSpan.textContent + ' Username must be between 6 and 8 characters!';
    else
		this.state.check1 = true;
		
    if(plen < 8 || plen > 16)
    	msgSpan.textContent = msgSpan.textContent + ' Password must be between 8 and 16 characters!';
    else
    	this.state.check2 = true;
    
    // 2.5.a/b/d/e
    if(!user.match("^[a-zA-Z0-9~!@#$%^]+$"))
      	msgSpan.textContent = msgSpan.textContent + ' Username should only include alpha numeric values or these special characters: ~, !, @, #, $, %, ^';
    else
    	this.state.check3 = true;
    
    if(!pass.match("^[a-zA-Z0-9~!@#$%^]+$"))
      	msgSpan.textContent = msgSpan.textContent + ' Password should only include alpha numeric values or these special characters: ~, !, @, #, $, %, ^';
    else
    	this.state.check4 = true;
    	
    if(this.state.check1 && this.state.check2 && this.state.check3 && this.state.check4) {
    	this.state.valid = true;
    }
    
    if(this.state.valid == true) {
    	if(Accounts.createUser({
    		username: user,
    		password: pass
    	})) {
    		msgSpan.textContent = 'Created user ' + user;
    		Router.go('home');
    	}
    	else {
    		Meteor.loginWithPassword(user, pass);
    		console.log(Meteor.userId());
    		msgSpan.textContent = "Logging in...";
    		setTimeout(function() {
				if(Meteor.userId())
					msgSpan.textContent = user + ' logged in';
				else
					msgSpan.textContent = 'Incorrect password!';
				}, 1000);
    	}
    }

    event.preventDefault();
  }

 
  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
      	<h2>Login</h2>
        <label>Username:
        <input type="text" value={this.state.user} onChange={this.handleChange} id="user" />
        </label>
        <br/>
        <label>Password: 
        <input type="password" value={this.state.pass} onChange={this.handleChange} id="pass" />
        </label>  
        <br/>
        <input type="submit" id="submit" value="Submit"/>
      </form>
        <br/>
      <span id="message" ref={this.spanRef}></span>
    </div>
      );
  }
}
