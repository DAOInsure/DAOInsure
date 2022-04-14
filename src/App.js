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
import ActivityPage from "./Pages/ActivityPage";

function App() {
	const [isMember, setIsMember] = useState(false);

	return (
		<>
			<Router>
				<Header isMember={isMember} setIsMember={setIsMember} />
				<Box pt='60px'>
					<Switch>
						{isMember ? (
							<div>
								<CustomRoute isMember={isMember} exact path='/'>
									<ClaimsPage />
								</CustomRoute>
								<CustomRoute
									isMember={isMember}
									exact
									path='/voting/:id'>
									<VotingPage />
								</CustomRoute>
								<CustomRoute
									isMember={isMember}
									exact
									path='/profile'>
									<Profile />
								</CustomRoute>
								<CustomRoute
									isMember={isMember}
									exact
									path='/makeclaim'>
									<MakeClaim />
								</CustomRoute>{" "}
								<CustomRoute
									isMember={isMember}
									exact
									path='/activity'>
									<ActivityPage />
								</CustomRoute>
							</div>
						) : (
							<Route>
								<BecomeMember />
							</Route>
						)}
					</Switch>
				</Box>
			</Router>
		</>
	);
}

export default App;
