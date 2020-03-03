import React, {Component} from "react"
import {ComposableMap, Geographies, Geography, Marker, ZoomableGroup} from "react-simple-maps"
import {useSpring, animated} from 'react-spring'
import {Spring} from 'react-spring/renderprops'
import chroma from "chroma-js"
import Countries from "./Countries";
import projection from "d3-geo/src/projection";
import {geoTimes} from "d3-geo-projection";
import {geoPath} from "d3-geo";
import "../component.style.css"


//useZoomPan
const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
    // "/world.json"

const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min)


const colorScale = chroma.brewer.Pastel2.slice(1)

const colors = Array(180)
    .fill()
    .map(d => colorScale[getRandomInt(0, colorScale.length - 1)])



class MapChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 500,
            height: 700,
            detail: false,
            paths: geoUrl,
            center: [0,0],
            zoom: 1
        }

    }
    projection() {
        return geoTimes()
            .translate([this.state.width/2, this.state.height/2])
            .scale(180)
    }


    // ZoomControl=()=> {
    //     (this.props) = useSpring({zoom: 2, from: {zoom: 1}})
    // }
    switchPaths = (geo, projection, evt) => {
        // alert(geo.properties.ISO_A3)
        const gp = geoPath().projection(projection)
        const dim = evt.target.getBoundingClientRect()
        console.log("dim: ", dim)
        const cx = evt.clientX
        console.log("cx: ", cx)
        const cy = evt.clientY
        console.log("cy: ", cy)
        const [orgX, orgY] = gp.bounds(geo)[0]
        console.log("[orgX, orgY] : ", [orgX, orgY])
        const centeroid = projection.invert([orgX , orgY])
        console.log(centeroid)
        const { detail } = this.state;
        this.setState(prevState => ({
            paths: detail ? geoUrl : '/ch.json',
            center: detail? [0,0]: centeroid,
            zoom: detail ? 1 : 10,
            detail: !detail
        }));
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
                                             projection={this.projection()}
                                             // className="ratio-container-content ratio-container"
                        >
                            <ZoomableGroup   center={this.state.center}
                                             zoom={styles.zoom}>
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
                                <Marker key="This" coordinates={[-60,10]}>
                                    <circle b={10} fill="#F00" stroke="#fff" strokeWidth={2} />
                                    <text
                                        textAnchor="middle"
                                        style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                                    >
                                        {[-60 , 10]}
                                    </text>
                                </Marker>
                                <Marker key="This" coordinates={this.state.center}>
                                    <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
                                    <text
                                        textAnchor="middle"
                                        style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                                    >
                                        {this.state.center}
                                    </text>
                                </Marker>
                            </ZoomableGroup>
                        </ComposableMap>
                    </div>
                )}
            </Spring>
        )
    }
}
export default MapChart