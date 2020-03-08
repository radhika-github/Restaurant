import React, {Component} from 'react';
import Axios from "axios";
import RestaurantList from "../RestaurantList/RestaurantList";

const token = process.env.REACT_APP_API_KEY

class SearchAPI extends Component {

    state = {
        restaurants: {},
        searchResult: {}
    }

    constructor(props) {
        super(props);
        console.log(this.props.openNow)
        this.getBusinessByLocation = this.getBusinessByLocation.bind(this);
    }

    getBusinessByLocation = () => {
        Axios({
            method: 'get',
            url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${this.props.location}&term=${this.props.term}`,
            headers: {'Authorization': 'Bearer ' + token}
        }).then(res => {
            this.setState({restaurants: res.data.businesses})
            this.setState({searchResult: this.state.restaurants})
        })
            .catch(console.log)
    }

    componentWillMount() {
        this.getBusinessByLocation();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            let result = this.state.restaurants;
            if (this.props.openNow === true) {
                result = result.filter(restaurant =>
                    restaurant.is_closed === false)
            }

            if (this.props.priceLow || this.props.priceMedium || this.props.priceHigh || this.props.priceVeryHigh) {
                result = result.filter(restaurant =>
                    (this.props.priceLow === true && restaurant.price === "$") || (this.props.priceMedium === true && restaurant.price === "$$") ||
                    (this.props.priceHigh === true && restaurant.price === "$$$") || (this.props.priceVeryHigh === true && restaurant.price === "$$$$"))
            }

            this.setState({searchResult: result})
        }
    }

    render() {
        return (
            <div>
                <RestaurantList restaurants={this.state.searchResult}/>
            </div>
        )
    }
}

export default SearchAPI;
