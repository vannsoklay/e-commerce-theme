import { Component, JSXElement, createEffect } from "solid-js";

interface Button {
	class?: string;
	name?: string;
	children: JSXElement;
	handler?: (e: Event) => void;
	disable?: boolean;
	type?: "submit" | "reset" | "button";
}

const Primary: Component<Button> = (props) => {
	return (
		<button
			onClick={props.handler}
			disabled={props.disable ? true : false}
			class={`${props.class} btn border-none bg-primary/10 text-primary hover:text-primary hover:border-primary hover:bg-primary/10`}
		>
			{props.children}
		</button>
	);
};

const Action: Component<Button> = (props) => {
	return (
		<button
			type={props.type}
			onClick={props.handler}
			disabled={props.disable ? true : false}
			class={`${props.class} btn border-none bg-accent/10 text-accent hover:text-accent hover:border-accent hover:bg-accent/10`}
		>
			{props.children}
		</button>
	);
};

export default {
	Primary,
	Action,
};
