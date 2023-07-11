import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
            _id
            username
            email
            savedRestaurants {
                restaurantId
                restaurant_name
                description
                authors
                image
                link
            }
            savedVenues {
                venueId
                venue_name
                description
                image
                link
            }
            savedAdventures {
                adventureId
                adventure_name
                description
                image
                link
            }
        }
    }
`;