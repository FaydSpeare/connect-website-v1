import React from 'react';
import './index.css'
import Routing from './default/Routing'
import Session from "./session/Session";

class App extends React.Component {

    constructor() {
        super();
        this.state = {};
        Session.setLoginCallback(this.logInOrOut);
    }

    logInOrOut = () => {
        this.setState(this.state);
    };

    render() {
        return (
            <div className='websiteContainer'>
                <Routing/>
            </div>
        )
    }


}
export default App;
