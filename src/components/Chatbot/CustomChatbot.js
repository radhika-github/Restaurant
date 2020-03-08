import React, {Component} from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            location: '',
        };
    }

    componentWillMount() {
        const { steps } = this.props;
        const { location } = steps;

        this.setState({ location });
    }

    render() {
        const { location } = this.state;
        return (
            <div style={{ width: '100%' }}>
                <table>
                    <tbody>
                    <tr>
                        <td>Please click on the below link:</td>
                    </tr>
                    <tr>
                        <td><a href={"/search/"+location.value}>Restaurants in {location.value}</a></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

Review.propTypes = {
    steps: PropTypes.object,
};

Review.defaultProps = {
    steps: undefined,
};


function CustomChatbot(props) {

    const config = {
        width: "300px",
        height: "400px",
        floating: true
    };

    const theme = {
        background: "white",
        fontFamily: "Arial, Helvetica, sans-serif",
        headerBgColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        headerFontColor: "#fff",
        headerFontSize: "25px",
        botBubbleColor: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        botFontColor: "#fff",
        userBubbleColor: "#fff",
        userFontColor: "#4c4c4c"
    };

    const steps = [
        {
            id: "Greet",
            message: "Hello, Welcome to Food Hunt",
            trigger: "Ask Name"
        },
        {
            id: "Ask Name",
            message: "Please type your name?",
            trigger: "Waiting user input for name"
        },
        {
            id: "Waiting user input for name",
            user: true,
            trigger: "Greeting the user"
        },
        {
            id: "Greeting the user",
            message: "Hi {previousValue}, Glad to know you !!",
            trigger: "Search Restaurants"
        },
        {
            id: "Search Restaurants",
            message: "I can help you find restaurants. Would you like to go ahead and search?",
            trigger: "Search Acceptance"
        },
        {
            id: "Search Acceptance",
            options: [
                {
                    value: true,
                    label: "Yes",
                    trigger: "Location Preference"
                },
                {
                    value: "false",
                    label: "No",
                    trigger: "Done"
                }
            ]
        },
        {
            id: "Location Preference",
            message: "Which location do you want to search?",
            trigger: "location"
        },
        {
            id: "location",
            user: true,
            trigger: "Link"
        },
        {
            id: "Link",
            component: <Review/>,
            asMessage: true,
            trigger: "Other restaurants"
        },
        {
            id: "Other restaurants",
            message: "Do you want to search restaurants in any other location?",
            trigger: "Search Acceptance"
        },
        {
            id: "Done",
            message: "Have a great day !!",
            end: true
        }
    ];
    return (
        <ThemeProvider theme={theme}>
            <ChatBot steps={steps} {...config} headerTitle={"Foodie"}/>
        </ThemeProvider>
    );
}
export default CustomChatbot;
