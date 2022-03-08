import { useEffect, useRef } from "react";
import { createMap } from "maplibre-gl-js-amplify";
import "maplibre-gl/dist/maplibre-gl.css";
import "maplibre-gl-js-amplify/dist/public/amplify-map.css";
import { drawPoints } from "maplibre-gl-js-amplify";

function Map() {
  const mapRef = useRef(null); // Reference to the map DOM element

  // Wrapping our code in a useEffect allows us to run initializeMap after the div has been rendered into the DOM
  useEffect(() => {
    let map;
    async function initializeMap() {
      // We only want to initialize the underlying maplibre map after the div has been rendered
      if (mapRef.current != null) {
        map = await createMap({
          container: mapRef.current,
          center: [137.7322793, 34.7057028], // 浜松駅
          zoom: 15,
        });
      }

      map.on("load", function () {
        drawPoints("mySourceName", // Arbitrary source name
            [
                {
                  coordinates: [137.7322793, 34.7057028], // [Longitude, Latitude]
                  title: "浜松駅",
                  address: "浜松駅は、静岡県浜松市中区砂山町にある、東海旅客鉄道東海道新幹線および東海道本線の駅である。",
                },
                {
                  coordinates: [137.7171463, 34.7071386], // [Longitude, Latitude]
                },
            ], // An array of coordinate data, an array of Feature data, or an array of [NamedLocations](https://github.com/aws-amplify/maplibre-gl-js-amplify/blob/main/src/types.ts#L8)
            map,
            {
                showCluster: true,
                unclusteredOptions: {
                    showMarkerPopup: true,
                },
                clusterOptions: {
                    showCount: true,
                },
            }
        );
    });
    }
    initializeMap();

    // Cleans up and maplibre DOM elements and other resources - https://maplibre.org/maplibre-gl-js-docs/api/map/#map#remove
    return function cleanup() {
      if (map != null) map.remove();
    };
  }, []);

  return <div ref={mapRef} id="map" className="fullheight-map" />;
}

export default Map;