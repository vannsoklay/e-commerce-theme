import { A } from "@solidjs/router";
import { read } from "~/utils/theme";
import { HiOutlineArrowLongRight } from "solid-icons/hi";
import { Show, createEffect } from "solid-js";

const Hero = () => {
  const globals = read("globals");
  const banner = read("banner");

  return (
    <>
      <section class="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:py-36 py-28 ">
        <Show when={banner()?.message} fallback={null}>
          <A
            href="/products"
            class="border border-primary/30 rounded-2xl py-1 px-4 text-slate-500 text-sm mb-5 hover:scale-105 transition duration-300 ease-in-out"
          >
            {banner()?.message}
            <Show
              when={globals()?.officialName}
              fallback={
                <span class="font-semibold text-primary">
                  {globals()?.name}
                </span>
              }
            >
              <span class="font-semibold text-primary">
                {" "}
                {globals()?.officialName}
              </span>
            </Show>
          </A>
        </Show>
        <div class="mx-auto flex flex-col font-display font-bold tracking-normal text-slate-900 [font-size:_clamp(1.25em,4vw,4em)]">
          {banner()?.title}
          <span class="relative whitespace-nowrap text-primary ">
            <svg
              aria-hidden="true"
              viewBox="0 0 418 42"
              class="absolute top-2/3 left-0 h-[0.58em] w-full fill-primary/80"
              preserveAspectRatio="none"
            >
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
            </svg>
            <Show
              when={globals()?.officialName}
              fallback={<span class="relative"> {globals()?.name}</span>}
            >
              <span class="relative break-all"> {globals()?.officialName}</span>
            </Show>
          </span>
        </div>
        <p class="mx-auto mt-12 max-w-xl text-lg text-slate-700 leading-7">
          {banner()?.desc
            ? banner()?.desc
            : "It's time to indulge! Dive into a sea of savings on all your favorite items. Snag incredible deals you won't believe (...your eyes ). Don't miss out, this sale's hotter than sunshine! ☀️"}
        </p>

        <A href="/products">
          <button class="bg-primary rounded-2xl text-white font-medium px-12 py-3 sm:mt-10 mt-8 hover:bg-primary/80 flex items-center gap-3 group">
            <span>Shop Now</span>{" "}
            <HiOutlineArrowLongRight
              size={24}
              class="group-hover:translate-x-2 duration-150"
            />
          </button>
        </A>
      </section>
    </>
  );
};

export default Hero;
