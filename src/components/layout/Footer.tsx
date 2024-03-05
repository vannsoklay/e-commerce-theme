import { Component, For, Match, Resource, Show, Switch } from "solid-js";
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from "solid-icons/fi";
import { FooterConfig, Social } from "~/types/global";
import { SiTelegram, SiTiktok } from "solid-icons/si";
import { FaSolidMapLocationDot, FaSolidPhone } from "solid-icons/fa";
import { TbMailFilled } from "solid-icons/tb";

import { A } from "solid-start";
import { read } from "~/utils/theme";

const Footer: Component = () => {
  const header = read("header");
  const footer = read("footer") as Resource<FooterConfig>;

  return (
    <>
      <div class="flex flex-col  bg-primary/5 py-8 rounded-lg">
        <div class="w-full draggable">
          <div class="container flex flex-col mx-auto">
            <div class="flex flex-col items-center w-full">
              <span class="mb-8">
                <A href="/">
                  <img class="h-10 mb-2" src={header()?.logo} alt="" />
                </A>
              </span>
              <Show when={footer()?.contact} fallback={null}>
                <div class="mb-8 space-y-3 px-9 sm:px-9 lg:px-0">
                  <div class="flex items-center justify-center gap-3 font-bold text-primary text-2xl">
                    {/* <FaSolidPhone size={18} /> */}
                    <span>{footer()?.contact?.phone}</span>
                  </div>
                  <div class="flex items-center justify-center gap-3">
                    {/* <TbMailFilled size={24} /> */}
                    <span>{footer()?.contact?.email}</span>
                  </div>
                  <div class="flex items-center justify-center text-center gap-3 break-all">
                    {/* <FaSolidMapLocationDot size={24} /> */}
                    <span>{footer()?.contact?.address}</span>
                  </div>
                </div>
              </Show>
              <div class="flex flex-col items-center gap-6">
                <div class="flex flex-wrap items-center justify-center gap-5 lg:gap-12 gap-y-3 lg:flex-nowrap text-dark-grey-900">
                  <a href="javascript:void(0)" class="hover:text-primary">
                    About
                  </a>
                  <a href="javascript:void(0)" class="hover:text-primary">
                    Term of use
                  </a>
                  <a href="javascript:void(0)" class="hover:text-primary">
                    Copyright and Trademark Policy
                  </a>
                  <a href="javascript:void(0)" class="hover:text-primary">
                    Acceptable Use Policy
                  </a>
                </div>
                <div class="flex items-center gap-8 text-2xl">
                  <For
                    each={footer()?.socials?.filter((s: Social) => s.enable)}
                  >
                    {(social) => (
                      <a
                        href={social.link}
                        target="__blank"
                        class="hover:text-primary"
                      >
                        <Switch>
                          <Match when={social.name === "youtube"}>
                            <FiYoutube />
                          </Match>
                          <Match when={social.name === "facebook"}>
                            <FiFacebook />
                          </Match>
                          <Match when={social.name === "tiktok"}>
                            <SiTiktok />
                          </Match>
                          <Match when={social.name === "instagram"}>
                            <FiInstagram />
                          </Match>
                          <Match when={social.name === "telegram"}>
                            <SiTelegram />
                          </Match>
                          <Match when={social.name === "twitter"}>
                            <FiTwitter />
                          </Match>
                        </Switch>
                      </a>
                    )}
                  </For>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
