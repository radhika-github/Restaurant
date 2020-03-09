import React, {Component} from 'react';
import NavBar from "../NavBar/NavBar";
import SearchAPI from "./SearchAPI";
import Heading from "../NavBar/Heading";
import Checkbox from 'rc-checkbox';
import 'rc-checkbox/assets/index.css';

class Search extends Component {

    state = {
        openNow: false,
        priceLow: false,
        priceMedium: false,
        priceHigh: false,
        priceVeryHigh: false
    }


    render() {
        return (
            <div>
                <NavBar/>

                <div style={{
                    overflow: "hidden",
                    margin: "0 20% 2% 20%",
                    display: "inline-block",
                    fontFamily: "Catamaran",
                    fontSize: "1.3rem"
                }}>
                    <label>Open Now: <Checkbox onChange={() => {
                        this.setState({openNow: !this.state.openNow})
                    }}/></label> &nbsp;&nbsp;&nbsp;&nbsp;

                    Price: &nbsp;&nbsp;&nbsp;<label><Checkbox onChange={() => {
                    this.setState({priceLow: !this.state.priceLow})
                }}/> &nbsp;$</label> &nbsp;&nbsp;&nbsp;
                    <label><Checkbox onChange={() => {
                        this.setState({priceMedium: !this.state.priceMedium})
                    }}/>&nbsp;$$</label> &nbsp;&nbsp;&nbsp;
                    <label><Checkbox onChange={() => {
                        this.setState({priceHigh: !this.state.priceHigh})
                    }}/>&nbsp;$$$</label> &nbsp;&nbsp;&nbsp;<label><Checkbox onChange={() => {
                    this.setState({priceVeryHigh: !this.state.priceVeryHigh})
                }}/>&nbsp;$$$$</label>
                </div>
                <SearchAPI location={this.props.match.params.location} term={this.props.match.params.term}
                           openNow={this.state.openNow} priceLow={this.state.priceLow}
                           priceMedium={this.state.priceMedium}
                           priceHigh={this.state.priceHigh} priceVeryHigh={this.state.priceVeryHigh}/>
            </div>
        );
    }
}

export default Search;