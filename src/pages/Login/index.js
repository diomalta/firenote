import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import { Success, Danger } from '../../components/Flash';
import API from '../../services/api';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  login = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    const response = await API.post('/signin', { email, password });
    const { user, token } = response.data;
    
    if (user) {
      localStorage.setItem('@id', user._id);          
      localStorage.setItem('@email', user.email);
      localStorage.setItem('@name', user.name);
      localStorage.setItem('@token', token);

      Success('Logado com sucesso...'); 

      this.setState({ redirect: true });
    } else {

      Danger('Email ou senha incorretos..');
      
      this.setState({ 
        name: null,
        email: null,
        password: null
      });
    }
  };

  redirect = () => {
    return this.props.history.push('/signup');
  }

  render() {
    if (this.state.redirect) return <Redirect to="/categories" />;
    return (
      <div className="auth-wrapper">
        <form method="POST" action="" className="form-signin">
          <i style={{ fontSize: "42px", color: '#FF421D' }} className="fas fa-fire"></i>
          <h1>FireNote</h1>
      
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
      
          <button onClick={this.login}>Entrar</button>
          {/* eslint-disable-next-line */}
          <a onClick={this.redirect}>Criar uma nova conta</a>
        </form>
      </div>
    );
  }
}
