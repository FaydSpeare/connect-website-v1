import React, {useState} from "react";
import './login.css';
import {Redirect} from "react-router-dom";
import Session from "../session/Session";
import {backendURL} from "../constants";

function LoginPage(props) {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [failed, setFailed] = useState(false);
    const [failedMessage, setFailedMessage] = useState(false);
    const [press, setPress] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const verifyLoginDetails = async (event) => {
        setPress(true);
        event.preventDefault();
        await fetch(backendURL + `/user/${username}/${password}/validate`)
            .then(r => r.json())
            .then(r => {
                console.log('Login Request sent. response: ', r);
                if (r.valid) {
                    Session.setUserId(r.user, rememberMe);
                    Session.setUsername(username, rememberMe);
                    Session.login(rememberMe);
                    setPress(false);
                } else {
                    setFailedMessage(r.errorMessage);
                    setFailed(true);
                    setPress(false);
                }
            })
            .catch((e) => {
                console.log(e);
                setFailedMessage("Error connecting to server");
                setFailed(true);
                setPress(false);
        });
        Session.loginCallback();
    };

    if (Session.isLoggedIn()) {
        return <Redirect to={"/home"}/>;
    }

    return (
        <div className={"loginPageContainer"}>
            <div className = "login-box">
                <form onSubmit={e => verifyLoginDetails(e)}>
                    <label className="loginLabel"><b>Login</b></label><br/>
                    <input className="loginInput" type="username"
                           placeholder="Username" onChange={e => {
                        setUsername(e.target.value);
                    }}/><br/>
                    <input className="loginInput" type="password"
                           placeholder="Password" onChange={e => {
                        setPassword(e.target.value);
                    }}/><br/>
                    <div className={"checkBoxContainer"}>
                        <input type={"checkbox"} onClick={e => {
                            setRememberMe(e.target.checked);
                        }}/>
                        <label>Remember me</label><br/>
                    </div>

                    <input className={press ? "loginButtonPushed" : "loginButton"} type="submit"/>
                </form>
            </div>
            <br/>
            {failed ? <div className={"loginErrorBox"}>
                <label className={"loginErrorLabel"}>{failedMessage}</label>
            </div> : null }
        </div>
    );

}

export default LoginPage;