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

async getTrips () {
  let trips = await tripAPI.getAll();
  if (this.state.user) {
    trips = trips.filter((t) => t.user === this.state.user._id);
  }
  this.setState({trips});
}

handleNewTrip = async newTripData => {
  const newTrip = await tripAPI.create(newTripData);
  this.setState(
    state=> ({
      trips: [...state.trips, newTrip],
    }),
    () => this.props.history.push("/")
  );
};

handleDeleteTrip = async id => {
  await tripAPI.deleteTrip(id);
  this.setState(
    state => ({
      trips: state.trips.filter(t => t._id !== id),
    }),
    () => this.props.history.push("/")
  );
};
