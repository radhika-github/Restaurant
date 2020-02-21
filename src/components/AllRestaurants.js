import React, {Component} from 'react';
import VideoSrc from "./Video/food.mp4";
import NavBar from "./NavBar/NavBar";
import {Link} from 'react-router-dom'

const overlay = {
    position: "absolute",
    color: "#FFF",
    textAlign: "center",
    fontSize: "20px",
    // backgroundColor: "rgba(221, 221, 221, 0.3)",
    width: "100%",
    padding: "10px 0",
    zIndex: "2147483647",
}

class AllRestaurants extends Component {

    constructor(){
        super();
        this.state = {
            location: ""
        }
    }

    handleChange(value) {
        this.setState({
            location: value
        });
    }

    render() {
        return (
            <div>
                <div style={overlay}>
                    <NavBar/>
                    <div style={{margin: "20% 0"}}>
                        <input type="text" value={this.state.location} placeholder="United States of America"
                               onChange={(e) => this.handleChange(e.target.value)}/>
                        <button type="button"><Link to={{
                            pathname: "/search",
                            location: this.state.location
                        }}>Search</Link></button>
                    </div>
                </div>
                <video autoPlay loop muted style={{
                    width: "100%",
                    height: "100%",
                    opacity: "1",
                    transition: "opacity, 2s ease-in-out",
                }}>
                    <source src={VideoSrc} type="video/mp4"/>
                </video>


            </div>)
    }

}

export default AllRestaurants;
