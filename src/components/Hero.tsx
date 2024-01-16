import { A } from "@solidjs/router";
import { read } from "~/utils/theme";

const Hero = () => {
	const name = read("name");
	const promotion = read("promotion");

	return (
		<div class=" bg-primary/5 md:py-0 md:px-12 xl:px-0 px-3">
			<div class="container mx-auto ">
				<div class=" grid md:grid-cols-2 grid-cols-1 items-center min-h-[60vh]">
					<div>
						<h1 class="sm:text-5xl text-base text-2xl font-black">{name()}</h1>
						<p class="lg:py-6 py-4 lg:text-xl text-sm text-neutral opacity-80">
							{promotion()?.quote
								? promotion()?.quote
								: "We Choose the best parts of consumable to make the whole toner cartridge. We test each other cartridge before delivery to make sur quality."}
						</p>
						<A href="/products">
							<button class="lg:w-40 w-32 btn lg:btn-md btn-sm shadow-sm rounded-box btn-primary">
								Shop Now
							</button>
						</A>
					</div>
					<div class="flex justify-end items-center">
						<img
							src={
								promotion()?.images
									? promotion()?.images
									: "/images/promotes/promote.png"
							}
							class="h-96 rounded-lg md:grid"
							alt={name()}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hero;
