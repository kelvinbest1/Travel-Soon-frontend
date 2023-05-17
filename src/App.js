import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import * as tripAPI from "./services/trips-api";
import userService from "./utils/userService";
import MainRoute from "./MainRoute/MainRoute";
import Navbar from "./components/Navbar";
import { contextProvider } from "./Context/MainContext";



function App() {
const {
handleDeleteTrip,
handleLogout,
handleNewTrip,
handleSignupOrLogin,
handleUpdateTrip,
getTrips,
getUser
} = useContext(contextProvider);
const [trips, setTrips] = useState([]);
const [user, setUser] = useState(userService.getUser());



useEffect(() => {
getTrips();
}, [user]);



return (
<div className="App">
<main>
<MainRoute
user={user}
trips={trips}
handleNewTrip={handleNewTrip}
handleDeleteTrip={handleDeleteTrip}
handleUpdateTrip={handleUpdateTrip}
handleSignupOrLogin={handleSignupOrLogin}
handleLogout={handleLogout}
/>
</main>
</div>
);
}



export default App;