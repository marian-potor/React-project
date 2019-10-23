import React from 'react';
import Axios from 'axios';
import SessionContext from './SessionContext';
import './Login.css';

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
        <div className="logInForm">
          <div className="d-flex justify-content-center h-100">
            <div className="card">
              <div className="card-header">
                <h3>Sign In</h3>
              </div>
              <div className="card-body">
                <p style={ { 'fontWeight': 'bold', color: '#cc0000'} }>
                  { this.state.loginError }
                </p>
                <form onSubmit={ this.handleSubmit }>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"></span>
                    </div>
                    <input id="username" type="text" className="form-control" placeholder="username" onChange={ this.handleInput } value={ this.state.username } />
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text"></span>
                    </div>
                    <input id="password" type="password" className="form-control" placeholder="password" onChange={ this.handleInput } value={ this.state.password } />
                  </div>
                  <div>
                    <button className="btn logInButton">Log In</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
