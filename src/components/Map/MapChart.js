import React, {Component} from "react";
import {ComposableMap, Geographies, Geography, ZoomableGroup} from "react-simple-maps";
import {useSpring, animated} from 'react-spring';
import {Spring} from 'react-spring/renderprops'

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";



const ZoomControl=()=> {
    const [{x, y}, set] = useSpring({zoom: 2, from: {zoom: 1}})
}
// const zoomIn = useSpring({opacity: 1, from: {opacity: 0}})

class MapChart extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Spring
                from={{ zoom: 0 }}
                to={{ zoom: 1 }}>
                {
                    props =>
                    <animated.div>
                    <div style={props}>hello</div>

                    {/*<animated.div style={zoomIn}>I will fade in</animated.div>*/}
                    <ComposableMap>
                    <ZoomableGroup zoom={ZoomControl}>
                    <Geographies geography={geoUrl}>
                    {({geographies}) =>
                        geographies.map(geo => <Geography key={geo.rsmKey} geography={geo}/>)
                    }
                    </Geographies>
                    </ZoomableGroup>
                    </ComposableMap>
                    </animated.div>
                }
            </Spring>
        )
    }
}
export default MapChart