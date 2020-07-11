import * as React from "react";


function ChatLine(props) {
    return (
        <div className={"chatLineContainer"}>
            <p><b>{props.username}:</b> {props.chatLine}</p>
        </div>
    );
}

export default ChatLine;
