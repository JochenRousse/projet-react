import React from "react";
import {Container} from "react-bootstrap";
import {VideoPlayer} from "./VideoPlayer";

export class Fetcher extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data_loaded: false,
            data: {}
        }
    }

    render() {
        const {data_loaded, data} = this.state;

        if (data_loaded) {
            return (
                <Container>
                    <VideoPlayer data={data}/>
                </Container>
            );
        } else {
            return (
                <div>
                    <p>Loading data.</p>
                </div>
            );
        }
    }


    componentDidMount() {
        fetch("https://imr3-react.herokuapp.com/backend")
            .then(res => res.json())
            .then(result => {
                this.setState({
                    data_loaded: true,
                    data: result
                })
            })
    }
}