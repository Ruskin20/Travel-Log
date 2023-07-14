import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { SAVE_VENUE } from "../../utils/mutations";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../Act.css";

const App = () => {
  const history = useHistory();
  const [zipCode, setZipCode] = useState(history.location.state?.zipcode);
  const [poiType, setPoiType] = useState("");
  const [activities, setActivities] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const [saveVenue] = useMutation(SAVE_VENUE);

  useEffect(() => {
    if (zipCode) {
      handleSearch();
    }
  }, []);

  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/matthewstandish/clk1kpw6y01ai01qvc60j51jd",
        center: [-74.01, 40.71],
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
    if (map && activities.length > 0) {
      markers.forEach((marker) => marker.remove());
      setMarkers([]);

      activities.forEach((activity) => {
        const [longitude, latitude] = activity.geometry.coordinates;

        const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]);

        const popup = new mapboxgl.Popup().setHTML(
          `<h3>${activity.place_name}</h3>`
        );

        marker.setPopup(popup);

        marker.addTo(map);
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
      });
    }
  }, [map, activities]);

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
      const geocodingPromise = axios.put(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${zipCode}.json?types=postcode&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );

      const geocodingResponse = await geocodingPromise;
      const [longitude, latitude] = geocodingResponse.data.features[0].center;

      const activitiesPromise = axios.put(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${poiType}.json?proximity=${longitude},${latitude}&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );

      const activitiesResponse = await activitiesPromise;
      const activities = activitiesResponse.data.features;

      setActivities(activities);
    } catch (error) {
      console.error("Error searching for activities:", error);
    }
  };

  const handleSaveActivity = async (activity) => {
    try {
      await saveVenue({
        variables: {
          venueId: activity.id,
          venue_name: activity.place_name,
          description: "Some description",
        },
      });

      console.log("Activity saved successfully!");
      console.log(activity);
    } catch (error) {
      console.error("Error saving activity:", error);
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
        <option value="">Select POI Type</option>
        <option value="aquarium">Aquarium</option>
        <option value="art_gallery">Art Gallery</option>
        <option value="bar">Bar</option>
        <option value="cinema">Cinema</option>
        <option value="driving_range">Golf</option>
        <option value="museum">Museum</option>
        <option value="nightclub">Night Life</option>
        <option value="climbing">Rock Climbing</option>
        <option value="theme_park_attraction">Theme Park</option>
      </select>

      <button onClick={handleSearch}>Search</button>

      <ul className="List__ul">
        {activities.map((activity) => (
          <li key={activity.id}>
            {activity.place_name}
            <button onClick={() => handleSaveActivity(activity)}>Save</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
