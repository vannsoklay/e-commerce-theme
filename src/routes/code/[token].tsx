import { createEffect } from "solid-js";
import { useParams } from "solid-start";

export default function index() {
	const params = useParams<{ token: string }>();

	createEffect(() => {
		localStorage.setItem("access_token", params.token);
		window.location.replace("/");
	});
	return;
}
