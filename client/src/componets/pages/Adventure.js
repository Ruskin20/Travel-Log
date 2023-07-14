import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { SAVE_ADVENTURE } from "../../utils/mutations";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import "../Adventure.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoibWF0dGhld3N0YW5kaXNoIiwiYSI6ImNsamhyMTFjMzAxY2MzZnA1cnA1bjVnZHYifQ.lAIJ-JvzD7DLfUkgB6apKg";

const App = () => {
  const history = useHistory();
  const [zipCode, setZipCode] = useState(history.location.state?.zipcode);
  const [poiType, setPoiType] = useState("");
  const [adventures, setAdventures] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const [saveAdventure] = useMutation(SAVE_ADVENTURE);
  useEffect(() => {
    if (zipCode) {
      handleSearch();
    }
  }, []);
  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/matthewstandish/clk1jnuv4017g01nm7l93c2uj",
        center: [-96.8, 32.78],
        zoom: 9,
      });

      newMap.addControl(new mapboxgl.NavigationControl());

      setMap(newMap);
    };

    if (!map) {
      initializeMap();
    }
  }, [map]);

  useEffect(() => {
    if (map && adventures.length > 0) {
      markers.forEach((marker) => marker.remove());
      setMarkers([]);

      adventures.forEach((adventure) => {
        const [longitude, latitude] = adventure.geometry.coordinates;

        const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]);

        const popup = new mapboxgl.Popup().setHTML(
          `<h3>${adventure.place_name}</h3>`
        );

        marker.setPopup(popup);

        marker.addTo(map);
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
      });
    }
  }, [map, adventures]);

  useEffect(() => {
    if (map) {
      const handleMoveEnd = () => {
        if (markers.length > 0) {
          const bounds = new mapboxgl.LngLatBounds();
          markers.forEach((marker) => bounds.extend(marker.getLngLat()));

          map.fitBounds(bounds, {
            padding: { top: 50, bottom: 50, left: 50, right: 50 },
          });
        }
      };

      map.on("moveend", handleMoveEnd);

      return () => {
        map.off("moveend", handleMoveEnd);
      };
    }
  }, [map, markers]);

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handlePoiTypeChange = (event) => {
    setPoiType(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const geocodingPromise = axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${zipCode}.json?types=postcode&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );

      const geocodingResponse = await geocodingPromise;
      const [longitude, latitude] = geocodingResponse.data.features[0].center;

      const adventuresPromise = axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${poiType}.json?proximity=${longitude},${latitude}&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );

      const adventuresResponse = await adventuresPromise;
      const adventures = adventuresResponse.data.features;

      setAdventures(adventures);
    } catch (error) {
      console.error("Error searching for adventures:", error);
    }
  };

  const handleSaveAdventure = async (adventure) => {
    try {
      await saveAdventure({
        variables: {
          adventureId: adventure.id,
          adventure_name: adventure.place_name,
          description: "Some description",
        },
      });

      console.log("Adventure saved successfully!");
      console.log(adventure);
    } catch (error) {
      console.error("Error saving adventure:", error);
    }
  };

  return (
    <div>
      <div id="map" style={{ height: "400px" }}></div>

      <input
        type="text"
        value={zipCode}
        onChange={handleZipCodeChange}
        placeholder="Enter ZIP code"
      />

      <select value={poiType} onChange={handlePoiTypeChange}>
        {" "}
        <option value="">Select POI Type</option>
        <option value="park">Parks</option>
        <option value="lake">Lakes</option>
        <option value="trailhead">Trails</option>
        <option value="campground">Camps</option>
        <option value="beach">Beaches</option>
        <option value="forest">Forests</option>
      </select>

      <button onClick={handleSearch}>Search</button>

      <ul className="List__">
        {adventures.map((adventure) => (
          <li key={adventure.id}>
            {adventure.place_name}
            <button onClick={() => handleSaveAdventure(adventure)}>Save</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
