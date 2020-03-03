import React from "react";
import { geoPath } from "d3-geo"
import {Geography, Marker} from "react-simple-maps";


//= ({geo, iter, projection, switchPaths, colors})
const markers = [
    {
        markerOffset: -15,
        name: "Buenos Aires",
        coordinates: [-58.3816, -34.6037]
    },
    { markerOffset: -15, name: "La Paz", coordinates: [-68.1193, -16.4897] },
    { markerOffset: 25, name: "Brasilia", coordinates: [-47.8825, -15.7942] },
    { markerOffset: 25, name: "Santiago", coordinates: [-70.6693, -33.4489] },
    { markerOffset: 40, name: "Bogota", coordinates: [-74.0721, 4.711] },
    { markerOffset: 25, name: "Quito", coordinates: [-78.4678, -0.1807] },
    { markerOffset: -15, name: "Georgetown", coordinates: [-58.1551, 6.8013] },
    { markerOffset: -15, name: "Asuncion", coordinates: [-57.5759, -25.2637] },
    { markerOffset: 25, name: "Paramaribo", coordinates: [-55.2038, 5.852] },
    { markerOffset: 25, name: "Montevideo", coordinates: [-56.1645, -34.9011] },
    { markerOffset: -15, name: "Caracas", coordinates: [-66.9036, 10.4806] },
    { markerOffset: -15, name: "Lima", coordinates: [-77.0428, -12.0464] }
];

class  Countries extends React.Component {
    constructor(props) {
        super(props);
    }

    setCountryCoordinates =(projection, evt) =>{
        //
        // this.setState(prevState => ({
        //     center: centeroid
        // }))
    }

    render() {
        return (
            <Geography
                key={
                    (this.props.geo.properties.ISO_A3 || this.props.geo.properties.GID_1)
                    + this.props.iter
                }

                geography={this.props.geo}
                // projection={this.props.projection}

                onClick={
                    (e)=>{
                    this.props.switchPaths(this.props.geo, this.props.projection, e)
                    }
                }
                style={{
                    default: {
                        fill: this.props.colors[this.props.iter],
                        outline: "none"
                    },
                    hover: {
                        outline: "none"
                    },
                    pressed: {
                        outline: "none"
                    }
                }}
            >

            </Geography>
        )
        {/*</div>*/
        }
    }
}
export default Countries