import { gql } from "@urql/core";

export const BRANDS = gql`
  query {
    storeOwnerBrands {
      id
      logo
      title {
        en
      }
      createdAt
    }
  }
`;
