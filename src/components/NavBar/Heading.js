import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';

class Heading extends Component{

    constructor(props){
        super(props);
        this.state= {
            font: (this.props.type=== "h1"? "6rem": "3rem")
        }
    }
    render() {
        return (
            <div>
                <Navbar navbar transparent navbar-inverse expand="lg" style={{margin: "3% 15%"}}>
                    <Navbar.Brand href="#home" style={{fontFamily: "Catamaran", fontSize: this.state.font}}>{this.props.title}</Navbar.Brand>
                </Navbar>
            </div>
        );
    }
}

export default Heading;