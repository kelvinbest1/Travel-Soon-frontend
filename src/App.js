import React from "react";
import "./App.css";
import { Route, NavLink, Redirect } from "react-router-dom";
import * as tripAPI from "./services/trips-api";
import MyTripPage from "./components/MyTripPage/MyTripPage";
import NewTripPage from "./components/NewTripPage/NewTripPage";
import TripDetailPage from "./components/TripDetailPage/TripDetailPage";
import EditTripPage from "./components/EditTripPage/EditTripPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import userService from "./utils/userService";
import SearchPage from "./pages/SearchPage/SearchPage";

const App = (props) => {
  const [trips, setTrips] = useState([]);
  const [user, setUser] = useState(userService.getUser());

  useEffect(() => {
    getTrips();
  }, []);

  const handleLogout = () => {
    userService.logout();
    setUser(null);
    setTrips([]);
  };

  const handleSignupOrLogin = () => {
    setUser(userService.getUser());
    getTrips();
  };

  const getTrips = async () => {
    let trips = await tripAPI.getAll();
    if (user) {
      trips = trips.filter((t) => t.user === user._id);
    }
    setTrips(trips);
  };

  const handleNewTrip = async (newTripData) => {
    const newTrip = await tripAPI.create(newTripData);
    setTrips((prevTrips) => [...prevTrips, newTrip]);
    props.history.push("/");
  };

  const handleDeleteTrip = async (id) => {
    await tripAPI.deleteTrip(id);
    setTrips((prevTrips) => prevTrips.filter((t) => t._id !== id));
    props.history.push("/");
  };

  const handleUpdateTrip = async (updatedTripData) => {
    const updatedTrip = await tripAPI.update(updatedTripData);
    const newTripsArray = trips.map((t) =>
      t._id === updatedTrip._id ? updatedTrip : t
    );
    setTrips(newTripsArray);
    props.history.push("/");
  };

  return (
    <div className="App">
      <header className="App-header">
        Make your next trip unforgettable.
        <nav>
          <NavLink user={props.user} exact to="/">
            My Trips
          </NavLink>

          <NavLink exact to="/add">
            New Trip
          </NavLink>

          <NavLink exact to="/search">
            Search Camps
          </NavLink>

          <NavLink exact to="/signup">
            Create Profile
          </NavLink>

          {user ? (
            <NavLink exact to="/login" onClick={handleLogout}>
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
          exact
          path="/"
          render={() =>
            userService.getUser() ? (
              <MyTripPage
                trips={trips}
                user={user}
                handleDeleteTrip={handleDeleteTrip}
                handleLogout={handleLogout}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        <Route
          exact
          path="/add"
          render={() => (
            <NewTripPage user={user} handleNewTrip={handleNewTrip} />
          )}
        />
        <Route
          exact
          path="/details"
          render={({ location }) => <TripDetailPage location={location} />}
        />
        <Route
          exact
          path="/search"
          render={({ location }) => <SearchPage location={location} />}
        />
        <Route
          exact
          path="/edit"
          render={({ location }) => (
            <EditTripPage
              handleUpdateTrip={handleUpdateTrip}
              location={location}
            />
          )}
        />
        <Route
          exact
          path="/signup"
          render={({ history }) => (
            <SignupPage
              history={history}
              handleSignupOrLogin={handleSignupOrLogin}
            />
          )}
        />
        <Route
          exact
          path="/login"
          render={({ history }) => (
            <LoginPage
              handleSignupOrLogin={handleSignupOrLogin}
              history={history}
            />
          )}
        />
        <Route
          exact
          path="/logout"
          render={({ history }) => (
            <LoginPage handleLogout={handleLogout} history={history} />
          )}
        />
      </main>
    </div>
  );
};

export default App;