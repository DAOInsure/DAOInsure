import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import ClaimsPage from './Pages/ClaimsPage';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import VotingPage from './Pages/VotingPage';
import Profile from "./Pages/Profile";
import MakeClaim from './Pages/MakeClaim';
import { Box } from "@chakra-ui/react";


function App() {

  return (
    <>
      <Router>
        <Header />
        <Box pt="60px">
          <Switch>
            <Route exact path="/">
              <ClaimsPage />
            </Route>
            <Route exact path="/voting">
              <VotingPage />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/makeclaim">
              <MakeClaim />
            </Route>
          </Switch>
        </Box>
        
      </Router>
    </>
  );
}

export default App;
