import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { useMutation } from "@apollo/client";
import { SAVE_RESTAURANT } from "../../utils/mutations";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import "../Mapbox.css";

const App = () => {
  const history = useHistory();
  const [zipCode, setZipCode] = useState(history.location.state?.zipcode);
  const [poiType, setPoiType] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const [saveRestaurant] = useMutation(SAVE_RESTAURANT);
  useEffect(() => {
    if (zipCode) {
      handleSearch();
    }
  }, []);
  useEffect(() => {
    const initializeMap = () => {
      const newMap = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/matthewstandish/clk1hwvsr017501qg097zckq0",
        center: [-84.39, 33.75],
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
    if (map && restaurants.length > 0) {
      // Clear existing markers
      markers.forEach((marker) => marker.remove());
      setMarkers([]);

      restaurants.forEach((restaurant) => {
        const [longitude, latitude] = restaurant.geometry.coordinates;

        const marker = new mapboxgl.Marker().setLngLat([longitude, latitude]);

        const popup = new mapboxgl.Popup().setHTML(
          `<h3>${restaurant.place_name}</h3>`
        );

        marker.setPopup(popup);
        marker.addTo(map);

        setMarkers((prevMarkers) => [...prevMarkers, marker]);
      });
    }
  }, [map, restaurants]);

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
      const response = await axios.put(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${zipCode}.json?types=postcode&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );

      const [longitude, latitude] = response.data.features[0].center;

      const restaurantsResponse = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/restaurant.json?proximity=${longitude},${latitude}&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
      );

      setRestaurants(restaurantsResponse.data.features);
    } catch (error) {
      console.error("Error searching for restaurants:", error);
    }
  };

  const handleSaveRestaurant = async (restaurant) => {
    try {
      // Make a request to save the restaurant using the mutation
      await saveRestaurant({
        variables: {
          restaurantId: restaurant.id,
          restaurant_name: restaurant.place_name,
          description: "Some description",
        },
      });

      // Display a success message or update your UI accordingly
      console.log("Restaurant saved successfully!");
      console.log(restaurant);
    } catch (error) {
      console.error("Error saving restaurant:", error);
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
        <option value="breakfast_restaurant">Breakfast</option>
        <option value="brunch_restaurant">Brunch</option>
        <option value="dinner_restaurant">Dinner</option>
        <option value="cafe">Cafe</option>
        <option value="mexican_restaraunt">Mexican</option>
        <option value="american_restaraunt">American</option>
        <option value="asian_restaurant">Asian</option>
        <option value="chinese_restaurant">Chinese</option>
        <option value="mediterranean_restaurant">Mediteranean</option>
        <option value="barbeque_restaurant">Barbeque</option>
      </select>

      <button onClick={handleSearch}>Search</button>
      <ul className="restaurant-list">
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            {restaurant.place_name}{" "}
            <button onClick={() => handleSaveRestaurant(restaurant)}>
              Save
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
