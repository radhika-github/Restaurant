import React, {Component} from 'react';
import Axios from "axios";
import RestaurantList from "../RestaurantList/RestaurantList";

const token = process.env.REACT_APP_API_KEY

class SearchAPI extends Component{

    state = {
        restaurants : {}
    }

    constructor(props) {
        super(props);
        this.getBusinessByLocation = this.getBusinessByLocation.bind(this);
    }

    getBusinessByLocation =()=>{
        Axios({
            method: 'get',
            url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${this.props.location}&term=${this.props.term}`,
            headers: {'Authorization': 'Bearer ' + token}
        }).then(res => {
            this.setState({restaurants: res.data.businesses})
        })
            .catch(console.log)
    }

    componentWillMount(){
        this.getBusinessByLocation();
    }


    render(){
        return(
            <div>
                <RestaurantList restaurants={this.state.restaurants}/>
            </div>
        )
    }
}
export default SearchAPI;
