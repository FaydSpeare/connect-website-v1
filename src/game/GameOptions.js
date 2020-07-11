import React from "react";
import {frontEndURL} from "../constants";

const buttonNumbers = [1, 3, 5];

class GameOptions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: [null, null, null],
            timeLimit: 5,
            aiGame: false
        };
    }

    setSelected = (i) => {
        const selected = [null, null, null];
        selected[i] = "selectedLimitButton";
        this.setState({
            selected: selected,
            timeLimit: buttonNumbers[i]
        });
    };

    generateGame = () => {
        this.props.board.createNewGame(this.state.aiGame);
    };

    changeGameType = () => {
        this.setState({
            aiGame: !this.state.aiGame
        });
    };

    render() {
        const selected = this.state.selected;
        return (
            <div className={"innerGameOptionsContainer"}>
                {this.props.board.gameId == null ?
                    <div>
                        <div className={"timeLimitContainer"}>
                            <label className={"timeLimitLabel"}>Time Limit?</label>
                            <br/>
                            <button id={selected[0]} className="timeLimitButton"
                                    onClick={() => this.setSelected(0)}>{buttonNumbers[0]}</button>
                            <button id={selected[1]} className="timeLimitButton"
                                    onClick={() => this.setSelected(1)}>{buttonNumbers[1]}</button>
                            <button id={selected[2]} className="timeLimitButton"
                                    onClick={() => this.setSelected(2)}>{buttonNumbers[2]}</button>
                            <br/>
                            <br/>
                            <label className={"timeLimitLabel"}>Human or Computer?</label>
                            <br/>
                            <button className={"aiButton"} onClick={this.changeGameType}>{this.state.aiGame ? "Comp" : "Human"}</button>
                            <br/>
                            <button className = {"generateGameButton"} onClick={this.generateGame}>Generate Game</button>
                        </div>
                        <div>

                        </div>
                    </div>
                    :
                    <div>
                        <div>
                            <label className={"generatedGameLabel"}>Share this URL: {frontEndURL + "/join/" + this.props.board.gameId} </label>
                        </div>
                        <div>
                            <button className={"okGameButton"} onClick={this.props.board.loadGameBoard}>OK</button>
                        </div>

                    </div>
                }
            </div>
        );
    }
}

export default GameOptions;