import { Component, For } from "solid-js";
import { createForm, SubmitHandler } from "@modular-forms/solid";

export const PaymentForm: Component = () => {
  const [_, { Form, Field }] = createForm<PaymentType>();

  const handleSubmit: SubmitHandler<PaymentType> = (values, _) => {
    console.log("delivery", values);
  };
  return (
    <Form onSubmit={handleSubmit} class="space-y-4 md:space-y-6 w-full">
      <div class="grid grid-cols-8 gap-4">
      </div>
    </Form>
  );
};
