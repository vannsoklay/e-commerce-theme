import { gql } from "@urql/core";

export const CHECKOUT_PRODUCT = gql`
  mutation (
    $orderId: String!
    $deliveryOptionId: String!
    $deliveryId: String!
    $payment: PaymentType!
  ) {
    storeCreateCheckout(
      orderId: $orderId
      payment: $payment
      deliveryOptionId: $deliveryOptionId
      deliveryId: $deliveryId
    )
  }
`;
