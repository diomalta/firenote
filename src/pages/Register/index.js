import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import API from '../../services/api';

export default class Register extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: null,
      email: null,
      password: null,
      redirect: false,
    };
  }
  
  handleChange = (event) => {
    const { name, value } = event.target;
    
    this.setState({
      [name]: value
    })
  }
  
  register = async (e) => {
    e.preventDefault();
    const { email, name, password } = this.state;

    const response = await API.post('/signup', { email, name, password });
    const { user } = response.data;
    
    if (user) {
      localStorage.setItem('@id', user._id);          
      localStorage.setItem('@email', user.email);
      localStorage.setItem('@name', user.name);

      this.setState({ redirect: true });
    } else {
      this.setState({ 
        name: null,
        email: null,
        password: null
      });
    }
  };
  
  redirect = (route) => this.props.history.push(route);
  
  render() {
    if (this.state.redirect) return <Redirect to="/categories" />;

    return (
      <div class="auth-wrapper">
        <form class="form-signin">
          <i style={{ fontSize: "42px", color: '#FF421D' }} class="fas fa-fire"></i>
          <h1>Cadastro</h1>

          <input 
            name="name" 
            type="text" 
            placeholder="Digite seu nome..." 
            onChange={ this.handleChange } 
          />

          <input 
            name="email" 
            type="email" 
            placeholder="Digite seu email..." 
            onChange={ this.handleChange } 
          />

          <input 
            name="password" 
            type="password" 
            placeholder="Digite sua senha..." 
            onChange={ this.handleChange } 
          />
          
          <button onClick={this.register}>Criar minha conta</button>
          {/* eslint-disable-next-line */}
          <a onClick={() => this.redirect('/signin')}>Eu já tenho uma conta</a>
        </form>
      </div>
    );
  }
}
