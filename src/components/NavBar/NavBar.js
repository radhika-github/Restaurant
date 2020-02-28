import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import './navbar.css';
import Heading from "./Heading";

class NavBar extends Component{
    render() {
        return (
            <div>
                <Navbar navbar transparent navbar-inverse expand="lg" style={{fontFamily: "Catamaran"}}>
                    <Heading title={"Food Hunt"} type={"h1"}/>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {/*<Nav.Link href="#home">Home</Nav.Link>*/}
                            {/*/!*<Nav.Link href="#link">Link</Nav.Link>*!/*/}
                            {/*<NavDropdown title="Filters" id="basic-nav-dropdown" style={{fontSize:"2rem"}}>*/}
                                {/*<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                                {/*<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>*/}
                                {/*<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                                {/*<NavDropdown.Divider />*/}
                                {/*<NavDropdown.Item href="#action/3.4">Price</NavDropdown.Item>*/}
                                {/*<NavDropdown.Item href="#action/3.4"><input type="checkbox"/>&nbsp;$</NavDropdown.Item>*/}
                                {/*<NavDropdown.Item href="#action/3.4"><input type="checkbox"/>&nbsp;$$</NavDropdown.Item>*/}
                                {/*<NavDropdown.Item href="#action/3.4"><input type="checkbox"/>&nbsp;$$$</NavDropdown.Item>*/}
                                {/*<NavDropdown.Item href="#action/3.4"><input type="checkbox"/>&nbsp;$$$$</NavDropdown.Item>*/}
                            {/*</NavDropdown>*/}
                        </Nav>
                        {/*<Form inline>*/}
                            {/*<FormControl type="text" placeholder="Search" className="mr-sm-2" />*/}
                            {/*<Button variant="outline-success">Search</Button>*/}
                        {/*</Form>*/}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;