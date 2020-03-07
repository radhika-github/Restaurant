import React, {Component} from "react";
import {Link} from "react-router-dom";
import {makeStyles, withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";
import PropTypes from "prop-types";

const useStyles = makeStyles({
    root: {
        background: props =>
            props.color === 'red'
                ? 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
                : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: props =>
            props.color === 'red'
                ? '0 3px 5px 2px rgba(255, 105, 135, .3)'
                : '0 3px 5px 2px rgba(33, 203, 243, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        margin: 8,
    },
});

function MyButton(props) {
    const {color, ...other} = props;
    const classes = useStyles(props);
    return <Button className={classes.root} {...other} />;
}

const CssTextField = withStyles({
    root: {
        '& label': {
            color: 'black',
        },
        '& label.Mui-focused': {
            color: '#FF8E53',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#FF8E53',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#FE6B8B',
            },
            '&:hover fieldset': {
                borderColor: '#FE6B8B',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#FE6B8B',
            },
        }
    },
})(TextField);

MyButton.propTypes = {
    color: PropTypes.oneOf(['blue', 'red']).isRequired,
};

class SearchField extends Component{

    constructor(props){
        super(props);
        this.state = {
            term: "",
            location: ""
        }
    }

    handleLocationChange(value) {
        this.setState({
            location: value
        });
    }

    handleSearchChange(value) {
        this.setState({
            term: value
        });
    }

    render() {

        return (
            <div style={{margin: "0% 12% 0% 5%"}}>
                <CssTextField
                    value={this.state.term}
                    label="Search any restaurant or food or cuisine... "
                    variant="outlined"
                    id="custom-css-outlined-input"
                    InputProps={{ style: { fontSize: 16, color: "black" } }}
                    InputLabelProps={{style: { fontSize: 16} }}
                    style={{width: "300px"}}
                    onChange={(e) => this.handleSearchChange(e.target.value)}
                />

                &nbsp;&nbsp;&nbsp;
                <CssTextField
                    value={this.state.location}
                    label="Location"
                    variant="outlined"
                    id="custom-css-outlined-input"
                    InputProps={{ style: { fontSize: 16, color: "black" } }}
                    InputLabelProps={{style: { fontSize: 16} }}
                    style={{width: "300px"}}
                    onChange={(e) => this.handleLocationChange(e.target.value)}
                />
                &nbsp;&nbsp;&nbsp;
                <MyButton color="red"><Link to={{
                    pathname: '/search/' + (this.state.location === "" ? "USA" : this.state.location) + (this.state.term === "" ? "" : `/${this.state.term}`),
                }} style={{color:"black",textDecoration: 'inherit'}}>Search</Link></MyButton>

            </div>
        )
    }
}

export default SearchField