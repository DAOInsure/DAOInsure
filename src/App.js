import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import ClaimsPage from "./Pages/ClaimsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import VotingPage from "./Pages/VotingPage";
import Profile from "./Pages/Profile";
import MakeClaim from "./Pages/MakeClaim";
import { Box, Divider } from "@chakra-ui/react";
import CustomRoute from "./utils/CustomRoute";
import { useState, useEffect } from "react";
import React from "react";
import BecomeMember from "./Pages/BecomeMember";

function App() {
  const [isMember, setIsMember] = useState(false);

  return (
    <>
      <Router>
        <Header isMember={isMember} setIsMember={setIsMember} />
        <Box pt="60px">
          <Switch>
            {isMember ? (
              <div>
                <CustomRoute isMember={isMember} exact path="/">
                  <ClaimsPage />
                </CustomRoute>
                <CustomRoute isMember={isMember} exact path="/voting">
                  <VotingPage />
                </CustomRoute>
                <CustomRoute isMember={isMember} exact path="/profile">
                  <Profile />
                </CustomRoute>
                <CustomRoute isMember={isMember} exact path="/makeclaim">
                  <MakeClaim />
                </CustomRoute>{" "}
              </div>
            ) : (
              <BecomeMember />
            )}
            {/* <Route exact path="/become-a-member">
              <BecomeMember />
            </Route>
            <CustomRoute isMember={isMember} exact path="/">
              <ClaimsPage />
            </CustomRoute>
            <CustomRoute isMember={isMember} exact path="/voting">
              <VotingPage />
            </CustomRoute>
            <CustomRoute isMember={isMember} exact path="/profile">
              <Profile />
            </CustomRoute>
            <CustomRoute isMember={isMember} exact path="/makeclaim">
              <MakeClaim />
            </CustomRoute> */}
          </Switch>
        </Box>
      </Router>
    </>
  );
}

export default App;
