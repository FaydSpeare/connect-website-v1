import "./home.css"
import * as React from "react";

function Comment(props) {
    return (
        <div className={"commentContainer"}>
            <p><b>{props.username}</b>: {props.comment}</p>
        </div>
    );
}

export default Comment;