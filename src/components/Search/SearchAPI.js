import React, {Component} from 'react';
import Axios from "axios";
import RestaurantList from "../RestaurantList/RestaurantList";

const token = process.env.REACT_APP_API_KEY

class SearchAPI extends Component{

    state = {
        restaurants : {},
        searchResult: {}
    }

    constructor(props) {
        super(props);
        console.log(this.props.openNow)
        this.getBusinessByLocation = this.getBusinessByLocation.bind(this);
        this.filtering = this.filtering.bind(this)
    }

    getBusinessByLocation =()=>{
        Axios({
            method: 'get',
            url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${this.props.location}&term=${this.props.term}`,
            headers: {'Authorization': 'Bearer ' + token}
        }).then(res => {
            this.setState({restaurants: res.data.businesses})
            console.log(this.state.restaurants)
            console.log("hi")
            this.setState({searchResult: this.state.restaurants})
        })
            .catch(console.log)
    }

    componentWillMount(){
        this.getBusinessByLocation();
    }

    filtering(item) {
        console.log(item.price)
        if (this.props.priceHigh === true && item.price=== "$$$"){
            return true;
        }

        if (this.props.priceMedium === true && item.price=== "$$"){
            return true;
        }

        return false;
    }

    componentDidUpdate(prevProps){
        if (this.props!== prevProps) {
            let result = this.state.restaurants;
            if (this.props.openNow === true) {
                result = result.filter(restaurant =>
                    restaurant.is_closed === false)
            }


                result = result.filter((item)=>{this.filtering(item)})

            // if(this.props.priceMedium === true){
            //     result = result.filter(restaurant =>
            //         restaurant.price === "$$")
            // }
            // if(this.props.priceHigh === true){
            //     result = result.filter(restaurant =>
            //         restaurant.price === "$$$")
            // }
            // if(this.props.priceVeryHigh === true){
            //     result = result.filter(restaurant =>
            //         restaurant.price === "$$$$")
            // }
            this.setState({searchResult: result})
            // console.log(this.state.searchResult)
        }
    }

    render(){
        return(
            <div>
                <RestaurantList restaurants={this.state.searchResult}/>
            </div>
        )
    }
}
export default SearchAPI;
