import React, { useState } from "react";
import "../App.css";
import { Button } from "./Button";
import "./HeroSection.css";
import Auth from "../utils/auth";
import { Link, useHistory } from "react-router-dom";

function HeroSection() {
  let history = useHistory();
  const [zipcode, setZipcode] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  function handleChange(event) {
    setZipcode(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    setShowSuccess(true);
    history.push("/food", { zipcode });
  }
  console.log(zipcode);
  if (Auth.loggedIn())
    return (
      <div className="hero-container">
        <video src="/images/Vid.mp4" autoPlay loop muted />
        <h1>Caesar</h1>
        <p>The place to plan your trip!</p>
        <div className="hero-btns">
          <form id="zipForm" onSubmit={handleSubmit}>
            <label>
              <input
                onChange={handleChange}
                value={zipcode}
                className="input"
                type="text"
                placeholder="Enter your zip code"
              />
            </label>
            <br />
            <br />
            <button type="submit" className="submitBtn">
              Search
            </button>
          </form>
          {showSuccess && <p id="log">Zip Code submitted!</p>}
        </div>
      </div>
    );
  else {
    return (
      <div className="hero-container">
        <video src="/images/Vid.mp4" autoPlay loop muted />
        <h1>Caesar</h1>
        <p>The place to plan your trip!</p>
        <div className="hero-btns">
          <form>
            <input
              className="footer-input"
              name="Zip-code"
              type="search"
              placeholder="Enter zip code"
            />
            <Button buttonStyle="btn--primary">Search</Button>
          </form>
          <Link to="/login" className="login" onClick={console.log("hey")}>
            Log In <i className="far fa-play-circle" />
          </Link>
        </div>
      </div>
    );
  }
}

export default HeroSection;
