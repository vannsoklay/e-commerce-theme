import { Component } from "solid-js";
import {
  createForm,
  SubmitHandler,
  email,
  required,
} from "@modular-forms/solid";
import toast from "solid-toast";
import { client } from "~/libs/client";
import { CREATE_DELIVERY } from "~/libs/graphql/delivery";
import Button from "../Button";

export const DeliveryForm: Component<{ refetch: Function }> = (props) => {
  const [_, { Form, Field }] = createForm<DeliveryType>();

  const handleSubmit: SubmitHandler<DeliveryType> = (values, _) => {
    console.log("value", values);
    
    client
      .mutation(CREATE_DELIVERY, {
        input: { ...values, phoneNumber: parseInt(values.phoneNumber) },
      })
      .toPromise()
      .then((res) => {
        if (res.error) {
          return toast.error(res.error.message);
        }
        props.refetch();
        toast.success(res.data.storeCreateDelivery.message);
      });
  };
  return (
    <Form onSubmit={handleSubmit} class="space-y-4 md:space-y-6 w-full">
      <div class="grid grid-cols-2 space-x-4">
        <Field
          name="firstName"
          validate={[required("Please enter your first name.")]}
        >
          {(field, props) => (
            <div>
              <input
                {...props}
                type="text"
                required
                placeholder="First Name"
                class="input input-bordered w-full"
              />
              {field.error && (
                <div class="text-sm text-red-600 dark:text-red-500">
                  {field.error}
                </div>
              )}
            </div>
          )}
        </Field>
        <Field
          name="lastName"
          validate={[required("Please enter your last name.")]}
        >
          {(field, props) => (
            <div>
              <input
                {...props}
                type="text"
                required
                placeholder="Last Name"
                class="input input-bordered w-full"
              />
              {field.error && (
                <div class="text-sm text-red-600 dark:text-red-500">
                  {field.error}
                </div>
              )}
            </div>
          )}
        </Field>
      </div>
      <div class="grid grid-cols-2">
        <Field
          name="address"
          validate={[required("Please enter your address.")]}
        >
          {(field, props) => (
            <div class="col-span-2">
              <input
                {...props}
                type="text"
                required
                placeholder="Address"
                class="input input-bordered w-full"
              />
              {field.error && (
                <div class="text-sm text-red-600 dark:text-red-500">
                  {field.error}
                </div>
              )}
            </div>
          )}
        </Field>
      </div>
      <div class="grid grid-cols-2 space-x-4">
        <Field
          name="email"
          validate={[
            required("Please enter your email."),
            email("The email address is badly formatted."),
          ]}
        >
          {(field, props) => (
            <div>
              <input
                {...props}
                type="email"
                required
                placeholder="Email"
                class="input input-bordered w-full"
              />
              {field.error && (
                <div class="text-sm text-red-600 dark:text-red-500">
                  {field.error}
                </div>
              )}
            </div>
          )}
        </Field>
        <Field
          name="phoneNumber"
          validate={[required("Please enter your phone number.")]}
        >
          {(field, props) => (
            <div>
              <input
                {...props}
                type="number"
                required
                placeholder="Phone number"
                class="input input-bordered w-full"
              />
              {field.error && (
                <div class="text-sm text-red-600 dark:text-red-500">
                  {field.error}
                </div>
              )}
            </div>
          )}
        </Field>
      </div>
      <div class="flex justify-end w-full">
        <Button.Primary class="rounded-full w-48" type="submit">
          Save & Continue
        </Button.Primary>
      </div>
    </Form>
  );
};
