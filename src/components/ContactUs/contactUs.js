import React, {Component} from 'react'
import './contactUs.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
class contactUs extends Component {

    render() {
        return (
            <div className={"contactUs"}>
                <div className="center" style={{
                    color: "black",
                    fontSize: "200%",
                    fontFamily: 'Aladin',
                    marginTop: "5px"
                }}>

                    <div style={{position: "absolute",marginLeft: "50%",marginTop: "10%"}}>
                        <ul>
                            <li><a href="https://www.facebook.com/radhi.kulkarni.9" target="_blank"><i
                                className="fa fa-facebook" aria-hidden="true"></i></a></li>
                            <li><a href="https://github.com/radhika-github" target="_blank"><i className="fa fa-github"
                                                                                               aria-hidden="true"></i></a>
                            </li>
                            <li><a href="#"><i className="fa fa-google" aria-hidden="true"></i></a></li>
                            <li><a href="https://www.linkedin.com/in/raj-kumar-web-designer/"><i
                                className="fa fa-linkedin" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i className="fa fa-instagram" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i className="fa fa-envelope" aria-hidden="true"></i></a></li>

                        </ul>

                    </div>
                </div>

            </div>
        )
    }
}

export default contactUs
;