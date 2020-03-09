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
import ContactUs from './ContactUs/contactUs'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import RestaurantsVersusCategory from "./Graph/RestaurantsVersusCategory";

const overlay = {
    position: "absolute",
    color: "#FFF",
    textAlign: "center",
    fontSize: "20px",
    width: "100%",
    padding: "10px 0",
    zIndex: "2147483647",
}

const token = process.env.REACT_APP_API_KEY;

const useStyles = makeStyles({
    root: {
        background: props =>
            props.color === 'red'
                ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: props =>
            props.color === 'red'
                ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
                : '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: 8,
    },
});

function MyButton(props) {
    const {color, ...other} = props;
    const classes = useStyles(props);
    return <Button className={classes.root} {...other} />;
}

const CssTextField = withStyles({
    root: {
        '& label': {
            color: '#FE6B8B',
        },
        '& label.Mui-focused': {
            color: '#FF8E53',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#FF8E53',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#FE6B8B',
            },
            '&:hover fieldset': {
                borderColor: '#FE6B8B',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#FE6B8B',
            },
        },
        resize:{
            fontSize:50
        },
    },
})(TextField);

MyButton.propTypes = {
    color: PropTypes.oneOf(['blue', 'red']).isRequired,
};

class AllRestaurants extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            term: "",
            restaurants: [],
            location: "",
            latitudesOfNearByRest: [],
            longitudesOfNearByRest: [],
            restNames: [],
            restIds: [],
            errorMsg: "",
            allRestaurants: "",

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
            url = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=USA"
        }
        Axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + token}
        }).then(res => {
            // this.setState({restaurants: res.data.businesses});
            let count = 0;
            this.setState({allRestaurants: res.data.businesses});
            Array.from(res.data.businesses).map(rest => {
                if (count < 3) {
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
                this.setState({
                    restIds: this.state.restIds.concat(rest.id)
                })
            })
        })
            .catch((error)=>{
                if(error.message === "Request failed with status code 429"){
                    this.setState({errorMsg: "Oops! Looks like we ran out of number of times we can talk to Yelp"})
                }
            });
        this.getUserLocation();

    }


    getUserLocation() {
        Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_KEY);
        Geocode.setLanguage("en");
        Geocode.setRegion("us");
        Geocode.enableDebug();
        if (this.state.latitude !== null && this.state.longitude !== null) {
            Geocode.fromLatLng(this.state.latitude, this.state.longitude).then(
                response => {
                    const address = response.results[0].formatted_address;
                    this.setState({location: address})
                },
                error => {
                    console.error(error);
                }
            );
        }
    }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            success => {
                this.setState({latitude: success.coords.latitude});
                this.setState({longitude: success.coords.longitude});
            }, error => {
                console.log("Geo Location Not received")
            });
        this.getBusinessByLocation();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div style={overlay}>
                    <Heading title={"Food Hunt"} type={"h1"}/>
                    <div style={{margin: "10% 0"}}>
                        <div style={{background: "rgba(0,0,0,0.5)", padding: "1% 1%", margin: "0 15%"}}>
                            <CssTextField
                                value={this.state.term}
                                label="Search any restaurant or food or cuisine..."
                                variant="outlined"
                                id="custom-css-outlined-input"
                                InputProps={{ style: { fontSize: 20, color: "white" } }}
                                InputLabelProps={{style: { fontSize: 20} }}
                                style={{width: "400px"}}
                                onChange={(e) => this.handleSearchChange(e.target.value)}
                            />

                            &nbsp;&nbsp;&nbsp;
                            <CssTextField
                                value={this.state.location}
                                label="Location"
                                variant="outlined"
                                id="custom-css-outlined-input"
                                InputProps={{ style: { fontSize: 20, color: "white" } }}
                                InputLabelProps={{style: { fontSize: 20} }}
                                style={{width: "390px"}}
                                onChange={(e) => this.handleLocationChange(e.target.value)}
                            />
                            &nbsp;&nbsp;&nbsp;
                            <MyButton color="red"><Link to={{
                                pathname: '/search/' + (this.state.location === "" ? "USA" : this.state.location) + (this.state.term === "" ? "" : `/${this.state.term}`),
                            }} style={{color:"black",textDecoration: 'inherit'}}>Search</Link></MyButton>

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
                    <RestaurantList restaurants={this.state.restaurants} errorMsg={this.state.errorMsg}/>
                </div>

                <div style={{margin: "0 15% 5% 15%"}}>
                    <AppMap latitudes={this.state.latitudesOfNearByRest} longitudes={this.state.longitudesOfNearByRest}
                            latitude={(this.state.latitude) === null ? 37.767413217936834 : this.state.latitude}
                            longitude={(this.state.longitude === null) ? -122.419418 : this.state.longitude}
                            name={this.state.restNames}
                            id={this.state.restIds}/>
                </div>

                <div>
                    <Heading title={"Know Your City More"} type={"h2"}/>
                    <RestaurantsVersusCategory allRestaurants={this.state.allRestaurants}/>
                </div>
                <div style={{margin: "5% 0% 5% 0%", minHeight: "400px"}}>
                    <Heading title={"Connect With Us"} type={"h2"}/>
                    <ContactUs/>
                    <div style={{margin: "0% 0% 0% 10%"}}>
                        <br/><br/><br/>
                    </div>
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
