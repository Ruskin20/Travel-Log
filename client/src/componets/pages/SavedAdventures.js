import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import './SavedAdventures.css';

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { REMOVE_ADVENTURE } from "../../utils/mutations";
import { removeAdventureId } from "../../utils/localStorage";

import Auth from "../../utils/auth";

const SavedAdventures = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeAdventure] = useMutation(REMOVE_ADVENTURE);

    const userData = data?.me || {};
    console.log(data);

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
          <h1>Viewing saved adventures!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.SavedAdventures && userData.SavedAdventures.length
            ? `Viewing ${userData.SavedAdventures.length} saved ${
                userData.SavedAdventures.length === 1
                  ? "adventure"
                  : "adventure"
              }:`
            : "You have nothing saved!"}
        </h2>
        <Row>
        {userData.SavedAdventures && userData.SavedAdventures.map((adventure) => {
  return (
    <Col md="4" key={adventure.restaurantId}>
      <Card border='dark'>
        <Card.Body className="list">
          <Card.Title>{adventure.adventure_name}</Card.Title>
          <Button id="delete" className='btn-block btn-danger' onClick={() => handleDeleteAdventure(adventure.adventureId)}>
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
  );
};

export default SavedAdventures;