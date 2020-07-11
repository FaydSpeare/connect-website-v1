import React from "react";
import {tile_colours} from "../constants";

export default function Tile(props) {
    const row = props.row;
    const col = props.col;
    let winningTile = props.board.isWinningTile(row, col);
    const colour = props.board.get(row, col) === 0 ? "blank" : tile_colours[props.board.get(row, col)];
    return (
        <div className="tile"
             style={winningTile ? {
                 background: colour,
                 border: '3px solid white',
                 height: props.board.size + "px",
                 width: props.board.size + "px"
             } : {
                 background: colour,
                 height: props.board.size + "px",
                 width: props.board.size + "px"
             }}
             onClick={() => {
                 props.board.place(row, col)
             }}>
        </div>
    );
};