import React, {Component} from 'react';
import VideoSrc from "./Video/food.mp4";
import NavBar from "./NavBar/NavBar";
import {Link} from 'react-router-dom'
import CustomChatbot from "./Chatbot/CustomChatbot";
import Axios from "axios";
import RestaurantList from "./RestaurantList/RestaurantList";
import Heading from "./NavBar/Heading";

const overlay = {
    position: "absolute",
    color: "#FFF",
    textAlign: "center",
    fontSize: "20px",
    width: "100%",
    padding: "10px 0",
    zIndex: "2147483647",
}

const token = process.env.REACT_APP_API_KEY

class AllRestaurants extends Component {

    constructor() {
        super();
        this.state = {
            location: "",
            term: "",
            restaurants: {}
        }
    }

    handleLocationChange(value) {
        this.setState({
            location: value
        });
    }

    handleSearchChange(value) {
        this.setState({
            term: value
        });
    }

    getBusinessByLocation = () => {
        Axios({
            method: 'get',
            url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=USA&limit=3`,
            headers: {'Authorization': 'Bearer ' + token}
        }).then(res => {
            this.setState({restaurants: res.data.businesses})
        })
            .catch(console.log)
    }

    componentWillMount() {
        this.getBusinessByLocation();
    }

    render() {
        return (
            <div>
                <div style={overlay}>
                    <Heading title={"Food Hunt"} type={"h1"}/>
                    <div style={{margin: "13% 0"}}>
                        <div style={{background: "rgba(0,0,0,0.5)", padding: "1% 1%", margin: "0 23%"}}>
                            <input type="text" value={this.state.term} style={{width: "390px", opacity: "1"}}
                                   placeholder="Search any restaurant or food or cuisine"
                                   onChange={(e) => this.handleSearchChange(e.target.value)}/>
                            &nbsp;&nbsp;&nbsp;
                            <input type="text" value={this.state.location} placeholder="United States of America"
                                   style={{width: "290px"}}
                                   onChange={(e) => this.handleLocationChange(e.target.value)}/>
                            &nbsp;&nbsp;&nbsp;
                            <button type="button"><Link to={{
                                pathname: '/search/' + (this.state.location === "" ? "USA" : this.state.location) + (this.state.term === "" ? "" : `/${this.state.term}`),
                            }}>Search</Link></button>

                        </div>

                    </div>
                    <CustomChatbot eventHandler={this.clickEventHandler}/>
                </div>
                <video autoPlay loop muted style={{
                    width: "100%",
                    height: "100%",
                    opacity: "1",
                    transition: "opacity, 2s ease-in-out",
                }}>
                    <source src={VideoSrc} type="video/mp4"/>
                </video>
                <div>
                    <Heading title={"Some Restaurants Near You..."} type={"h2"}/>
                    <RestaurantList restaurants={this.state.restaurants}/>
                </div>
            </div>)
    }

}

export default AllRestaurants;
