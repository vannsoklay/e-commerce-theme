import { Show, createEffect } from "solid-js";
import { A } from "solid-start";
import { read } from "~/utils/theme";

export const Logo = () => {
  const name = read("name");
  const header = read("header");

  return (
    <div class="flex-1">
      <A
        href="/"
        class="btn btn-ghost hover:bg-transparent md:text-xl text-md text-primary"
      >
        <Show when={!header()?.type} fallback={name()}>
          <img src={header()?.logo} alt="" class="w-full max-h-9" />
        </Show>
      </A>
    </div>
  );
};
