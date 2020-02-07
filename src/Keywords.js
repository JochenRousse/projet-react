import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import CardColumns from "react-bootstrap/CardColumns"
import { Button } from "react-bootstrap";

export class Keywords extends React.Component {
    static propTypes = {
        keywords: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired
    };

    handleClick(index, pos) {
        this.props.onClick(pos);
    }

    render() {
        return (
            <CardColumns className="pt-3">
                {this.props.keywords.map((item, index) => (
                    item.data.map((item2, index2) => (
                        <ListItemDetails
                            title={item2.title}
                            key={item2.title}
                            onClick={this.handleClick.bind(this, item2.title, item.pos)}
                            url={item2.url}/>
                    ))
                ))}
            </CardColumns>
        )
    }
}


export class ListItemDetails extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
    };

    toggle = () => {
        this.props.onClick(this)
    };

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Button href={this.props.url} target="blank">Plus d'infos</Button>
                    <Button className="ml-3" onClick={this.toggle}>Aller au timer</Button>
                </Card.Body>
            </Card>
        )
    }
}