import { Component, JSXElement } from "solid-js";

interface DialogIconProps {
  children: JSXElement;
  classes?: string,
  modalId: Function;
  handler?: () => void;
}

export const Dialog: Component<DialogIconProps> = (props) => {
  return (
    <dialog
      classList={{
        "modal-open": props.modalId() == "my_modal_1" ? true : false,
      }}
      class={`modal`}
    >
      <div class={`modal-box ${props.classes}`}>
        {props.children}
      </div>
    </dialog>
  );
};
