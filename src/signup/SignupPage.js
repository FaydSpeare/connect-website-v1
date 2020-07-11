import React from "react";
import {Redirect} from "react-router-dom";
import Session from "../session/Session";
import {backendURL} from "../constants";

class SignupPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            email: null,
            press: false,
            failed: false,
            failedMessage: null
        }
    }

    createNewUser = async (event) => {
        event.preventDefault();

        this.setState({press: true});
        await fetch(backendURL + "/user/createUser",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                email: this.state.email
            })
        }).then(response => response.json()).then(json => {
            console.log("Signup request sent. response: ", json);
            if (json.valid) {
                Session.setUserId(json.user);
                Session.setUsername(this.state.username);
                Session.login();
            } else {
                this.setState({failed: true, failedMessage: json.errorMessage});
            }
            this.setState({press: false});
        }).catch(e => {
            console.log(e);
            this.setState({press: false});
            this.setState({failed: true, failedMessage: "Error connecting to server"});
        })
        Session.loginCallback();
    };

    render() {
        if (Session.isLoggedIn()) {
            return <Redirect to={"/home"}/>;
        }
        return (
            <div className={"loginPageContainer"}>
                <div className = "login-box">
                    <form onSubmit={e => this.createNewUser(e)}>
                        <label className="loginLabel"><b>Signup</b></label><br/>
                        <input className="loginInput" type="username"
                               placeholder="Username" onChange={e => {
                            this.setState({username: e.target.value});
                        }}/><br/>
                        <input className="loginInput" type="password"
                               placeholder="Password" onChange={e => {
                            this.setState({password: e.target.value});
                        }}/><br/>
                        <input className="loginInput" type="email"
                               placeholder="Email" onChange={e => {
                            this.setState({email: e.target.value});
                        }}/><br/>
                        <input className={this.state.press ? "loginButtonPushed" : "loginButton"} type="submit"/>
                    </form>
                </div>
                <br/>
                {this.state.failed ? <div className={"loginErrorBox"}>
                    <label className={"loginErrorLabel"}>{this.state.failedMessage}</label>
                </div> : null }
            </div>
        );
    }

}

export default SignupPage;