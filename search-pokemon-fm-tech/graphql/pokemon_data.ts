import { gql } from "@apollo/client";

export const GET_POKEMON = gql`
  query Pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      number
      classification
      types
      image

      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }

      evolutions {
        id
        name
        number
        image
      }
    }
  }
`;