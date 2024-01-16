import { Component, createSignal } from "solid-js";
import { FaBrandsFacebookF, FaBrandsGoogle } from "solid-icons/fa";
import {
	SubmitHandler,
	createForm,
	email,
	minLength,
	required,
} from "@modular-forms/solid";

import axios from "axios";
import toast from "solid-toast";
import { useAuth } from "~/contexts/useAuth";

type LoginForm = {
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

export const LoginForm: Component<{
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
	const [_, { Form, Field }] = createForm<LoginForm>();
	const [loading, setLoading] = createSignal(false);

	const handleSubmit: SubmitHandler<LoginForm> = (values, _) => {
		axios
			.post(
				`${import.meta.env.VITE_VARIABLE_BACKEND}/api/login`,
				{ ...values },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then(async (res) => {
				setLoading(true);
				await user_store_login(res.data.data.access_token)
					.then((_) => {
						localStorage.setItem("access_token", res.data.data.access_token);
						getUser();
						setTimeout(() => {
							toast.success("Login with store successfully");
							setLoading(false);
							handler(null);
						});

						return;
					})
					.catch((_) => {
						toast.error("Fail to login");
						setLoading(false);
						handler(null);
						return;
					});
			})
			.catch(async (error) => {
				if (error.code === "ERR_BAD_REQUEST") {
					return toast.error("Invalid password and email!");
				}
				return toast.error("Connecting network!");
			});
	};
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
			<Form onSubmit={handleSubmit} class={`space-y-4 ${className}`}>
				<div class="grid grid-cols-2 gap-3">
					<button class="btn btn-outline rounded-xl">
						<FaBrandsGoogle /> Google
					</button>
					<button class="btn btn-primary rounded-xl">
						<FaBrandsFacebookF /> Facebook
					</button>
				</div>

				<div class="divider">or continue with</div>

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

				<div class="mt-6 flex items-center justify-between">
					<div class="form-control">
						<label class="label cursor-pointer">
							<input
								type="checkbox"
								// checked="checked"
								class="checkbox checkbox-sm mr-2"
							/>
							<span class="label-text">Remember me</span>
						</label>
					</div>

					<div class="text-sm leading-5">
						<a
							href="#"
							class="link link-hover font-medium text-primary hover:text-primary"
						>
							Forgot your password?
						</a>
					</div>
				</div>

				{kind === "private" ? (
					<button
						class="btn w-full bg-primary/10 text-primary rounded-xl hover:bg-primary/10 hover:text-primary hover:border-primary"
						type="submit"
					>
						{loading() && <span class="loading loading-spinner"></span>}
						Login
					</button>
				) : (
					<div class="flex justify-end space-x-2">
						{/* <button
              class="btn bg-red-800/10 rounded-box border-none w-28 text-red-800 hover:bg-red-800/10 hover:text-red-800 hover:border-red-800"
              onClick={(e) => {
                e.preventDefault(), handler(null);
              }}
            >
              Cancel
            </button> */}
						<button
							class="btn w-full bg-primary/10 rounded-xl border-none text-primary hover:bg-primary/10 hover:text-primary"
							type="submit"
						>
							{loading() && <span class="loading loading-spinner"></span>}
							Login
						</button>
					</div>
				)}
			</Form>
		</>
	);
};
