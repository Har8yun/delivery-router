import {Box} from "@mui/material";
import {useContext, useEffect, useRef} from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {StepsContext} from "../../context/StepsContextProvider";
import {MAP_LINE} from "../../constants";
import "./StopsMap.css";

const StopsMap = () => {
    const isMounted = useRef(false);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const {stopsList} = useContext(StepsContext);

    const drawNumbers = (pointCoordinates) => {
        map.current.addSource("conferences", {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": pointCoordinates
            }
        });

        // Add a symbol layer
        map.current.addLayer({
            "id": "conferences",
            "type": "symbol",
            "source": "conferences",
            "layout": {
                "icon-image": "custom-marker",
                // get the year from the source"s "year" property
                "text-field": ["get", "sequence_number"],
                "text-font": [
                    "Open Sans Semibold",
                    "Arial Unicode MS Bold"
                ],
                "text-offset": [0, 1.2],
                "text-anchor": "bottom"
            }
        });
    }

    useEffect(() => {
        if (stopsList.length && !isMounted.current) {
            isMounted.current = true;
            const lineCoordinates = [];
            const pointCoordinates = [];

            stopsList.forEach((stop) => {
                const {lng, lat, sequence_number} = stop;
                const currentCoords = [lng, lat];
                lineCoordinates.push(currentCoords);

                pointCoordinates.push(
                    {
                        "type": "Feature",
                        "geometry": {
                            "type": "Point",
                            "coordinates": currentCoords
                        },
                        "properties": {"sequence_number": sequence_number}
                    },
                )
            })

            map.current = new maplibregl.Map({
                container: mapContainer.current,
                style: "https://tiles.stadiamaps.com/styles/osm_bright.json", // stylesheet location
                center: lineCoordinates[0], // starting position [lng, lat]
                zoom: 14 // starting zoom
            });

            stopsList.forEach((stop) => {
                const {lng, lat, completed} = stop;
                const currentCoords = [lng, lat];
                const color = completed ? MAP_LINE.COMPLETE_COLOR : MAP_LINE.COLOR;

                new maplibregl.Marker({color})
                    .setLngLat(currentCoords)
                    .addTo(map.current);
            })

            map.current.on("load", async () => {
                map.current.addSource("route", {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": lineCoordinates,
                        },
                    }
                });

                map.current.addLayer({
                    "id": "route",
                    "type": "line",
                    "source": "route",
                    "layout": {
                        "line-join": "round",
                        "line-cap": "round"
                    },
                    "paint": {
                        "line-color": MAP_LINE.COLOR,
                        "line-width": MAP_LINE.WIDTH
                    }
                });

                drawNumbers(pointCoordinates)
            });
        }
    }, [stopsList]);

    return (
        <Box className="map-wrap">
            <Box ref={mapContainer} id="map" className="map"></Box>
        </Box>
    );
};

export default StopsMap;