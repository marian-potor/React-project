import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import NavigationBar from './NavigationBar/NavigationBar';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router';
// import AboutUs from './Link/AboutUs';
// import PageHeader from './PageHeader/PageHeader';
import HomePage from './HomePage/HomePage';
import Sports from './Sports/Sports';
import Login from './Login/Login';
import SessionContext from './Login/SessionContext';

class App extends React.Component {
  state = {
    user: {}
  };

  saveUser = (user) => {
    this.setState({ user });
    localStorage.setItem('siit4-user', JSON.stringify(user));
  }

  componentDidMount() {
    const existingLogin = localStorage.getItem('siit4-user');
    if(existingLogin) {
      this.setState({ user: JSON.parse(existingLogin) });
    }
  }

  render(){
  return (
    <>
      {/* <PageHeader/> */}
      <Router>
        <SessionContext.Provider value={ {user: this.state.user, setUser: this.saveUser} }>
          <NavigationBar />
          {/* <HomePage /> */}
          <Route exact path='/' component= { HomePage } />
          <Route path='/sports' component= { Sports } />
          <Route path='/login' component= { Login } />
        </SessionContext.Provider>
      </Router>
    </>
  )}
};

export default App;

