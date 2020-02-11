import React from "react";
import Card from "react-bootstrap/Card";
import PropTypes from "prop-types";
import CardColumns from "react-bootstrap/CardColumns"
import {Button} from "react-bootstrap";

export class Keywords extends React.Component {
    static propTypes = {
        keywords: PropTypes.array.isRequired,
        currentTime: PropTypes.number.isRequired
    };

    componentDidMount() {
        console.log(this.props.currentTime); // print current time
    }

    render() {
        return (
            <CardColumns key={this.props.currentTime} className="pt-3">
                {this.props.keywords.map((item, index) => (
                    // eslint-disable-next-line array-callback-return
                    item.data.map((item2, index2) => {
                            if (item.pos > this.props.currentTime - 15 && item.pos < this.props.currentTime + 15) {
                                return <ListItemDetails
                                    title={item2.title}
                                    key={item2.title}
                                    url={item2.url}/>
                            }
                        }
                    ))
                )}
            </CardColumns>
        )
    }
}


export class ListItemDetails extends React.Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
    };

    render() {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Button href={this.props.url} target="blank">Plus d'infos</Button>
                </Card.Body>
            </Card>
        )
    }
}