import React from "react";
import Session from "../session/Session";
import {backendURL} from "../constants";
import ProfilePicture from "./ProfilePicture";
import CommentSection from "./CommentSection";
import List from "./PastGames";

class UserProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            profile: null,
            searchedUserId: props.userId,
            gamesList: []
        };
        this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.getUserProfile()
    }

    render() {
        let profile = this.state.profile;
        if (profile == null) {
            return <div className={"loader"}/>;
        }
        let gameCount = profile.pastGames.length;
        return (
            <div>
                <div className={"sideBySideDiv"}>

                    <div>
                        <ProfilePicture image={this.state.profile.image} searchedUserId={this.state.searchedUserId} username={profile.username}/>
                    </div>

                    <div>
                        <div className={"userProfileContainer"}>
                            <p><b>Games played:</b> {gameCount}</p>
                            <p><b>ELO:</b> {profile.elo}</p>
                            <p><b>Email:</b> {profile.email}</p>
                        </div>
                    </div>

                </div>
                <div className={"sideBySideDiv"}>
                    <CommentSection comments={this.state.profile.comments} searchedUserId={this.state.searchedUserId}/>
                </div>
                <div>
                    <List games={this.state.gamesList}/>
                </div>
            </div>
        );
    }

     getUserProfile() {
        let userId = this.state.searchedUserId;
        fetch(backendURL + `/user/user-profile/${userId}`)
            .then(response => response.json())
            .then(json => {

                console.log("UserProfile request sent. response: ", json);

                if (json.success) {
                    let gamesList = this.setupGamesList(json);
                    this.setState({
                        profile: json,
                        gamesList: gamesList
                    });
                }

            }).catch(e => {
            console.log(e);
        });

    }

    setupGamesList(profile) {
        let gamesList = new Array();
        for (let i = 0; i < profile.pastGames.length; i++) {
            let game = profile.pastGames[i];

            if (game.opponent != null) {
                gamesList.push({
                    moves: game.gameHistory.length,
                    outcome: game.outcome == null ? "Draw" : (game.outcome ? "Won" : "Lost"),
                    opponent: game.opponent,
                    gameId: game.gameId
                });
            }


        }

        gamesList.sort((a,b) => (a.gameId > b.gameId) ? 1 : ((b.gameId > a.gameId) ? -1 : 0));

        return gamesList.reverse();
    }

}

export default UserProfile;