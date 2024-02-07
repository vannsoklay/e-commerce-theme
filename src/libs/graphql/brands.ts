import { gql } from "@urql/core";

export const BRANDS = gql`
  query {
    categories {
      createdAt
      id
      logo
      title {
        en
        kh
      }
      updatedAt
    }
  }
`;
