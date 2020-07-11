import React from "react";
import '../game/game.css';
import Board from "../game/Board";
import Session from "../session/Session";
import {Redirect} from "react-router-dom";
import LiveChat from "../game/LiveChat";
import BoardSession from "../game/BoardSession";

class SpectatePage extends React.Component {

    constructor(props) {
        super(props);
        const { gameId } = this.props.match.params;
        this.state = {
            board: new BoardSession(this.boardSessionUpdateCallback, gameId, true)
        };
    }

    boardSessionUpdateCallback = () => {
        this.setState((state) => ({
            board: state.board
        }));
    };

    render() {
        if (!Session.isLoggedIn()) {
            return <Redirect to={"/login"}/>;
        }
        return (
            <div className="gamePageContainer">
                <div className={"sideBySideDiv"}>
                    <Board board={this.state.board}/>
                </div>
                <div className={"sideBySideDiv"}>
                    <LiveChat board={this.state.board}/>
                </div>
            </div>
        );
    }


}

export default SpectatePage;