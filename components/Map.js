import React, { Component } from 'react';
import './Map.scss';

import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';

const MAPBOX_TOKEN = process.env.MapboxAccessToken;

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewState: {
                latitude: 31.968599,
                longitude: -99.901810,
                zoom: 5,
                maxZoom: 16,
                pitch: 35,
                bearing: 0
            }
        }
    }

    renderLayers() {
        return [
            new ScatterplotLayer({
                id: 'scatterplot-layer',
                data: null,
                pickable: true,
                opacity: 0.8,
                stroked: true,
                filled: true,
                radiusScale: 1100,
                radiusMinPixels: 1,
                radiusMaxPixels: 100,
                lineWidthMinPixels: 2,
                getPosition: d => d.coordinates,
                getRadius: d => 150 + Math.log10(d.numOfInstances) * 300,
                getFillColor: d => [100, 100, 100, 100],
                getLineColor: d => [100, 0, 0, 255],
                autoHighlight: true,
                highlightColor: [100, 100, 0, 255],
                onHover: (info, event) => {
                    
                },
            })
        ];
    }

    onViewStateChange({ viewState }) {
        this.setState({
            viewState
        });
    }

    render() {
        return (
            <DeckGL
                layers={this.renderLayers()}
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