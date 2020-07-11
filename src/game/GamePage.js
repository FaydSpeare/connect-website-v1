import React from "react";
import './game.css';
import Board from "./Board";
import GameOptions from "./GameOptions";
import Session from "../session/Session";
import {Redirect} from "react-router-dom";
import LiveChat from "./LiveChat";
import BoardSession from "./BoardSession";

class GamePage extends React.Component {

    constructor(props) {
        super(props);
        const { gameId } = this.props.match.params;
        this.state = {
            board: new BoardSession(this.boardSessionUpdateCallback, gameId),
        };
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(): void {
        console.log("MOUNTED2");
    }

    componentWillUnmount() {
        console.log("UNMOUNTED2");
        if (this.state.board.eventSource !== undefined) {
            this.state.board.eventSource.close();
        }
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
        if (!this.state.board.loadBoard) {
            return (
                <div className="gamePageContainer">
                    <div className="gameOptionsContainer">
                        <GameOptions board={this.state.board}/>
                    </div>
                </div>
            );
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

export default GamePage;