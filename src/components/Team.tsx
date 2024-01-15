import { For, Resource } from "solid-js";
import { AboutConfig, Member } from "~/types/global";
import { read } from "~/utils/theme";

export default function Team() {
	const about = read("about") as Resource<AboutConfig>;
	const members = () => about()?.members;
	return (
		<>
			<div class="py-20">
				<div>
					<div class="mb-16 text-center">
						<h2 class="mb-4  text-2xl text-gray-900 font-bold md:text-4xl">
							Tailus blocks leadership
						</h2>
						<p class="text-gray-600 md:w-2/3 w-full mx-auto">
							Tailus prides itself not only on award-winning technology, but
							also on the talent of its people of some of the brightest minds
							and most experienced executives in business.
						</p>
					</div>
					<div class="grid  lg:gap-20 md:gap-10 gap-6 justify-start lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
						<For each={members()}>
							{(member: Member) => (
								<div class="space-y-4 text-center">
									<img
										class="aspect-square mask mask-squircle object-cover rounded-xl"
										src={member.photo}
										alt="woman"
										loading="lazy"
									/>
									<div>
										<h4 class="text-2xl">{member.name}</h4>
										<span class="block text-sm text-gray-500">
											{member.position}
										</span>
									</div>
								</div>
							)}
						</For>
					</div>
				</div>
			</div>
		</>
	);
}
