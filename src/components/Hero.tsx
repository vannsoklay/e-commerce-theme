import { A } from "@solidjs/router";
import { read } from "~/utils/theme";

const Hero = () => {
  const name = read("name");
  const promotion = read("promotion");

  return (
    <div class="hero xl:min-h-[50vh] lg:min-h-[30vh] min-h-[20vh] bg-primary-1/5 md:py-0 md:px-12 xl:px-0 py-8 px-8">
      <div class="hero-content flex-col md:flex-row-reverse">
        <img
          src="/images/promotes/promote.png"
          class="lg:h-80 h-32 rounded-lg md:grid hidden"
          alt=""
        />
        <div>
          <h1 class="lg:text-5xl text-lg font-bold">
            Welcome to <label class="text-primary">{name()}</label>!
          </h1>
          <p class="lg:py-6 py-4 lg:text-xl text-sm text-primary-1/80">
            {promotion()?.quote ? promotion()?.quote : "We Choose the best parts of consumable to make the whole toner cartridge. We test each other cartridge before delivery to make sur quality."}
          </p>
          <A href="/products">
            <button class="lg:w-40 lg:h-10 w-32 h-12 btn lg:btn-lg btn-sm border-none rounded-full bg-action/10 text-action hover:text-action hover:border-action hover:bg-action/10">
              Products
            </button>
          </A>
        </div>
      </div>
    </div>
  );
};

export default Hero;
