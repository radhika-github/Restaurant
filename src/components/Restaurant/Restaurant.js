import React, {Component} from 'react';
import NavBar from "../NavBar/NavBar";
import Axios from "axios";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Heading from "../NavBar/Heading";
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import FontAwesome from 'react-fontawesome';
import StarRatingComponent from 'react-star-rating-component';
import PhoneIcon from '@material-ui/icons/Phone';
import RoomIcon from '@material-ui/icons/Room';
import MoneyIcon from '@material-ui/icons/Money';
import Map from "../GoogleMaps/Map";
import RestaurantsVersusCategory from "../Graph/RestaurantsVersusCategory";

// import faStyles from 'font-awesome/css/font-awesome.css'

const token = process.env.REACT_APP_API_KEY

class Restaurant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            restaurant: "",
            images: [],
            address1: "",
            address2: "",
            latitude: 0,
            longitude: 0,
            hours: [],
            dayOfWeek: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
            categories: []
        }
    }

    getTime = (time) => {
        let outputTime = "";
        if (time < 1200) {
            outputTime += ((time / 100.00).toFixed(2)) + " A.M.";
        } else {
            time -= 1200;
            outputTime += ((time / 100.00).toFixed(2)) + " P.M.";
        }
        return outputTime;
    };

    getBusinessById = (id) => {
        Axios({
            method: 'get',
            url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`,
            headers: {'Authorization': 'Bearer ' + token}
        }).then(res => {
            this.setState({id: res.data.id});
            this.setState({images: res.data.photos})
            this.setState({restaurant: res.data})
            let location = this.state.restaurant.location;
            this.setState({address1: location.display_address[0]});
            this.setState({address2: location.display_address[1]});
            let hours = [];
            let allHours = this.state.restaurant.hours[0];
            allHours.open.map((day, index) => {
                hours[index] = {
                    start: this.getTime(Number(day.start)),
                    end: this.getTime(Number(day.end))
                }
            });
            this.setState({hours: hours});
            let coordinates = this.state.restaurant.coordinates;
            this.setState({latitude: coordinates.latitude});
            this.setState({longitude: coordinates.longitude});
            let categories= this.state.restaurant.categories;
            let cat=[]
            categories.map(category=>{
                cat = cat.concat(category.title)
            });
            this.setState({categories: cat})
        })
            .catch(console.log)
    }

    componentWillMount() {
        let id = this.props.match.params.id
        this.getBusinessById(id);
    }

    render() {

        return (
            <div>
                <NavBar/>
                <div style={{
                    fontFamily: "Catamaran",
                    fontSize: "3rem",
                    textAlign: "center"
                }}>{this.state.restaurant.name}
                    {
                        (this.state.restaurant.is_closed === true) ? (
                            <Badge variant="danger">CLOSED NOW</Badge>
                        ) : (<span><sup>&nbsp;<Badge variant="success" style={{fontSize: "1rem"}}>OPEN NOW</Badge></sup></span>)

                    }

                </div>
                <div style={{margin: "5%", float: "left", width: "50%", height: "30%"}}>
                    <div className="carousel-wrapper">
                        <Carousel autoPlay={true} showArrows={true} showIndicators={true} infiniteLoop={true}
                                  showThumbs={false}>
                            {
                                this.state.images.map((photo, index) => (
                                    <div>
                                        <img src={photo}/>
                                    </div>
                                ))
                            }
                        </Carousel>
                    </div>
                </div>

                <div style={{margin: "5% 10% 5% 5%", alignItems: "center"}}>

                    <br/>
                    <Card>
                        <Card.Body>
                            <Card.Title className="mb-2 text-muted">
                                <MoneyIcon/>&nbsp;
                                {this.state.restaurant.price}
                            </Card.Title>
                            <Card.Title><StarRatingComponent
                                name="rate2"
                                editing={false}
                                starCount={5}
                                value={this.state.restaurant.rating}
                            /> &nbsp;&nbsp;</Card.Title>
                            <Card.Subtitle
                                className="mb-2 text-muted">{this.state.restaurant.review_count}&nbsp; Reviews</Card.Subtitle>
                            <br/>
                            <Card.Subtitle><PhoneIcon/>&nbsp;{this.state.restaurant.display_phone}</Card.Subtitle>
                            <br/>
                            <Card.Subtitle><RoomIcon/>&nbsp;{this.state.address1}, {this.state.address2}</Card.Subtitle>
                            <br/>
                            <Card.Subtitle>Hours</Card.Subtitle>
                            <table>
                                {
                                    this.state.hours.map((hour, index) => (
                                        <tr>
                                            <td>{this.state.dayOfWeek[index]}&nbsp;</td>
                                            <td>{hour.start} - {hour.end}</td>
                                        </tr>
                                    ))
                                }
                            </table>
                        </Card.Body>
                    </Card>
                    <br/><br/>
                    <Map isMarkerShown height={"40%"} width={"40%"} destLat={this.state.latitude}
                         destLng={this.state.longitude} name={this.state.restaurant.name}/>
                </div>

            </div>);
    }
}

export default Restaurant;