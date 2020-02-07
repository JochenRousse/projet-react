import React from 'react'
import {Map, Marker, Popup, TileLayer} from 'react-leaflet'
import PropTypes from "prop-types";

export default class MovieMap extends React.Component {
    state = {
        lat: 38,
        lng: -97,
        zoom: 4,
    };

    static propTypes = {
        waypoints: PropTypes.array.isRequired,
        onClick: PropTypes.func.isRequired
    };

    handleClick(index, timestamp) {
        this.props.onClick(timestamp);
    }

    componentDidMount() {
        setTimeout(() => this.mymap.leafletElement.invalidateSize(true), 250)
    }

    render() {
        const position = [this.state.lat, this.state.lng];
        const items = []

        for (const [index, wp] of this.props.waypoints.entries()) {
            items.push(
                <Marker key={wp.label}  position={[wp.lat, wp.lng]} onClick={this.handleClick.bind(this, index, wp.timestamp)}>
                    <Popup>
                        {wp.label}
                    </Popup>
                </Marker>
            )
        }
        
        return (
            <div className="pt-3 pb-3">
                <Map center={position} zoom={this.state.zoom} style={{height: '350px', widht: '80%'}} ref={mymap => {
                    this.mymap = mymap;
                }}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {items}
                </Map>
            </div>
        )
    }
}