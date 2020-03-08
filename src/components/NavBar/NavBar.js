import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

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
                </Navbar>
                <CustomChatbot eventHandler={this.clickEventHandler}/>
            </div>
        );
    }
}

export default NavBar;