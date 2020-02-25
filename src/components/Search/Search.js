import React, {Component} from 'react';
import NavBar from "../NavBar/NavBar";
import SearchAPI from "./SearchAPI";

class Search extends Component{

    render(){
        return(
            <div>
                <NavBar/>
                <SearchAPI location={this.props.match.params.location} term={this.props.match.params.term}/>
            </div>
        );
    }
}

export default Search;