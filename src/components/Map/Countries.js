import React from "react";
import {Geography} from "react-simple-maps";

const Countries = ({geo, iter, proj, switchPaths, colors}) =>
            <Geography
                key={
                        (geo.properties.ISO_A3 || geo.properties.GID_1) + iter
                }
                cacheId={
                        (geo.properties.ISO_A3 || geo.properties.GID_1) + iter
                }
                geography={geo}
                projection={proj}
                onClick={switchPaths}
                style={{
                        default: {
                                fill: colors[iter],
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


export default Countries