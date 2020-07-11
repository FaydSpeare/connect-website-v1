import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import './search.css';
import {backendURL} from "../constants";
import Session from "../session/Session";

export default function SearchPage() {

    const [searchText, setSearchText] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [searchUserId, setSearchUserId] = useState(null);

    let searchUser =  (e) => {
        e.preventDefault();
        console.log(searchText);
        setSearchText("");
        //
        fetch(backendURL + `/user/username/${searchText}`)
            .then(response => response.json()).then(json => {
                console.log("Username search request sent. response: ", json);
                if (json.userId != null) {
                    setSearchUserId(json.userId);
                    setSubmitted(true);
                }
            }).catch(e => {
                console.log(e);
            });

    };

    if (submitted) {
        return <Redirect to={"/profile/" + searchUserId}/>;
    }

    if (!Session.isLoggedIn()) {
        return <Redirect to={"/login"}/>;
    }

    return (

      <div className={"searchPageContainer"}>
          <div className={"searchBarContainer"}>
              <form className={"userSearchForm"} onSubmit={searchUser}>
                  <input placeholder="Search for..." value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
              </form>
          </div>
      </div>
    );
}