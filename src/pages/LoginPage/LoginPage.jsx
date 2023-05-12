import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./LoginPage.css";
import userService from "../../utils/userService";

class LoginPage extends Component {

    state = {
        email: "",
        pw: ""
    };

    handleChange = (e) => {
        // Implement in an elegant way
        this.setState({
            // Using Computed Property Names
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userService.login(this.state);
            this.props.handleSignupOrLogin();
            // Successfully signed up - show GamePage
            this.props.history.push("/");
        } catch (err) {
            // Do not alert in your projects,
            // show a modal or some UI instead
            alert("Invalid login");
        }
    }
