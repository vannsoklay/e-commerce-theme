import { Navigate, useNavigate } from "solid-start";

import { createEffect } from "solid-js";
const PrivateNotFound = () => {
	// const nav = useNavigate();
	// createEffect(() => {
	//   nav("https://backend.riverbase.org/sso/store", { replace: true });
	// });
	return (
		<div class="flex justify-center items-center pt-12">
			<a href={`https://backend.riverbase.org/sso/store`}>
				<button class="btn px-14 rounded-box bg-primary/10 hover:bg-primary/5 text-primary border-none">
					Login
				</button>
			</a>
		</div>
	);
};

export default PrivateNotFound;
