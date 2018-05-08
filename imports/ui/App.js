import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import './LoginTemplate.html';
 
// App component - represents the whole app

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '', 
      pass: ''
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
    event.preventDefault();
  }
  
  componentDidMount() {
    this.view = Blaze.render(Template.LoginTemplate,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    Blaze.remove(this.view);
  }

 
  render() {
    return (
      <span ref="container" />
      );
  }
}
