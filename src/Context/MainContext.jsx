import React, { createContext, useState } from 'react';
import * as tripAPI from "../services/trips-api";
import userService from '../utils/userService';


export const contextProvider = createContext();

const MainContext = ({children}) => {
    const [trips, setTrips] = useState([]);
    const [user, setUser] = useState(userService.getUser());

    const handleLogout = () => {
        userService.logout();
        setUser(null);
        setTrips([]);
    };
    
    const handleSignupOrLogin = () => {
        setUser(userService.getUser());
    };
    
    
  async function getTrips() {
    let trips = await tripAPI.getAll();
    if (user) {
      trips = trips.filter((t) => t.user === user._id);
    }
    setTrips(trips);
  }

  const handleNewTrip = async (newTripData) => {
    const newTrip = await tripAPI.create(newTripData);
    setTrips([...trips, newTrip]);
  };

  const handleDeleteTrip = async (id) => {
    await tripAPI.deleteTrip(id);
    setTrips(trips.filter((t) => t._id !== id));
  };

  const handleUpdateTrip = async (updatedTripData) => {
    const updatedTrip = await tripAPI.update(updatedTripData);
    const newTripsArray = trips.map((t) =>
      t._id === updatedTrip._id ? updatedTrip : t
    );
    setTrips(newTripsArray);
  };

    const allContext = {
        handleLogout,
        handleUpdateTrip,
        handleDeleteTrip,
        handleNewTrip,
        getTrips,
        handleSignupOrLogin,
    }
    
    return (
        <contextProvider.Provider value={allContext}>
            {children}
        </contextProvider.Provider>
    );
};

export default MainContext;