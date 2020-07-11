import React from "react";
import {Link} from "react-router-dom";
import "./default.css"
import Session from "../session/Session";

export default function NavBar() {

    return (
      <div className={"linkContainer"}>
          <h1 className="navLabel">Connect4</h1>
          {Session.isLoggedIn() &&
              <button className={"logoutButton"} onClick={() => {
                  console.log("logging out");
                  Session.logout();
                  Session.loginCallback();
              }}>Logout</button>
          }
          {Session.isLoggedIn() && <Link className="routeLink" to="/search">Search</Link>}
          {Session.isLoggedIn() && <Link className="routeLink" to="/home">Home</Link>}
          {Session.isLoggedIn() && <Link className="routeLink" to="/game">New Game</Link>}
          {!Session.isLoggedIn() && <Link className="routeLink" to="/login">Login</Link>}
          {!Session.isLoggedIn() && <Link className="routeLink" to="/signup">Signup</Link>}
      </div>
    );
};
