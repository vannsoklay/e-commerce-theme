import { Component, JSXElement, createEffect } from "solid-js";

interface Button {
    class?: string;
    name?: string;
    children: JSXElement;
    handler?: (e: Event) => void;
    type?: "submit" | "reset" | "button"
}

const Primary: Component<Button> = (props) => {
  return (
    <button
      onClick={props.handler}
      class={`${props.class} btn border-none bg-primary-1/10 text-primary-1 hover:text-primary-1 hover:border-primary-1 hover:bg-primary-1/10`}
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
        class={`${props.class} btn border-none bg-action/10 text-action hover:text-action hover:border-action hover:bg-action/10`}
      >
        {props.children}
      </button>
    );
  };

  export default {
    Primary,
    Action
  }
  
