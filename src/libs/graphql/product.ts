import { gql } from "@urql/core";

export const GET_PRODUCT = gql`
  query($slug: String!) {
    storeProduct(slug: $slug) {
      id
      ownerId
      storeId
      title
      thumbnail
      brand
      desc
      price
      slug
      rating
      previews
      status
      detail
      currency
      variants {
        price
        preview
        option
        label
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query($filter: OrderBy){
    storeProducts(filter: $filter){
      id
      ownerId
      storeId
      title
      thumbnail
      brand
      desc
      price
      slug
      rating
      previews
      currency
      status
      detail
      variants {
        price
        preview
        option
        label
      }
      createdAt
      updatedAt
    }
  }
`;
