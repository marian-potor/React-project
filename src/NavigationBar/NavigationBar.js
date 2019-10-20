import React, {Component} from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, } from 'react-router-dom';
import {NavLink} from 'react-router-dom';
import SessionContext from '../Login/SessionContext';
import './NavigationBar.css'


class NavigationBar extends Component {
    state = {
        button:'',
        user:''
    }
    static contextType = SessionContext;

    handleLogout = () => {
      this.context.setUser({});
      localStorage.removeItem('siit4-user');
    }

    render(){
        return (
        <Navbar bg="danger" expand="lg" className="navBar">
            <Navbar.Brand><NavLink exact to="/">Home</NavLink></Navbar.Brand>
            <Navbar.Brand><NavLink to="/sports">Sports</NavLink></Navbar.Brand>
            <Nav className="mr-auto">
            </Nav>
            <SessionContext.Consumer>
                { (props) => props.user.username ? 
                    <>
                        <p className="userName">Logged in as: { props.user.username }</p>
                        <Button variant="success" onClick={ this.handleLogout }>Logout</Button>
                    </> : 
                    <Button variant="success" as={ Link } to='/Login'>Login</Button> 
                }
            </SessionContext.Consumer>
        </Navbar>
        )
    }
}

export default NavigationBar;