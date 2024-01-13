import { Component, For, Match, Resource, Switch } from "solid-js";
import {
	FiFacebook,
	FiInstagram,
	FiMail,
	FiPhone,
	FiTwitter,
	FiYoutube,
} from "solid-icons/fi";
import { FooterConfig, Social } from "~/types/global";
import { SiGmail, SiTelegram, SiTiktok } from "solid-icons/si";

import { A } from "solid-start";
import { FaSolidSquarePhone } from "solid-icons/fa";
import { read } from "~/utils/theme";

const Footer: Component = () => {
	const name = read("name");
	const header = read("header");
	const footer = read("footer") as Resource<FooterConfig>;

	return (
		<>
			<div class="flex flex-col mx-3 bg-action/5 py-8 rounded-lg">
				<div class="w-full draggable">
					<div class="container flex flex-col mx-auto">
						<div class="flex flex-col items-center w-full">
							<span class="mb-8">
								<A href="/">
									<img class="h-10 mb-2" src={header()?.logo} alt="" />
								</A>
							</span>
							<div class="flex flex-col items-center gap-6 mb-8">
								<div class="flex flex-wrap items-center justify-center gap-5 lg:gap-12 gap-y-3 lg:flex-nowrap text-dark-grey-900">
									<a
										href="javascript:void(0)"
										class="text-gray-600 hover:text-gray-900"
									>
										About
									</a>
									<a
										href="javascript:void(0)"
										class="text-gray-600 hover:text-gray-900"
									>
										Term of use
									</a>
									<a
										href="javascript:void(0)"
										class="text-gray-600 hover:text-gray-900"
									>
										Copyright and Trademark Policy
									</a>
									<a
										href="javascript:void(0)"
										class="text-gray-600 hover:text-gray-900"
									>
										Acceptable Use Policy
									</a>
								</div>
								<div class="flex items-center gap-8 text-2xl">
									<For each={footer()?.socials.filter((s: Social) => s.enable)}>
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
			{/* <footer class="hidden sm:block py-10 bg-primary-1/5 text-primary-1/80 text-base-content">
				<div class="footer md:flex justify-between w-full container mx-auto xl:px-32 px-8">
					<aside>
						<A href="/">
							<img class="h-14 mb-4" src={header()?.logo} alt="" />
						</A>
						<p class="text-body-color text-lg">
							#18C1, Sangkat Tuek Thlar, Khan Sen Sok, Phnom Penh, Cambodia
						</p>
						<p class="text-dark flex items-center text-base text-primary gap-2">
							<span>
								<FiMail />
							</span>
							<span>info@camprotec.com.kh</span>
						</p>
						<p class="text-dark flex items-center text-base text-primary gap-2">
							<span>
								<FiPhone />
							</span>
							<span>023 884 789</span>
						</p>
					</aside>
					<nav class="md:grid hidden">
						<header class="footer-title">Services</header>
						<a class="link link-hover">Branding</a>
						<a class="link link-hover">Design</a>
						<a class="link link-hover">Marketing</a>
						<a class="link link-hover">Advertisement</a>
					</nav>
					<nav class="md:grid hidden">
						<header class="footer-title">Company</header>
						<a class="link link-hover">About us</a>
						<a class="link link-hover">Contact</a>
						<a class="link link-hover">Jobs</a>
						<a class="link link-hover">Press kit</a>
					</nav>
					<nav class="md:grid hidden">
						<header class="footer-title">Legal</header>
						<a class="link link-hover">Terms of use</a>
						<a class="link link-hover">Privacy policy</a>
						<a class="link link-hover">Cookie policy</a>
					</nav>
					<nav>
						<header class="footer-title">Social</header>
						<div class="grid grid-flow-col gap-4">
							<For each={footer()?.socials.filter((s: Social) => s.enable)}>
								{(social) => (
									<a href={social.link} target="__blank">
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
					</nav>
				</div>
			</footer>
			<div class="hidden sm:block bg-primary-1 text-white p-4">
				<footer class="footer footer-center">
					<aside>
						<p>Copyright © 2023 - All right reserved by Riverbase</p>
					</aside>
				</footer>
			</div> */}
		</>
	);
};

export default Footer;
