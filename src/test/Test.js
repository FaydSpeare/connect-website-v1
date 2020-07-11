import React from 'react';

class Test extends React.Component {


    constructor(props) {
        super(props);
        this.eventSource = undefined;
        this.state = {
            count: 0
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.increment = this.increment.bind(this);
    }

    increment() {
        this.setState((state) => {
            return {count: state.count + 1}
        });
    }

    componentDidMount() {
        /*
        this.eventSource = new EventSource("http://ec2-54-79-34-130.ap-southeast-2.compute.amazonaws.com/game/subscribe/1");

        this.eventSource.onmessage = event => {
            console.log(event)
            this.increment();
        }

         */
    }

    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
            </div>
        )
    }

}

export default Test;