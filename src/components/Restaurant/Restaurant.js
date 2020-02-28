import React, {Component} from 'react';
import NavBar from "../NavBar/NavBar";
import Axios from "axios";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const token = process.env.REACT_APP_API_KEY

class Restaurant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurant: "",
            images: [],
        }
    }

    getBusinessById = (id) => {
        Axios({
            method: 'get',
            url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/${id}`,
            headers: {'Authorization': 'Bearer ' + token}
        }).then(res => {
            console.log(res.data);
            this.setState({restaurant: res.data.id});
            console.log(this.state.restaurant);
            this.setState({images: res.data.photos})
            console.log(this.state.images)
            // this.setState({images: {src: res.photos, caption:"hi"}})
            // console.log(this.state.images)
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
                <div style={{margin:"0 30%"}}>
                    <div className="carousel-wrapper" style={{paddingLeft: "20%"}}>
                        <Carousel autoPlay={true}showArrows={true} width={"70%"} showIndicators={true} infiniteLoop={true} >
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

            </div>);
    }
}

export default Restaurant;