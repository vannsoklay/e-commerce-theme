type DeliveryType = {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phoneNumber: string;
};

type PaymentType = {
  method: "CARD" | "PAYPAL" | "BITCOIN" | "CASH";
  nameCard: string;
  numberCard: string;
};


type CheckoutType = {
  delivery: string,
  method: string
}