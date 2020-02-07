import React from 'react';
import {Player} from 'video-react';
import {Navigation} from "./Navigation";
import PropTypes from "prop-types";

export class VideoPlayer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.seek = this.seek.bind(this);
    }

    static propTypes = {
        data: PropTypes.object.isRequired,
    };

    componentDidMount() {
        // subscribe state change
        this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }

    handleStateChange(state) {
        // copy player state to this component's state
        this.setState({
            player: state
        });
    }

    handleClick(pos) {
        this.seek(pos);
    }

    render() {
        return (
            <section>
                <Player ref={player => {
                    this.player = player;
                }} playsInline fluid={false} height={400}>
                    <source src={this.props.data.Film.file_url}/>
                </Player>

                <h1>
                    {this.props.data.Film.title}
                </h1>
                <Navigation data={this.props.data} onClick={this.handleClick.bind(this)}/>
            </section>

        )
    }

    seek(seconds) {
        this.player.seek(seconds);
    }
}