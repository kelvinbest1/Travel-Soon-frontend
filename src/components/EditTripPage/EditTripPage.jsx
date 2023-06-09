import React, { useState } from 'react';

import {Link} from "react-router-dom";
import "./EditTripPage.css"; 

function EditTripPage() {
    const [invalidForm, setInvalidForm]= useState(false)
    const [formData, setFormData]= useState(prop.location.state.trip)
      
    

    formRef = React.createRef();

    const handleSubmit = e => {
        e.preventDefault();
        this.props.handleUpdateTrip(this.state.formData);
    };

    const handleChange = e => {
        const formData = {
            ...this.state.formData,
            [e.target.name]: e.target.value,
        };
        this.setState({
            formData,
            invalidForm: !this.formRef.current.checkValidity(),
        });
    };

    
        return (
            <>
                <h1>Edit Trip</h1>
                <form
                    ref={this.formRef}
                    autoComplete="off"
                    onSubmit={this.handleSubmit}
                >
                    <div className="form-group">
                        <label>Trip Name</label>
                        <input 
                            className="form-control" 
                            name="name"
                            value={this.state.formData.name}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>City</label>
                        <input
                            className="form-control"
                            name="city"
                            value={this.state.formData.city}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label>State</label>
                        <input
                            className="form-control"
                            name="state"
                            value={this.state.formData.state}
                            onChange={this.handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-xs"
                        disabled={this.state.invalidForm}
                    >Save Trip Changes 
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;

                    <Link to="/">Cancel Changes</Link>
                </form>
            </>
        );
        }

export default EditTripPage;

