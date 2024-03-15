import { gql } from "@urql/core";

export const CREATE_ADDRESS = gql`
  mutation ($input: InputAddress!) {
    storeCreateAddress(input: $input)
  }
`;

export const ADDRESS = gql`
  query {
    storeAddress {
      id
      firstName
      lastName
      phoneNumber
      createdAt
      updatedAt
      photos
      addressName
      lat
      lng
    }
  }
`;

// export const DELIVERIES_EXPRESS = gql`
// 	query {
// 		storeDeliveriesExpress {
// 			city
// 			name
// 			logo
// 			id
// 			price
// 			shipping
// 			kilometer
// 			email
// 			currency
// 			express
// 			phoneNumber
// 		}
// 	}
// `;
