import React, { useState } from 'react';
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

function App() {
const [trip, SetTrip]= useState('[]')
  
    const [user, SetUser]= useState (userService.getUser()),


handleLogout = () => {
  userService.logout();
  this.setState({user: null, trips: []});
}

handleSignupOrLogin = () => {
  this.setState({user: userService.getUser()}, () => this.getTrips());
}

async function getTrips () {
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

handleUpdateTrip = async updatedTripData => {
  // If the updatedTrip id is the same as the tripAPI id, change out the 
  // API and state with the updated version and return an array that has 
  // all the other trips (unchanged) and our newly updated one
  const updatedTrip = await tripAPI.update(updatedTripData);
  const newTripsArray = this.state.trips.map(t => 
    t._id === updatedTrip._id ? updatedTrip : t
  );

  this.setState(
    {trips: newTripsArray},
    () => this.props.history.push("/")
  );
};


  return(
    <div className="App">
      <header className="App-header">
        Make your next trip unforgettable. 
        <nav>
          <NavLink user={this.props.user}exact to="/">
            My Trips
          </NavLink>
          &nbsp;&nbsp;&nbsp;
          <NavLink exact to="/add">
            New Trip
          </NavLink>
          &nbsp;&nbsp;&nbsp;
          <NavLink exact to="/search">
            Search Camps
          </NavLink>
          &nbsp;&nbsp;&nbsp;
          <NavLink exact to="/signup">
            Create Profile
          </NavLink>
          &nbsp;&nbsp;&nbsp;
          {this.state.user ? (
            <NavLink exact to="/login" onClick={this.handleLogout}>
              Logout
            </NavLink>
          ) : (
            <NavLink exact to="/login">
              Login
            </NavLink>
          )}
        </nav>
      </header>
      <main>
        <Route
          exact path="/" render={() => (
            userService.getUser() ?
              <MyTripPage
                trips={this.state.trips}
                user={this.state.user} 
                handleDeleteTrip={this.handleDeleteTrip}
                handleLogout={this.handleLogout}
              />
              :
              <Redirect to="/login"
              />
          )}
        />
        {/* <Route path='/users/:id' render={(props) => (
            userService.getUser() ?
              <MyTripPage 
                trips={this.state.user.trips}
                user={this.state.user} 
                handleDeleteTrip={this.handleDeleteTrip}
                handleLogout={this.handleLogout}
              />
            :
              <Redirect to='/login' />
          )}/> */}
        <Route
          exact path="/add"
          render={() => <NewTripPage user={this.state.user} handleNewTrip={this.handleNewTrip} />}
        />
        <Route 
          exact path="/details" 
          render={({location}) => <TripDetailPage location={location} />}
        />
        <Route 
          exact path="/search" 
          render={({location}) => <SearchPage location={location} />}
        />
        <Route 
          exact path="/edit" render={({location}) => (
            <EditTripPage
              handleUpdateTrip={this.handleUpdateTrip}
              location={location}
            />
          )}
        />
        <Route 
          exact path="/signup" render={({history}) => (
            <SignupPage
              history={history}
              handleSignupOrLogin={this.handleSignupOrLogin}
            />
          )} 
        />
        <Route 
          exact path="/login" render={({history}) => (
            <LoginPage
              handleSignupOrLogin={this.handleSignupOrLogin}
              history={history}
            />
          )} 
        />
        <Route 
          exact path="/logout" render={({history}) => (
            <LoginPage
              handleLogout={this.handleLogout}
              history={history}
            />
          )} 
        />
      </main>
    </div>
  );
}


export default App;

