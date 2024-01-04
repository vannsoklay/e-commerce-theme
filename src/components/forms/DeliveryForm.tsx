import { Component, Show, createSignal } from "solid-js";
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
import axios, { AxiosResponse } from "axios";
import { useAuth } from "~/contexts/useAuth";

export const DeliveryForm: Component<{ refetch: Function }> = (props) => {
  const { user } = useAuth();
  const [_, { Form, Field }] = createForm<DeliveryType>();
  const [photo, setPhoto] = createSignal<string>();
  let inputRef: HTMLInputElement | ((el: HTMLInputElement) => void) | undefined;
  const [files, setFiles] = createSignal<File>();

  const handleSubmit: SubmitHandler<DeliveryType> = (values, _) => {
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

  async function handleChange(e: any) {
    e.preventDefault();
    toast.success("File has been added");
    if (e.target.files) {
      setFiles(e.target.files[0]);
    }

    const body = {
      upload: files(),
    };

    axios
      .post(
        `https://backend.riverbase.org/api/upload/image/${user()._id}`,
        body,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res: AxiosResponse<any, any>) => {
        setPhoto(res.data.path);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Form onSubmit={handleSubmit} class="space-y-4 md:space-y-6 w-full">
      <Field
        name="photos"
        validate={[required("Please enter your first name.")]}
      >
        {(field, props) => (
          <div
            class="w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6 cursor-pointer"
            id="dropzone"
          >
            <input
              {...props}
              type="file"
              required
              placeholder="First Name"
              class="file-input absolute w-full inset-0 h-full opacity-0 z-50 cursor-pointer"
              onChange={handleChange}
              ref={inputRef}
            />
            {field.error && (
              <div class="text-sm text-red-600 dark:text-red-500">
                {field.error}
              </div>
            )}
            <div class="text-center">
              <Show when={!photo()} fallback={null}>
                <img class="mx-auto h-24 w-24" src="/images/shop.png" alt="" />

                <h3 class="mt-2 text-sm font-medium text-gray-900">
                  <label for="file-upload" class="relative cursor-pointer">
                    <span>Browse to upload your place</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      class="sr-only"
                      onChange={handleChange}
                      ref={inputRef}
                    />
                  </label>
                </h3>
                <p class="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF up to 2MB
                </p>
              </Show>
              <Show when={photo()} fallback={null}>
                <img
                  class="mx-auto w-full object-contain cursor-pointer"
                  src={photo()}
                  alt=""
                />
              </Show>
            </div>
          </div>
        )}
      </Field>
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
                pattern="[^ @]*@[^ @]*"
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
        <Button.Primary class="rounded-xl w-full" type="submit">
          Save & Continue
        </Button.Primary>
      </div>
    </Form>
  );
};
