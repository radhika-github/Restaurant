import React, {Component} from 'react'
import {Chart} from "react-google-charts";
import Axios from "axios";

const token = process.env.REACT_APP_API_KEY;

class RestaurantsVersusCategory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            allCategories: []
        }

    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.allRestaurants !== this.props.allRestaurants) {
                this.getBusinessById(nextProps.allRestaurants);
        }

    }

    getBusinessById = async (restaurants) => {
        let dataEntry = [];
        let cats = {};
        dataEntry = dataEntry.concat([["Category", "Number of Restaurants"]]);
        let allCategories = [];
        Array.from(restaurants).map((rest, index) => {
                let categories = rest.categories;
                categories.map((category, index) => {
                    if (cats[category.title] === undefined) {
                        cats[category.title] = 1;
                    } else {
                        cats[category.title] += 1;
                    }
                });
        });

        var counter =0 ;
        for (var key in cats) {
            if (cats.hasOwnProperty(key)){
                allCategories[counter] = {v: counter, f:key};
                let entry = [counter, cats[key]];
                console.log(entry)
                dataEntry = dataEntry.concat([entry]);
                counter++;
            }
        }
        this.setState({data: dataEntry});
        this.setState({allCategories: allCategories});
        this.setState({ticks: allCategories})
        console.log(this.state.ticks)
    }

    render() {
        return (
            <div className={"my-pretty-chart-container"}>

                <Chart
                    width={'100%'}
                    height={'400px'}
                    chartType="ScatterChart"
                    loader={<div>Loading Chart</div>}
                    data={this.state.data}
                    options={{
                        title: 'Restaurants per Category',
                        hAxis: {title: 'Various Categories', ticks: this.state.ticks},
                        vAxis: {title: 'Number of Restaurants'},
                    }}
                    rootProps={{'data-testid': '2'}}
                />
            </div>
        );
    }
}

export default RestaurantsVersusCategory;