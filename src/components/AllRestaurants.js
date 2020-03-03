import React, {Component} from 'react';
import VideoSrc from "./Video/food.mp4";
import NavBar from "./NavBar/NavBar";
import {Link} from 'react-router-dom'
import CustomChatbot from "./Chatbot/CustomChatbot";
import Axios from "axios";
import RestaurantList from "./RestaurantList/RestaurantList";
import Heading from "./NavBar/Heading";
import {geolocated} from "react-geolocated";
import Geocode from "react-geocode";
import AppMap from './GoogleMaps/AppMap'
// import Loading from "./LoadingIcon/Loading";

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
            latitude: null,
            longitude: null,
            term: "",
            restaurants: [],
            location: "",
            latitudesOfNearByRest: [],
            longitudesOfNearByRest: [],
            restNames: []

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
        let url = "";
        if (this.state.latitude != null && this.state.longitude != null) {
            url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?latitude=${this.state.latitude}&longitude=${this.state.longitude}`
        } else {
            url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=USA&limit=3"
        }
        Axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + token}
        }).then(res => {
            // this.setState({restaurants: res.data.businesses});
            let count = 0;
            Array.from(res.data.businesses).map(rest => {
                if (count != 3) {
                    this.setState({
                        restaurants: this.state.restaurants.concat(rest)
                    })
                    count += 1;
                }
                let coordinates = rest.coordinates;
                this.setState({
                    latitudesOfNearByRest: this.state.latitudesOfNearByRest.concat(coordinates.latitude)
                })
                this.setState({
                    longitudesOfNearByRest: this.state.longitudesOfNearByRest.concat(coordinates.longitude)
                })
                this.setState({
                    restNames: this.state.restNames.concat(rest.name)
                })
            })
            this.state.restNames.map(a => {
                console.log("lat" + a)
            })

        })
            .catch(console.log)

        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);
        Geocode.setLanguage("en");
        Geocode.setRegion("us");
        Geocode.enableDebug();
        Geocode.fromLatLng(this.state.latitude, this.state.longitude).then(
            response => {
                const address = response.results[0].formatted_address;
                this.setState({location: address})
            },
            error => {
                console.error(error);
            }
        );
        // this.setState({componentsLoaded: true})

    }


    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            success => {
                this.setState({latitude: success.coords.latitude});
                this.setState({longitude: success.coords.longitude});
                this.getBusinessByLocation();
            });

    }

    render() {
        return (
            <div>
                <div style={overlay}>
                    <Heading title={"Food Hunt"} type={"h1"}/>
                    <div style={{margin: "10% 0"}}>
                        <div style={{background: "rgba(0,0,0,0.5)", padding: "1% 1%", margin: "0 20%"}}>
                            <input type="text" value={this.state.term} style={{width: "390px", opacity: "1"}}
                                   placeholder="Search any restaurant or food or cuisine"
                                   onChange={(e) => this.handleSearchChange(e.target.value)}/>
                            &nbsp;&nbsp;&nbsp;
                            <input type="text" value={this.state.location} placeholder="United States of America"
                                   style={{width: "350px"}}
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
                    {/*{(this.state.componentsLoaded === true) ? (*/}
                    <RestaurantList restaurants={this.state.restaurants}/>
                    {/*) : (<Loading/>)}*/}
                </div>

                <div style={{margin: "0 15% 5% 15%"}}>
                    <AppMap latitudes={this.state.latitudesOfNearByRest} longitudes={this.state.longitudesOfNearByRest}
                            latitude={this.state.latitude} longitude={this.state.longitude} name={this.state.restNames}/>
                </div>
            </div>)
    }

}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(AllRestaurants);
