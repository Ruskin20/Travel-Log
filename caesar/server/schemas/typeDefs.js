const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedRestaurants: [Restaurant],
    savedEntertainment: [Entertainment]
  }

  type Restaurant {
    restaurantId: String!
    restaurant_name: String!
    description: String!
    image: String
    link: String
  }

  type Entertainment {
    entertainmentId: String!
    venue_name: String!
    description: String!
    image: String
    link: String
  }

  input RestaurantInput {
    restaurantId: String!
    restaurant_name: String!
    description: String!
  }

  input EntertainmentInput {
    entertainmentId: String!
    venue_name: String!
    description: String!
  }

  type Auth {
    token: ID
    user: User
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

    saveEntertainment(
      entertainmentId: String!,
      description: String!,
      venue_name: String!,
      image: String,
      link: String
    ): User
    
    removeRestaurant(
      restaurantId: String!
    ): User

    removeEntertainment(
      entertainmentId: String!
    ): User
  }
`;

module.exports = typeDefs;