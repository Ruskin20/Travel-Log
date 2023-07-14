import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "./SavedRestaurants.css";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { REMOVE_RESTAURANT } from "../../utils/mutations";
import { removeRestaurantId } from "../../utils/localStorage";
import { REMOVE_VENUE } from "../../utils/mutations";
import { removeVenueId } from "../../utils/localStorage";
import { REMOVE_ADVENTURE } from "../../utils/mutations";
import { removeAdventureId } from "../../utils/localStorage";

import Auth from "../../utils/auth";

const SavedRestaurants = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeRestaurant] = useMutation(REMOVE_RESTAURANT);
  const [removeVenue] = useMutation(REMOVE_VENUE);
  const [removeAdventure] = useMutation(REMOVE_ADVENTURE);

  const userData = data?.me || {};
  console.log(userData.savedAdventures);

  async function handleDeleteRestaurant(restaurantId) {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeRestaurant({
        variables: { restaurantId: restaurantId },
      });
      removeRestaurantId(restaurantId);
    } catch (err) {
      console.error(err);
    }
  }
  async function handleDeleteVenue(venueId) {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeVenue({
        variables: { venueId: venueId },
      });
      removeVenueId(venueId);
    } catch (err) {
      console.error(err);
    }
  }
  async function handleDeleteAdventure(adventureId) {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await removeAdventure({
        variables: { adventureId: adventureId },
      });
      removeAdventureId(adventureId);
    } catch (err) {
      console.error(err);
    }
  }
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved restaurants!</h1>
        </Container>
      </div>
      <Container>
        <h2 id="header" className="pt-5">
          {userData.savedRestaurants && userData.savedRestaurants.length
            ? `Viewing ${userData.savedRestaurants.length} saved ${
                userData.savedRestaurants.length === 1
                  ? "restaurant"
                  : "restaurants"
              }:`
            : "You have no restaurants saved!"}
        </h2>
        <Row>
          {userData.savedRestaurants &&
            userData.savedRestaurants.map((restaurant) => {
              return (
                <Col md="4" key={restaurant.restaurantId}>
                  <Card border="dark">
                    <Card.Body className="list">
                      <Card.Title>{restaurant.restaurant_name}</Card.Title>
                      <Button
                        id="delete"
                        className="btn-block btn-danger"
                        onClick={() =>
                          handleDeleteRestaurant(restaurant.restaurantId)
                        }
                      >
                        Delete this Restaurant!
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
      <>
        <div fluid className="text-light bg-dark p-5">
          <Container>
            <h1>Viewing saved activities!</h1>
          </Container>
        </div>
        <Container>
          <h2 id="header" className="pt-5">
            {userData.savedVenues && userData.savedVenues.length
              ? `Viewing ${userData.savedVenues.length} saved ${
                  userData.savedVenues.length === 1 ? "venue" : "venues"
                }:`
              : "You have no activities saved!"}
          </h2>
          <Row>
            {userData.savedVenues &&
              userData.savedVenues.map((venue) => {
                return (
                  <Col md="4" key={venue.venueId}>
                    <Card border="dark">
                      <Card.Body className="list">
                        <Card.Title>{venue.venue_name}</Card.Title>
                        <Button
                          id="delete"
                          className="btn-block btn-danger"
                          onClick={() => handleDeleteVenue(venue.venueId)}
                        >
                          Delete this Venue!
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </>
      <>
        <div fluid className="text-light bg-dark p-5">
          <Container>
            <h1>Viewing saved adventures!</h1>
          </Container>
        </div>
        <Container>
          <h2 id="header" className="pt-5">
            {userData.savedAdventures && userData.savedAdventures.length
              ? `Viewing ${userData.savedAdventures.length} saved ${
                  userData.savedAdventures.length === 1
                    ? "adventure"
                    : "adventure"
                }:`
              : "You have no adventures saved!"}
          </h2>
          <Row>
            {userData.savedAdventures &&
              userData.savedAdventures.map((adventure) => {
                return (
                  <Col md="4" key={adventure.adventureId}>
                    <Card border="dark">
                      <Card.Body className="list">
                        <Card.Title>{adventure.adventure_name}</Card.Title>
                        <Button
                          id="delete"
                          className="btn-block btn-danger"
                          onClick={() =>
                            handleDeleteAdventure(adventure.adventureId)
                          }
                        >
                          Delete this Adventure!
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </>
    </>
  );
};

export default SavedRestaurants;

