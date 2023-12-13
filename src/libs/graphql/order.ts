import { gql } from "@urql/core";

export const ORDER_PRODUCT = gql`
  mutation ($input: InputOrder!) {
    createOrder(input: $input)
  }
`;
