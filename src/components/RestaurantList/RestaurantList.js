import React, {Component} from 'react';
import GridList from "@material-ui/core/GridList/GridList";
import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar/GridListTileBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {makeStyles} from "@material-ui/core";
import NavBar from "../NavBar/NavBar";
import './restaurants.css'
import Restaurant from '../Restaurant/Restaurant'
import {Link} from "react-router-dom";

const classes = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
    textStyle: {
        position: 'absolute',
    },
}));

class RestaurantList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hoverCellId: ""
        }
    }


    render() {
        return (
            <div>
                <div style={{overflow: "hidden", margin: "0 15%"}}>
                    <div className={classes.root}>
                        <GridList cellHeight={400} cols={3} spacing={20} className={classes.gridList} margin={20}>
                            {
                                Array.from(this.props.restaurants).map(tile => (

                                    <GridListTile key={tile.image_url} cols={1} rows={1} onMouseEnter={() => {
                                        this.setState({hoverCellId: tile.id})
                                    }}
                                                  onMouseLeave={() => {
                                                      this.setState({hoverCellId: ""})
                                                  }}>
                                        {
                                            (tile.id === this.state.hoverCellId) ?
                                                (

                                                    <img src={tile.image_url} alt={tile.name}
                                                      onClick={() => window.open(`/restaurant/${tile.name}`, '_self')}
                                                      style={{opacity: "0.5"}}
                                                />

                                                ) : (<img src={tile.image_url} alt={tile.name}
                                                            onClick={() => window.open(`/restaurant/${tile.name}`, '_self')}
                                                />)
                                        }

                                        <GridListTileBar
                                            title={tile.name}
                                            titlePosition="top"
                                            actionIcon={
                                                <IconButton aria-label={`star ${tile.name}`} className={classes.icon}>
                                                    <StarBorderIcon/>
                                                </IconButton>
                                            }
                                            actionPosition="left"
                                            className={classes.titleBar}
                                        />

                                        {
                                            (tile.is_closed === true) ? (
                                                <div className="ribbon closed ribbon-bottom-right">
                                                    <span>&nbsp;&nbsp;CLOSED NOW</span>
                                                </div>) : (
                                                <div className="ribbon open ribbon-bottom-right">
                                                    <span>&nbsp;&nbsp;OPEN NOW</span>
                                                </div>)
                                        }


                                    </GridListTile>

                                ))}
                        </GridList>

                    </div>
                </div>
            </div>
        )
    }
}

export default RestaurantList;