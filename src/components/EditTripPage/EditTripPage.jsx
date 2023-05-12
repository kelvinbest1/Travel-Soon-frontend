import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./EditTripPage.css"; 

class EditTripPage extends Component {
    state = {
        invalidForm: false,
        formData: this.props.location.state.trip,
    };

    formRef = React.createRef();

    handleSubmit = e => {
        e.preventDefault();
        this.props.handleUpdateTrip(this.state.formData);
    };

    handleChange = e => {
        const formData = {
            ...this.state.formData,
            [e.target.name]: e.target.value,
        };
        this.setState({
            formData,
            invalidForm: !this.formRef.current.checkValidity(),
        });
    };
    
