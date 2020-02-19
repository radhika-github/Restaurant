import React, {Component} from 'react';
import Axios from 'axios';

const token = process.env.REACT_APP_API_KEY
class AllRestaurants extends Component{

    componentDidMount(){
        Axios({
            method: 'get',
            url: `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/autocomplete?text=del&latitude=37.786882&longitude=-122.399972`,
            headers: {'Authorization': 'Bearer ' + token}
        }).then(res => {
            console.log(res)
        })
        .catch(console.log)
    }

    render() {
        return (<div>Hi</div>)
    }

}

export default AllRestaurants;
