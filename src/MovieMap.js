import React  from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import PropTypes from "prop-types";

export default class MovieMap extends React.Component {
    state = {
        lat: 38,
        lng: -97,
        zoom: 13,
    };

    static propTypes = {
        waypoints: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired
    };

    handleClick(pos) {
        this.props.onClick(pos);
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <div className="pt-3 pb-3">
                <Map center={position} zoom={this.state.zoom} style={{height: '350px'}}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </Map>
            </div>
        )
    }
}