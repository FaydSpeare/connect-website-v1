import React from "react";
import "./home.css"
import Session from "../session/Session";
import UserProfile from "./UserProfile";
import {Redirect} from "react-router-dom";
import List from "./PastGames";

class HomePage extends React.Component {

    render() {
        if (!Session.isLoggedIn()) {
            return <Redirect to={"/login"}/>;
        }
        return (
            <div className={"homePageContainer"}>
                <div className={"welcomeContainer"}>
                    <p><b>Welcome Back {Session.getUsername()}</b></p>
                </div>
                <UserProfile userId={Session.getUserId()}/>
            </div>
        );
    }


}

export default HomePage;

/*
                <div className={"scrollContent"}>
                    {Array.from(Array(30).keys(), n => n + 1).map((listItem, i) => <li key={i} className="list-group-item">List Item {listItem}</li>)}
                </div>
 */