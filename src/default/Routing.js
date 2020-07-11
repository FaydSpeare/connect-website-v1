import React from 'react';
import LoginPage from "../login/LoginPage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Test from "../test/Test";
import HomePage from "../home/HomePage";
import SignupPage from "../signup/SignupPage";
import GamePage from "../game/GamePage";
import NavBar from "./NavBar";
import SearchPage from "../search/SearchPage";
import ProfilePage from "../profile/ProfilePage";
import SpectatePage from "../spectate/SpectatePage";
import MiniSpectate from "../spectate/MiniSpectate";
import SpectateAllPage from "../spectate/SpectateAllPage";

class Routing extends React.Component {

    render() {
        return (
            <BrowserRouter primary={false}>
                <NavBar/>
                <Switch>
                    <Route path="/signup">
                        <SignupPage/>
                    </Route>
                    <Route path="/login">
                        <LoginPage/>
                    </Route>
                    <Route path="/test">
                        <Test/>
                    </Route>
                    <Route path="/home">
                        <HomePage/>
                    </Route>
                    <Route path="/search">
                        <SearchPage/>
                    </Route>
                    <Route path="/profile/:userId" component={ProfilePage}/>
                    <Route path="/game" component={(props) => <GamePage {...props} newSearch={Math.random()}/>} />
                    <Route path="/join/:gameId" component={GamePage}/>
                    <Route path="/spectate/:gameId" component={SpectatePage}/>
                    <Route >
                        <LoginPage/>
                    </Route>
                </Switch>
            </BrowserRouter>
        );
    }

}

export default Routing;