import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import './navbar.css'
import {Link} from "react-router-dom";

let h = {h1: "6rem", h2: "3rem", h5: "1rem"};
class Heading extends Component{

    constructor(props){
        super(props);
        this.state= {
            h : [],
            font: h[this.props.type]
        }
    }
    render() {
        return (
            <div>
                <Navbar navbar transparent navbar-inverse expand="lg" style={{margin: "3% 15%"}}>
                    <Navbar.Brand href="#home" style={{fontFamily: "Catamaran", fontSize: this.state.font, color: "#FE6B8B"}}><Link to={{pathname:"/"}} style={{ color: 'inherit', textDecoration: 'inherit'}}>{this.props.title}</Link></Navbar.Brand>
                </Navbar>
            </div>
        );
    }
}

export default Heading;