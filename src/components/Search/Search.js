import React, {Component} from 'react';
import Axios from "axios";
import RestaurantList from "../RestaurantList/RestaurantList";

const token = process.env.REACT_APP_API_KEY

class Search extends Component{

    state = {
        restaurants : {}
    }

    constructor(props) {
        super(props);
        console.log(props)
        this.getBusinessByLocation = this.getBusinessByLocation.bind(this);
    }

    getBusinessByLocation =()=>{
        let location = this.props.location;
        if(null === location || location === '')
            location = 'USA'
        Axios({
            method: 'get',
            url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${location}`,
            headers: {'Authorization': 'Bearer ' + token}
        }).then(res => {
            console.log(res.data.businesses)
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
export default Search;
