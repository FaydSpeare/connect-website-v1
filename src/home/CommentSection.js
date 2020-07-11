import "./home.css"
import * as React from "react";
import Comment from "./Comment";
import Session from "../session/Session";
import {backendURL} from "../constants";

class CommentSection extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: props.comments
        };
        this.input = React.createRef();
    }

    getList = () => {
        return this.state.comments.map((item, i) => (<Comment key={i} username={item.commentor} comment={item.comment}/>));
    };

    enterComment = (e) => {
        if (e.key === 'Enter') {
            let comments = this.state.comments;
            console.log(comments);
            let comment = {
                comment: e.target.value,
                commentor: Session.getUsername()
            };
            comments.push(comment);
            console.log(comment);
            this.setState({
                comments: comments
            });
            this.postComment(e.target.value);
            this.input.current.value = "";
        }
    };

    postComment = (comment) => {
        console.log("sending comment", this.props.searchedUserId, Session.getUserId());
        fetch(backendURL + '/user/comment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.props.searchedUserId,
                commentorId: Session.getUserId(),
                comment: comment
            })
        }).then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e);
        });
    };

    render() {
        return (
            <div className={"commentSectionContainer"}>
                <div className={"commentsContainer"}>
                    <p>Comments</p>
                    {this.getList()}
                </div>
                <div>
                    <input className={"commentInput"} onKeyDown={this.enterComment} type={"input"} ref={this.input}/>
                </div>
            </div>
        );
    }

}

export default CommentSection;
