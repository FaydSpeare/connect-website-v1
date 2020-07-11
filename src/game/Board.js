import React from "react";
import Row from "./Row";

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount(): void {
        console.log("MOUNTED");
    }

    componentWillUnmount() {
        console.log("UNMOUNTED");
        if (this.props.board.eventSource !== undefined) {
            this.props.board.eventSource.close();
        }

    }

    render() {
        let firstPlayer = this.props.board.turn === this.props.board.playerNumber;
        return (
            <div>
                <div className="playerComponentContainer">
                    <div className={"playerContainer"} id={!firstPlayer ? "turn" : ""} style={{
                        width: this.props.board.size * 8,
                        fontSize: Math.max((14 / 70) * this.props.board.size, 8)
                    }}>
                        <p>Username: {this.props.board.opponent.username} ~ ELO: {this.props.board.opponent.elo}</p>
                    </div>
                </div>
                <div className="gameComponentContainer" style={{
                    padding: (20 / 70) * this.props.board.size
                }}>
                    <div className="boardContainer" style={{
                        padding: this.props.board.size
                    }}>
                        <Row row={5} board={this.props.board}/>
                        <Row row={4} board={this.props.board}/>
                        <Row row={3} board={this.props.board}/>
                        <Row row={2} board={this.props.board}/>
                        <Row row={1} board={this.props.board}/>
                        <Row row={0} board={this.props.board}/>
                    </div>
                </div>
                <div className="playerComponentContainer">
                    <div className={"playerContainer"} id={firstPlayer ? "turn" : ""} style={{
                        width: this.props.board.size * 8,
                        fontSize: Math.max((14 / 70) * this.props.board.size, 8)
                    }}>
                        <p>Username: {this.props.board.me.username} ~ ELO: {this.props.board.me.elo}</p>
                    </div>
                </div>
            </div>
        );
    }

}

export default Board;
