import "./home.css"
import * as React from "react";

function PastGame(props) {
    return (
        <div className={"centerPastGame"}>
            <div className={"pastGameContainer"}>
                <p>Opponent: {props.props.opponent}. {props.props.outcome} in {props.props.moves} moves.</p>
            </div>
        </div>
    );
}

export default PastGame;