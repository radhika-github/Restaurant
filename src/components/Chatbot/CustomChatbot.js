import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

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
            message: "Hello, Welcome to our shop",
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
            trigger: "Asking options to eat"
        },
        {
            id: "Asking options to eat",
            message: "Hi {previousValue}, Glad to know you !!",
            trigger: "Done"
        },
        {
            id: "Done",
            message: "Have a great day !!",
            end: true
        }
    ];
    return (
        <ThemeProvider theme={theme}>
            <ChatBot steps={steps} {...config} />
        </ThemeProvider>
    );
}
export default CustomChatbot;
