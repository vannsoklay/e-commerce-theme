import { Component, JSXElement } from "solid-js";

interface DialogIconProps {
  children: JSXElement;
  classes?: string;
  modalId: Function;
  handler?: () => void;
  // handler?: ((model: string | null) => void | undefined) | undefined;
}

export const Dialog: Component<DialogIconProps> = (props) => {
  return (
    <dialog
      classList={{
        "modal-open": props.modalId() == "my_modal_2" ? true : false,
      }}
      class="modal"
    >
      <div class={`modal-box p-1 sm:p-6 ${props.classes}`}>
        {props.children}
      </div>
    </dialog>
  );
};
