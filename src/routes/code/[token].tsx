import axios from "axios";
import { createEffect } from "solid-js";
import toast from "solid-toast";
import { useParams } from "solid-start";

const user_store_login = (token: String) => {
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

export default function index() {
	const params = useParams<{ token: string }>();

	createEffect(() => {
		user_store_login(params.token)
			.then((_) => {
				localStorage.setItem("access_token", params.token);
				setTimeout(() => {
					toast.success("Login with store successfully");
					localStorage.setItem("access_token", params.token);
					window.location.replace("/");
				});

				return;
			})
			.catch((_) => {
				return;
			});
	});
	return;
}
