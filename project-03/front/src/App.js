import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserContext from "./utils/user.context";
import LendService from "./services/lendService";
import NavbarP from "./components/ui/Navbar";
import FooterP from "./components/ui/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import RegisterP from "./components/Register";
import Home from "./components/Home";
import Results from "./components/Results";
import SignUp from "./components/SignUp";
import Verification from "./components/Verification";
import Login from "./components/Login";
import Profile from "./components/Profile";
import AddNewStuff from "./components/AddNewStuff";
import EditProfile from "./components/EditProfile";
import NotFound from "./components/ui/NotFound";
import Contact from "./components/Contact";

function App() {
  const [theUser, getTheUser] = useState();

  const service = new LendService();

  const fetchUser = () => {
    service
      .isLogged()
      .then((response) => {
        getTheUser(response.data);
      })
      .catch((err) => {
        getTheUser(null);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user: theUser, updateUser: getTheUser }}>
      <NavbarP />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route path="/register" component={RegisterP} />
        <Route path="/signup" component={SignUp} />
        <Route path="/verification" component={Verification} />
        <ProtectedRoute
          path="/edit-profile/:username"
          component={EditProfile}
        />
        <Route exact path="/profile/:username" component={Profile} />
        <Route path="/results/:stuff" component={Results} />
        <Route path="/contact/:username" component={Contact} />
        <ProtectedRoute path="/add-new-stuff" component={AddNewStuff} />
        <Route path="*" component={NotFound} />
      </Switch>
      <FooterP />
    </UserContext.Provider>
  );
}

export default App;
