import React from "react";
import ReactDOM from "react-dom";
import {compose, withProps, withState} from "recompose";
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker
} from "react-google-maps";

const AppMap = compose(
    withState("activeLabel", "setActiveLabel", ""),
    withState("hoverMarker", "setHoverMarker", ""),
    withProps({
        googleMapURL:
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyBi_JTzVqM5i25N6YLkEnn81lCxKj2BtdQ&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `400px`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withScriptjs,
    withGoogleMap
)(props => (
    <GoogleMap defaultZoom={13} center={{lat: props.latitude, lng: props.longitude}}>
        {
            console.log(props)
        }
        {
            Array.from(props.latitudes).map((latitude, index) =>
                (
                    <Marker id={index} position={{lat: latitude, lng: props.longitudes[index]}} label={(index===props.hoverMarker)?props.activeLabel:""}
                            onMouseOver={() => {
                                props.setHoverMarker(index)
                                props.setActiveLabel(props.name[index])
                            }}
                            onMouseOut={()=>{props.setActiveLabel("")}}
                        onClick={() => window.open(`/restaurant/${props.name[index].replace(" ", "-")}/${props.id[index]}`, '_self')}
                    />
                )
            )
        }
    </GoogleMap>
));

export default AppMap;
