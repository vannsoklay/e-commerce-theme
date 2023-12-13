import { Component, JSXElement, Show, createEffect } from "solid-js";
import { useAuth } from "~/contexts/useAuth";
import PrivateLogin from "./PrivateLogin";

interface LayoutProps {
  children: JSXElement;
}

const PrivateLayout: Component<LayoutProps> = (props) => {
  const { user, loading } = useAuth();
  return (
    <Show
      when={!loading()!}
      fallback={
        <div class="container mx-auto md:px-32 pt-8 h-[52vh] flex justify-center items-center">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
      }
    >
      <Show when={user()} fallback={<PrivateLogin />}>
        <main class="container mx-auto md:px-32 pt-8">{props.children}</main>
      </Show>
    </Show>
  );
};

export default PrivateLayout;
