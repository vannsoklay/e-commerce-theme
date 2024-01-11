import { A } from "@solidjs/router";
import { read } from "~/utils/theme";

const Hero = () => {
  const name = read("name");
  const promotion = read("promotion");

  return (
    <div class="hero xl:min-h-[50vh] lg:min-h-[30vh] min-h-[20vh] bg-primary/5 md:py-0 md:px-12 xl:px-0 py-8 px-3">
      <div class="hero-content grid md:grid-cols-2 grid-cols-1">
        <div>
          <h1 class="sm:text-5xl text-primary text-2xl font-black">{name()}</h1>
          <p class="lg:py-6 py-4 lg:text-xl text-sm text-primary-1/80 opacity-80">
            {promotion()?.quote
              ? promotion()?.quote
              : "We Choose the best parts of consumable to make the whole toner cartridge. We test each other cartridge before delivery to make sur quality."}
          </p>
          <A href="/products">
            <button class="lg:w-40 w-32 btn lg:btn-md btn-sm shadow-sm rounded-full bg-action/10 text-action hover:text-action hover:border-action hover:bg-action/10">
              Shop Now
            </button>
          </A>
        </div>
        <div>
          <img
            src="/images/promotes/promote.png"
            class="w-full rounded-lg md:grid hidden"
            alt={name()}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
