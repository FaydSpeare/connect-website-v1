import React from "react";
import "../home/home.css"
import Session from "../session/Session";
import UserProfile from "../home/UserProfile";
import {Redirect} from "react-router-dom";

class ProfilePage extends React.Component {

    constructor(props) {
        super(props);
        const { userId } = this.props.match.params;
        this.state = {
            searchedUserId: userId
        };
    }

    render() {
        if (!Session.isLoggedIn()) {
            return <Redirect to={"/login"}/>;
        }
        return (
            <div className={"homePageContainer"}>
                <UserProfile userId={this.state.searchedUserId}/>
            </div>
        );
    }


}

export default ProfilePage;
