import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import './SavedActivities.css';

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { REMOVE_VENUE } from "../../utils/mutations";
import { removeVenueId } from "../../utils/localStorage";

import Auth from "../../utils/auth";

const SavedVenues = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeVenue] = useMutation(REMOVE_VENUE);

    const userData = data?.me || {};
    console.log(data);

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

  if (loading) {
    return <h2>LOADING...</h2>;
  }

    return (
      
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved activities!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedVenues && userData.savedVenues.length
            ? `Viewing ${userData.savedVenues.length} saved ${
                userData.savedVenues.length === 1
                  ? "venue"
                  : "venues"
              }:`
            : "You have nothing saved!"}
        </h2>
        <Row>
        {userData.savedVenues && userData.savedVenues.map((venue) => {
  return (
    <Col md="4" key={venue.venueId}>
      <Card border='dark'>
        <Card.Body className="list">
          <Card.Title>{venue.venue_name}</Card.Title>
          <Button id="delete" className='btn-block btn-danger' onClick={() => handleDeleteVenue(venue.venueId)}>
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
  );
};

export default SavedVenues;