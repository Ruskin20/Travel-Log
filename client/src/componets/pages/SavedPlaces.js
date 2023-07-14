import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import './SavedPlaces.css';

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { REMOVE_RESTAURANT } from "../../utils/mutations";
import { removeRestaurantId } from "../../utils/localStorage";

import Auth from "../../utils/auth";

const SavedRestaurants = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeRestaurant] = useMutation(REMOVE_RESTAURANT);

    const userData = data?.me || {};
    console.log(data);

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
        <h2 className="pt-5">
          {userData.savedRestaurants && userData.savedRestaurants.length
            ? `Viewing ${userData.savedRestaurants.length} saved ${
                userData.savedRestaurants.length === 1
                  ? "restaurant"
                  : "restaurants"
              }:`
            : "You have nothing saved!"}
        </h2>
        <Row>
        {userData.savedRestaurants && userData.savedRestaurants.map((restaurant) => {
  return (
    <Col md="4" key={restaurant.restaurantId}>
      <Card border='dark'>
        <Card.Body className="list">
          <Card.Title>{restaurant.restaurant_name}</Card.Title>
          <Button id="delete" className='btn-block btn-danger' onClick={() => handleDeleteRestaurant(restaurant.restaurantId)}>
            Delete this Restaurant!
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
})}
        </Row>
      </Container>
    </>
  );
};

export default SavedRestaurants;
