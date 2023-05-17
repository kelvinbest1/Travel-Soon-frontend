import React from "react";
import { RouterProvider, createBrowserRouter, useLocation } from "react-router-dom";
import MyTripPage from "../components/MyTripPage/MyTripPage";
import NewTripPage from "../components/NewTripPage/NewTripPage";
import TripDetailPage from "../components/TripDetailPage/TripDetailPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import EditTripPage from "../components/EditTripPage/EditTripPage";
import SignupPage from "../pages/SignupPage/SignupPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import Layout from "../Layout/Layout";

const MainRoute = (props) => {

    // const location = useLocation();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
        path:"/",
        element: (
          <MyTripPage
            trips={props.trips}
            user={props.user}
            handleDeleteTrip={props.handleDeleteTrip}
            handleLogout={props.handleLogout}
          ></MyTripPage>
        ),
      },
      {
        path: "/add",
        element: <NewTripPage user={props.user} handleNewTrip={props.handleNewTrip}></NewTripPage>
      },
      {
        path: "/details",
        element: <TripDetailPage></TripDetailPage>
      },
      {
        path: "/search",
        element: <SearchPage></SearchPage>
      },
      {
        path: "/edit",
        element: <EditTripPage  handleUpdateTrip={props.handleUpdateTrip} ></EditTripPage>
      },
      {
        path: "/signup",
        element: <SignupPage 
        handleSignupOrLogin={props.handleSignupOrLogin}></SignupPage>
      },
      {
        path: "/login",
        element: <LoginPage handleSignupOrLogin={props.handleSignupOrLogin}></LoginPage>
      },
      {
        path: "/logout",
        element: <LoginPage  handleLogout={props.handleLogout}></LoginPage>
      },
      ]
    }
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default MainRoute;
