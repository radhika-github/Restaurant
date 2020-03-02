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
            address2: ""
        }
    }

    getBusinessById = (id) => {
        Axios({
            method: 'get',
            url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`,
            headers: {'Authorization': 'Bearer ' + token}
        }).then(res => {
            console.log(res.data);
            this.setState({id: res.data.id});
            this.setState({images: res.data.photos})
            this.setState({restaurant: res.data})
            let location = this.state.restaurant.location;
            console.log(location)
            this.setState({address1:location.display_address[0]})
            this.setState({address2: location.display_address[1]})
            let hours = this.state.restaurant.hours;
            console.log(hours)
        })
            .catch(console.log)
    }

    componentDidMount() {
        let id = this.props.match.params.id
        this.getBusinessById(id);
    }

    render() {

        return (
            <div>
                <NavBar/>

                    <div style={{margin:"5%", float: "left", width: "50%", height: "30%"}}>
                        <div className="carousel-wrapper">
                            <Carousel autoPlay={true}showArrows={true} showIndicators={true} infiniteLoop={true} showThumbs={false}>
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

                <div style={{margin:"5% 10% 5% 5%", alignItems: "center"}}>
                    <div style={{display: "inline-block"}}>
                    <div><span style={{fontFamily: "Catamaran", fontSize: "3rem", textAlign: "center"}}>{this.state.restaurant.name}</span>
                    {
                        (this.state.restaurant.is_closed === true)?(
                            <Badge variant="danger">CLOSED NOW</Badge>
                        ): (<span><sup>&nbsp;<Badge variant="success" style={{paddingBottom: "1%"}}>OPEN NOW</Badge></sup></span>)

                    }

                    </div>
                    </div>
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
                            <Card.Subtitle className="mb-2 text-muted">{this.state.restaurant.review_count}&nbsp; Reviews</Card.Subtitle>
                            <br/>
                            <Card.Subtitle><PhoneIcon/>&nbsp;{this.state.restaurant.display_phone}</Card.Subtitle>
                            <br/>
                            <Card.Subtitle><RoomIcon/>&nbsp;{this.state.address1}, {this.state.address2}</Card.Subtitle>
                            {/*<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>*/}
                            {/*<Card.Text>*/}
                                {/*{*/}
                                    {/*this.state.restaurant.hours[0].open.map(entry=>(*/}
                                    {/*<div>{entry.start} - {entry.end} </div>*/}
                                    {/*))*/}
                                {/*}*/}
                            {/*</Card.Text>*/}
                            {/*<Card.Link href="#">Card Link</Card.Link>*/}
                            {/*<Card.Link href="#">Another Link</Card.Link>*/}
                        </Card.Body>
                    </Card>
                </div>
            </div>);
    }
}

export default Restaurant;