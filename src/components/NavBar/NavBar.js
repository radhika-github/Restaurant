import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import './navbar.css';
import Heading from "./Heading";
import SearchField from '../Search/SearchField';
import CustomChatbot from "../Chatbot/CustomChatbot";

class NavBar extends Component{
    render() {
        return (
            <div>
                <Navbar navbar transparent navbar-inverse expand="lg" style={{fontFamily: "Catamaran"}}>
                    <Heading title={"Food Hunt"} type={"h1"}/>
                    <SearchField/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <CustomChatbot eventHandler={this.clickEventHandler}/>

            </div>
        );
    }
}

export default NavBar;