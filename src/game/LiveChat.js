import * as React from "react";
import ChatLine from "./ChatLine";
import {backendURL} from "../constants";
import Session from "../session/Session";

class LiveChat extends React.Component {

    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.messageEnd = React.createRef();
    }

    getChatLines = (chatLines) => {
        return chatLines.map((item, i) => (<ChatLine key={i} username={item.username} chatLine={item.chatLine}/>));
    };

    componentDidUpdate() {
        this.messageEnd.current.scrollIntoView();
    }

    enterChatLine = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.sendUpdate(e.target.value);
            this.input.current.value = "";
        }
    };

    render() {
        return (
            <div className={"liveChatContainer"}>
                <p>Live Chat</p>
                <div className={"chatLinesContainer"}>
                    {this.getChatLines(this.props.board.chatLines)}
                    <div style={{ float:"left", clear: "both" }}
                         ref={this.messageEnd}>
                    </div>
                </div>
                <div className={"chatInputContainer"}>
                    <textarea className={"chatInput"} onKeyDown={this.enterChatLine} ref={this.input}/>
                </div>
            </div>
        );
    }

    sendUpdate(chatLine) {
        console.log("sending chat update");
        console.log(this.props.board.gameId, Session.getUserId());
        fetch(backendURL + '/chat/chatLine',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gameId: this.props.board.gameId,
                userId: Session.getUserId(),
                chatLine: chatLine
            })
        }).then(json => {
            console.log(json);
        }).catch(e => {
            console.log(e);
        })
    }

}

export default LiveChat;