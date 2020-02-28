import React, {Component} from 'react';
import NavBar from "../NavBar/NavBar";
import Axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from "react-responsive-carousel";
// import Carousel from 'react-bootstrap/Carousel'
import './restaurant.css'

const token = process.env.REACT_APP_API_KEY

class Restaurant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurant: "",
            images: []
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
        let styles = {
            margin: 'auto'
            // width: '500px'
        };

        return (
            <div>
                <NavBar/>

                <div id='carousel-custom' className='carousel slide' data-ride='carousel'>
                    <div className='carousel-outer'>
                        <div className='carousel-inner'>
                            {
                                this.state.images.map((photo, index) => (
                                (index==0)?(
                                    <div className='item active'>
                                        <img src={photo}/>
                                    </div>
                                ):(
                                    <div className='item'>
                                        <img src={photo}/>
                                    </div>
                                )

                                ))
                            }
                        </div>

                        <a className='left carousel-control' href='#carousel-custom' data-slide='prev'>
                            <span className='glyphicon glyphicon-chevron-left'></span>
                        </a>
                        <a className='right carousel-control' href='#carousel-custom' data-slide='next'>
                            <span className='glyphicon glyphicon-chevron-right'></span>
                        </a>
                    </div>

                    <ol className='carousel-indicators'>
                        {
                            this.state.images.map((photo, index) => (
                                <li data-target='#carousel-custom' data-slide-to={index} className='active'><img
                                    src={photo} alt=''/></li>
                            ))
                        }
                    </ol>
                </div>
            </div>);
    }
}

export default Restaurant;