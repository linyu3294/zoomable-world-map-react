import React from "react";
import { geoPath } from "d3-geo"
import {Geography} from "react-simple-maps";


//= ({geo, iter, projection, switchPaths, colors})


class  Countries extends React.Component {
    constructor(props) {
        super(props);
    }
     onGeographyClick =(projection, evt) =>{
        const gp = geoPath().projection(projection)
        const dim = evt.target.getBoundingClientRect()
        const cx = evt.clientX - dim.left
        const cy = evt.clientY - dim.top
        const [orgX, orgY] = gp.bounds(this.props.geo)[0]
        console.log("coordinates", [orgX, orgY])
        const final = this.props.projection.invert([orgX + cx, orgY + cy])
        console.log("coordinates", final)
    }
    alertCoutry = () =>{

        const path = geoPath().projection(this.props.projection())
        const newCenter = this.props.projection().invert(path.centroid(this.props.geo))
        alert(newCenter)
        this.setState(prevState => ({
          centroid: newCenter
        }));
    }
    render() {
        return (
            <Geography
                key={
                    (this.props.geo.properties.ISO_A3 || this.props.geo.properties.GID_1)
                    + this.props.iter
                }
                cacheId={
                    (this.props.geo.properties.ISO_A3 || this.props.geo.properties.GID_1)
                    + this.props.iter
                }
                geography={this.props.geo}
                // projection={this.props.projection}

                onClick={(e)=>this.onGeographyClick(this.projection, e)
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
            />
        )
        {/*</div>*/
        }
    }
}
export default Countries