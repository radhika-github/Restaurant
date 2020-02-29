import React, {Component} from 'react';
import GridList from "@material-ui/core/GridList/GridList";
import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar/GridListTileBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {makeStyles} from "@material-ui/core";
import './restaurants.css'
import Heading from '../NavBar/Heading';
// import Loading from "../LoadingIcon/Loading";

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
            hoverCellId: "",
            showRestaurantDetails: false,
            // componentsLoaded: false
        }
        this.onTileClick = this.onTileClick.bind(this);
    }

    onTileClick() {
        this.setState({showRestaurantDetails: true});
    }

    // componentDidMount(){
    //     this.setState({componentsLoaded: true})
    // }

    render() {
        return (
            <div>
                <div style={{overflow: "hidden", margin: "0 15%"}}>
                    <div className={classes.root}>
                        <GridList cellHeight={400} cols={3} spacing={20} className={classes.gridList} margin={20}>
                            {
                                // (this.state.componentsLoaded === true)?(
                                (this.props.restaurants.length>0)?(
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
                                                             onClick={() => window.open(`/restaurant/${tile.name.replace(" ", "-")}/${tile.id}`, '_self')}
                                                             style={{opacity: "0.5"}}
                                                        />
    
                                                    ) : (<img src={tile.image_url} alt={tile.name}
                                                              onClick={() => window.open(`/restaurant/${tile.name.replace(" ", "-")}/${tile.id}`, '_self')}
                                                    />)
                                            }
    
                                            <GridListTileBar
                                                title={tile.name}
                                                titlePosition="top"
                                                actionIcon={
                                                    <IconButton aria-label={`star ${tile.name}`} className={classes.icon}>
                                                        {/*<StarBorderIcon/>*/}
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
    
                                    ))
                                ):(<div><Heading type="h2" title="No Results Found"/></div>)
                                // ):(<div><Loading></Loading></div>)
                                }
                        </GridList>

                    </div>
                </div>
            </div>
        )
    }
}

export default RestaurantList;