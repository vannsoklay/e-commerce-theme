import { gql } from "@urql/core";

export const CREATE_DELIVERY = gql`
  mutation ($input: InputDelivery!) {
    createDelivery(input: $input)
  }
`;

export const DELIVERIES = gql`
  query {
    deliveries {
      id
      firstName
      lastName
      email
      address
      phoneNumber
      createdAt
      updatedAt
    }
  }
`;
