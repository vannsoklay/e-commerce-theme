import { AboutConfig, Member } from "~/types/global";
import { For, Resource, Show } from "solid-js";

import { read } from "~/utils/theme";

export default function Team() {
  const about = read("about") as Resource<AboutConfig>;
  const members = () => about()?.members ?? [];

  return (
    <div class="py-6 sm:py-6 lg:py-20 px-6">
      <Show when={members().length > 0} fallback={null}>
        <div class="mb-16 text-center">
          <h2 class="mb-4 text-lg sm:text-lg lg:text-4xl text-primary font-bold">
            {about()?.title ?? "ABOUT US"}
          </h2>
          <p class="text-base-content/80 md:w-2/3 w-full mx-auto">
            {about()?.description ?? ""}
          </p>
        </div>

        <div class="flex flex-wrap -m-4 justify-center">
          <For each={members()}>
            {(member: Member) => (
              <div class="p-4 w-1/2 lg:w-1/4 sm:w-1/2 ">
                <div class="h-full flex flex-col justify-center items-center text-center">
                  <img
                    alt={member.name}
                    class="aspect-square mask mask-squircle flex-shrink-0 rounded-lg w-full h-32 sm:h-12 lg:h-56 object-cover object-center mb-4"
                    src={member.photo}
                  />
                  <div class="w-full">
                    <h2 class="title-font font-medium text-lg text-gray-900">
                      {member.name}
                    </h2>
                    <h3 class="text-gray-500 mb-3">{member.position}</h3>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}
