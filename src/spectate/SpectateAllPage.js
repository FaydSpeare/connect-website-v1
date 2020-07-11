import React from "react";
import '../game/game.css';
import Board from "../game/Board";
import Session from "../session/Session";
import {Redirect} from "react-router-dom";
import MiniSpectate from "./MiniSpectate";
import {backendURL} from "../constants";

class SpectateAllPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        fetch(backendURL + '/game/get-running-games')
            .then(response => response.json())
            .then(json => {

                console.log("Get running games request sent. response: ", json);

                this.setState({
                    items: json.gameIds
                })

            }).catch(e => {
            console.log(e);
        });
    }

    render() {
        if (!Session.isLoggedIn()) {
            return <Redirect to={"/login"}/>;
        }
        return (
            <div className="gamePageContainer">
                {this.state.items.map((gameId, i) => <MiniSpectate key={i} gameId={gameId}/>)}
            </div>
        );
    }
}

export default SpectateAllPage;