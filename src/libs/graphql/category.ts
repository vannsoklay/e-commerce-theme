import { gql } from "@urql/core";

export const CATEGORIES = gql`
  query {
    storeOwnerCategories {
      children {
        id
        logo
        title {
          en
        }
      }
      createdAt
      id
      logo
      title {
        en
      }
      updatedAt
    }
  }
`;

export const SUB_CATEGORY_BY_ID = gql`
  query ($parentId: String!) {
    storeOwnerSubcategories(parentId: $parentId) {
      id
      logo
      title {
        en
      }
    }
  }
`;
