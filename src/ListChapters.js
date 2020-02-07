import React from "react";
import PropTypes from "prop-types";
import CardColumns from "react-bootstrap/CardColumns";
import Card from "react-bootstrap/Card";

export class List extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: -1
        }
    }

    handleClick(index, pos) {
        this.setState({selected: index});
        this.props.onClick(pos);
    }

    static propTypes = {
        chapters: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired
    };

    render() {
        return (
            <CardColumns className="pt-3">
                {this.props.chapters.map((item, index) => (
                    <ListItem
                        title={item.title}
                        key={index}
                        onClick={this.handleClick.bind(this, index, item.pos)}
                        selected={this.state.selected === index}/>
                ))}
            </CardColumns>
        )
    }
}

export class ListItem extends React.Component {

    static defaultProps = {
        selected: false
    };

    static propTypes = {
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        selected: PropTypes.bool
    };

    toggle = () => {
        this.props.onClick(this)
    };

    render() {
        return (
            <Card className={this.props.selected ? "bg-primary" : ""} onClick={this.toggle}>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                </Card.Body>
            </Card>
        )
    }
}