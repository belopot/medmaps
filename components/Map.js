import React, { Component } from 'react';
import './Map.scss';

import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ArcLayer, ScatterplotLayer, GeoJsonLayer, TextLayer } from '@deck.gl/layers';


import CountyData from '../assets/county.csv';

import CountyCentroidData from '../assets/counties_centroid.csv';

const MAPBOX_TOKEN = process.env.MapboxAccessToken;

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewState: {
                latitude: 31.968599,
                longitude: -99.901810,
                zoom: 5.5,
                maxZoom: 16,
                pitch: 10,
                bearing: 0
            }
        }

        this.layers = [];

        for (let i = 0; i < CountyData.length; i++) {
            //Geo layer
            let county = CountyData[i].county;
            let geoData = "https://raw.githubusercontent.com/belopot/medmaps/master/assets/geojson/TX/" + county + ".geo.json";
            let geoLayer = new GeoJsonLayer({
                id: "geo_" + county,
                data: geoData,
                opacity: 1,
                stroked: true,
                filled: true,
                extruded: false,
                getElevation: 1,
                lineWidthMinPixels: 1,
                getFillColor: [250, 220, 170, 250],
                getLineColor: [0, 0, 0],
                pickable: true
            })
            this.layers.push(geoLayer);

            //Geo-text layer
            let d = CountyCentroidData.filter(d => d.county == county);
            if (d.length > 0) {
                console.log(d[0])
                let geoTextLayer = new TextLayer({
                    id: "geotext_" + county,
                    data: d,
                    getText: d => d.county,
                    getPosition: d => [Number(d.longitude), Number(d.latitude), 20],
                    getColor: d => [0, 0, 0],
                    getSize: d => 10,
                    sizeScale: 1
                })
                this.layers.push(geoTextLayer);
            }
        }

    }

    componentDidMount() {

    }

    onViewStateChange({ viewState }) {
        this.setState({
            viewState
        });
    }

    render() {
        return (
            <DeckGL
                layers={this.layers}
                viewState={this.state.viewState}
                controller={true}
                onViewStateChange={this.onViewStateChange.bind(this)}
            >
                <StaticMap
                    reuseMaps
                    mapStyle={'mapbox://styles/mapbox/light-v10'}
                    preventStyleDiffing={true}
                    mapboxApiAccessToken={MAPBOX_TOKEN}
                />
            </DeckGL>
        );
    }
}

export default Map;