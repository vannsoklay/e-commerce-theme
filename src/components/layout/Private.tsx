import { Component, JSXElement, Show, createEffect } from "solid-js";

import PrivateLogin from "./PrivateLogin";
import { useAuth } from "~/contexts/useAuth";
import { redirect } from "solid-start";

interface LayoutProps {
	children: JSXElement;
}

const PrivateLayout: Component<LayoutProps> = (props) => {
	const { user, loading } = useAuth();
	createEffect(() => {
		if(user()){
			return
		}
		redirect('/')
	})
	return (
		<Show
			when={!loading()!}
			fallback={
				<div class="container mx-auto flex justify-center items-center">
					<span class="loading loading-spinner loading-lg"></span>
				</div>
			}
		>
			<Show when={user()} fallback={<PrivateLogin />}>
				<main class="container mx-auto">{props.children}</main>
			</Show>
		</Show>
	);
};

export default PrivateLayout;
