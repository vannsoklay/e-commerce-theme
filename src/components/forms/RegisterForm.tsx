import { Component, createSignal } from "solid-js";
import {
  createForm,
  SubmitHandler,
  email,
  minLength,
  required,
} from "@modular-forms/solid";
import axios from "axios";
import toast from "solid-toast";
import { useAuth } from "~/contexts/useAuth";
import { A } from "solid-start";
import { FaBrandsGoogle, FaBrandsFacebookF } from "solid-icons/fa";

type RegisterForm = {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  password?: string;
};

const user_store_login = async (token: String) => {
  return axios.post(
    `${import.meta.env.VITE_VARIABLE_BACKEND}/api/store/login`,
    { store_id: import.meta.env.VITE_VARIABLE_ID_STORE },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const RegisterForm: Component<{
  handler: (model: string | null) => void;
  kind?: string;
  className?: string;
}> = ({
  handler,
  kind,
  className,
}: {
  handler: Function;
  kind?: string;
  className?: string;
}) => {
  const { getUser } = useAuth();
  const [_, { Form, Field }] = createForm<RegisterForm>();
  const [loading, setLoading] = createSignal(false);

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          handler(null);
        }}
        class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      >
        ✕
      </button>
      <Form class={`space-y-4 ${className}`}>
        <div class="grid grid-cols-2 gap-3">
          <button class="btn btn-outline rounded-xl">
            <FaBrandsGoogle /> Google
          </button>
          <button class="btn btn-primary rounded-xl">
            <FaBrandsFacebookF /> Facebook
          </button>
        </div>

        <div class="divider">or continue with</div>

        <div class="grid grid-cols-2 gap-3">
          <Field
            name="firstName"
            validate={[
              required("First name is required!"),
              //   email("The email address is badly formatted."),
            ]}
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
            validate={[
              required("Last name is required!"),
              //   email("The email address is badly formatted."),
            ]}
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
        <Field
          name="email"
          validate={[
            required("Email is required!"),
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
          name="phone"
          validate={[
            required("Phone number is required!"),
            // email("The email address is badly formatted."),
          ]}
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
        <Field
          name="password"
          validate={[
            required("Password is required!"),
            minLength(8, "You password must have 8 characters or more."),
          ]}
        >
          {(field, props) => (
            <div>
              <input
                {...props}
                type="password"
                required
                placeholder="Password"
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

        <div class="form-control">
          <label class="label cursor-pointer">
            <input
              type="checkbox"
              // checked="checked"
              class="checkbox checkbox-sm mr-3 "
            />
            <span class="label-text text-xs">
              I have read and agree to the{" "}
              <a href="#" class="link link-hover text-primary">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a class="link link-hover text-primary" href="#">
                Terms & Conditions
              </a>
              .
            </span>
          </label>
        </div>

        {kind === "private" ? (
          <button
            class="btn w-full bg-primary/10 text-primary rounded-xl hover:bg-primary/10 hover:text-primary hover:border-primary"
            type="submit"
          >
            {loading() && <span class="loading loading-spinner"></span>}
            Register
          </button>
        ) : (
          <div class="flex justify-end space-x-2">
            <button
              class="btn w-full bg-primary/10 rounded-xl border-none text-primary hover:bg-primary/10 hover:text-primary"
              type="submit"
            >
              {loading() && <span class="loading loading-spinner"></span>}
              Register
            </button>
          </div>
        )}
      </Form>
    </>
  );
};

export default RegisterForm;
