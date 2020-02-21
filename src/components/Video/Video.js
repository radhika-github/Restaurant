import React, {Component} from 'react';
import VideoSrc from './food.mp4';
import './video.css'

const overlay ={
    position: "absolute",
    color: "#FFF",
    textAlign: "center",
    fontSize: "20px",
    backgroundColor: "rgba(221, 221, 221, 0.3)",
    width: "640px",
    margin: "500px",
    padding: "10px 0",
    zIndex: "2147483647"
}
class Video extends Component {

    state = {
        loading: true
    };

    componentDidMount() {
        if (this.video) {
            this.video.addEventListener("loadeddata", () => {
                // this.setState({ loading: false });
            });
        }
    }

    componentWillUnmount() {
        if (this.video) {
            this.video.removeEventListener("loadeddata", () => {
            });
        }
    }

    render() {
        return (
            <div style={{position: "relative"}}>
                <video autoPlay loop muted style={{
                    width: "100%",
                    height:"100%",
                    opacity: "1",
                    transition: "opacity, 2s ease-in-out",
                    zIndex: "1"
                }}>
                    <source src={VideoSrc} type="video/mp4"/>
                </video>
            </div>
        );
    }
}

export default Video;