import React from "react";
import '../game/game.css';
import Board from "../game/Board";
import BoardSession from "../game/BoardSession";

class MiniSpectate extends React.Component {

    constructor(props) {
        super(props);
        const gameId = this.props.gameId;
        this.state = {
            board: new BoardSession(this.boardSessionUpdateCallback, gameId, true)
        };
        this.state.board.setBoardSize(30);
    }

    boardSessionUpdateCallback = () => {
        this.setState((state) => ({
            board: state.board
        }));
    };

    render() {
        return (
            <div className="miniSpectateContainer">
                <div className={"sideBySideDiv"}>
                    <Board board={this.state.board}/>
                </div>
            </div>
        );
    }


}

export default MiniSpectate;