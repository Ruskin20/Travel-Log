const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedRestaurants: [Restaurant],
    savedVenues: [Entertainment],
    savedAdventures: [Adventure]
  }

  type Restaurant {
    restaurantId: String!
    restaurant_name: String!
    description: String!
    image: String
    link: String
  }

  type Entertainment {
    venueId: String!
    venue_name: String!
    description: String!
    image: String
    link: String
  }

  type Adventure {
    adventureId: String!
    adventure_name: String!
    description: String!
    image: String
    link: String
  }

  type Auth {
    token: ID
    user: User
  }

  input RestaurantInput {
    restaurantId: String!
    restaurant_name: String!
    description: String!
  }

  input VenueInput {
    venueId: String!
    venue_name: String!
    description: String!
  }

  input AdventureInput {
    adventureId: String!
    adventure_name: String!
    description: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    loginUser(
      email: String!, 
      password: String!
    ): Auth

    addUser(
      username: String!, 
      email: String!, 
      password: String!
    ): Auth

    saveRestaurant(
      restaurantId: String!,
      description: String!,
      restaurant_name: String!,
      image: String,
      link: String
    ): User

    saveVenue(
      venueId: String!,
      description: String!,
      venue_name: String!,
      image: String,
      link: String
    ): User

    saveAdventure(
      adventureId: String!,
      description: String!,
      adventure_name: String!,
      image: String,
      link: String
    ): User
    
    removeRestaurant(
      restaurantId: String!
    ): User

    removeVenue(
      venueId: String!
    ): User

    removeAdventure(
      adventureId: String!
    ): User
  }
`;

module.exports = typeDefs;