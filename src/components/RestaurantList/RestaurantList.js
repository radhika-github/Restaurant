import React, {Component} from 'react';
import GridList from "@material-ui/core/GridList/GridList";
import GridListTile from "@material-ui/core/GridListTile/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar/GridListTileBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import {makeStyles} from "@material-ui/core";
import NavBar from "../NavBar/NavBar";

const classes = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
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
}));

class RestaurantList extends Component{

    render() {
        return (
            <div>
                <NavBar/>
                <div className={classes.root}>
                    <GridList cellHeight={500} spacing={2} className={classes.gridList}>
                        {Array.from(this.props.restaurants).map(tile => (
                            <GridListTile key={tile.img} cols={1} rows={1}>
                                <img src={tile.image_url} alt={tile.title} />
                                <GridListTileBar
                                    title={tile.name}
                                    titlePosition="top"
                                    actionIcon={
                                        <IconButton aria-label={`star ${tile.name}`} className={classes.icon}>
                                            <StarBorderIcon />
                                        </IconButton>
                                    }
                                    actionPosition="left"
                                    className={classes.titleBar}
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                </div>
            </div>
        )
    }
}

export default RestaurantList;