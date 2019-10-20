import React from 'react';
import Axios from 'axios';
import SessionContext from './SessionContext';

class Login extends React.Component {
  static contextType = SessionContext;

  state = {
    username: '',
    password: '',
    loginError: ''
  };

  handleInput = (e) => {
    const newState = {};
    newState[e.currentTarget.id] = e.currentTarget.value;

    this.setState(newState);

    this.setState({
      loginError: ''
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Axios(`http://localhost:3003/users?username=${this.state.username}&password=${this.state.password}`);
    if(res.data.length === 1) {
      this.context.setUser(res.data[0]);
      this.props.history.push('/');
    } else {
      this.setState({
        loginError: 'Username or password are not valid.'
      })
    }
    
  }

  render() {
    return (
      <>
      <form onSubmit={ this.handleSubmit }>
        <h2>Login</h2>
        <p style={ { 'fontWeight': 'bold', color: '#cc0000'} }>
          { this.state.loginError }
        </p>
        <p>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" onChange={ this.handleInput } value={ this.state.username } />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" onChange={ this.handleInput } value={ this.state.password } />
        </p>
        <p>
          <button type="submit">Log In</button>
        </p>
      </form>
      </>
    
    );
  }
}

export default Login;
