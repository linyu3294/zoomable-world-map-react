import React, {Component} from "react"
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps"
import {useSpring, animated} from 'react-spring'
import {Spring} from 'react-spring/renderprops'
import chroma from "chroma-js"
import Countries from "./Countries";
import projection from "d3-geo/src/projection";


//useZoomPan
const geoUrl =
    // "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
"/world.json"

const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min)


const colorScale = chroma.brewer.Oranges.slice(1)
const colors = Array(180)
    .fill()
    .map(d => colorScale[getRandomInt(0, colorScale.length - 1)])

class MapChart extends Component {


    constructor(props) {
        super(props);
        this.state = {
            detail: false,
            paths: geoUrl,
            center: [0, 0],
            zoom: 1
        }
    }

    // ZoomControl=()=> {
    //     (this.props) = useSpring({zoom: 2, from: {zoom: 1}})
    // }
    switchPaths = () => {
        const { detail } = this.state;
        this.setState({
            paths: detail ? geoUrl : '/ch.json',
            center: detail ? [0, 0] : [8, 47],
            zoom: detail ? 1 : 60,
            detail: !detail
        });
    };

    render() {
        return(
            <Spring
                from={{ zoom: 1 }}
                to={{ zoom: this.state.zoom }}
            >
                {styles =>(
                    <div>
                    {/*<animated.div style={zoomIn}>I will fade in</animated.div>*/}
                    <ComposableMap>
                    <ZoomableGroup center={this.state.center} zoom={styles.zoom}>
                    <Geographies geography={geoUrl}>
                        {({geographies, proj}) =>
                            geographies.map((geo,iter) =>
                                <Countries
                                geo = {geo}
                                iter ={iter}
                                proj = {proj}
                                colors = {colors}
                                switchPaths={this.switchPaths}
                                />
                        )}
                    </Geographies>
                    </ZoomableGroup>
                    </ComposableMap>
                </div>
                )}
            </Spring>
        )
    }
}
export default MapChart