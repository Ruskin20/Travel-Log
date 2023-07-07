import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}
`; 

export const LOGIN_USER = gql` 
mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;

export const SAVE_RESTAURANT = gql`
    mutation saveRestaurant($restaurantId: String!, $description: String!, $restaurant_name: String! $image: String, $link: String) {
        saveBook(restaurantId: $restaurantId, description: $description, restaurant_name: $restaurant_name image: $image, link: $link) {
            _id
            username
            email
            savedRestaurants {
                restaurantId
                restaurant_name
                description
                image
                link
            }
        }
    }
`;

export const REMOVE_RESTAURANT = gql`
  mutation removeRestaurant($restaurantId: String!) {
    removeRestaurant(restaurantId: $restaurantId) {
      _id
      username
      email
      savedRestaurants {
        restaurantId
        description
        restaurant_name

      }
    }
  }
`;

export const SAVE_VENUE = gql`
    mutation saveVenue($venueId: String!, $description: String!, $venue_name: String! $image: String, $link: String) {
        saveVenue(venueId: $venueId, description: $description, venue_name: $venue_name image: $image, link: $link) {
            _id
            username
            email
            savedVenues {
                venueId
                venue_name
                description
                image
                link
            }
        }
    }
`;

export const REMOVE_VENUE = gql`
  mutation removeVenue($venueId: String!) {
    removeVenue(venueId: $venueId) {
      _id
      username
      email
      savedVenues {
        venueId
        description
        venue_name

      }
    }
  }
`;