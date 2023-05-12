import React, {Component} from "react";
import "./App.css";
import {Route, NavLink, Redirect} from "react-router-dom";
import * as tripAPI from "./services/trips-api";
import MyTripPage from "./components/MyTripPage/MyTripPage";
import NewTripPage from "./components/NewTripPage/NewTripPage";
import TripDetailPage from "./components/TripDetailPage/TripDetailPage";
import EditTripPage from "./components/EditTripPage/EditTripPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import userService from "./utils/userService";
import SearchPage from "./pages/SearchPage/SearchPage";

constructor() {
  super();
  this.state = {
    trips: [],
    user: userService.getUser(),
  };
}

handleLogout = () => {
  userService.logout();
  this.setState({user: null, trips: []});
}

handleSignupOrLogin = () => {
  this.setState({user: userService.getUser()}, () => this.getTrips());
}