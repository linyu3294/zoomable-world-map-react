import React, {Component} from "react"
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps"
import {useSpring, animated} from 'react-spring'
import {Spring} from 'react-spring/renderprops'
import chroma from "chroma-js"
import Countries from "./Countries";
import projection from "d3-geo/src/projection";
import {geoTimes} from "d3-geo-projection";


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

const defaultCenter = [4,-2]

class MapChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 500,
            height: 700,
            detail: false,
            paths: geoUrl,
            center: defaultCenter,
            zoom: 1
        }
        this.projection = this.projection.bind(this)
    }
    projection() {
        return geoTimes()
            .translate([this.state.width/2, this.state.height/2])
            .scale(180)
    }
    // ZoomControl=()=> {
    //     (this.props) = useSpring({zoom: 2, from: {zoom: 1}})
    // }
    switchPaths = () => {
        const { detail } = this.state;
        this.setState({
            paths: detail ? geoUrl : '/ch.json',
            center: detail ? defaultCenter : [8, 47],
            zoom: detail ? 1 : 20,
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
                        <ComposableMap       width={this.props.width}
                                             height={this.props.height}
                                             projection={this.projection()}>
                            <ZoomableGroup   center={defaultCenter} zoom={styles.zoom}>
                                <Geographies geography={geoUrl}>
                                    {({geographies, projection}) =>
                                        geographies.map((geo,iter) =>
                                            <Countries
                                                geo = {geo}
                                                iter ={iter}
                                                projection = {projection}
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