import { gql } from "@urql/core";

export const CATEGORIES = gql`
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
