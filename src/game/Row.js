import React from "react";
import Tile from "./Tile";

export default function Row(props) {
    return (
        <div className="row">
            <Tile row={props.row} col={0} board={props.board}/>
            <Tile row={props.row} col={1} board={props.board}/>
            <Tile row={props.row} col={2} board={props.board}/>
            <Tile row={props.row} col={3} board={props.board}/>
            <Tile row={props.row} col={4} board={props.board}/>
            <Tile row={props.row} col={5} board={props.board}/>
            <Tile row={props.row} col={6} board={props.board}/>
        </div>
    );
};