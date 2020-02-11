import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {List} from "./ListChapters";
import PropTypes from "prop-types";
import MovieMap from "./MovieMap";
import { Keywords } from "./Keywords";
import Chat from "./Chat";


export class Navigation extends React.Component {
    static propTypes = {
        data: PropTypes.object.isRequired,
        onClick: PropTypes.func.isRequired,
        currentTime: PropTypes.number.isRequired
    };

    handleClick(pos) {
        this.props.onClick(pos);
    }

    render() {
        return (
            <Tabs fill defaultActiveKey="carte" id="navigationTab">
                <Tab eventKey="carte" title="Carte">
                    <MovieMap waypoints={this.props.data.Waypoints} onClick={this.handleClick.bind(this)}/>
                </Tab>
                <Tab eventKey="chapitres" title="Chapitres">
                    <List chapters={this.props.data.Chapters} onClick={this.handleClick.bind(this)}/>
                </Tab>
                <Tab eventKey="mots" title="Mots clés">
                    <Keywords key={this.props.currentTime} currentTime={this.props.currentTime} keywords={this.props.data.Keywords}/>
                </Tab>
                <Tab eventKey="chat" title="Chat">
                    <Chat />
                </Tab>
            </Tabs>

        )
    }
}