import { A } from "@solidjs/router";
import { read } from "~/utils/theme";

const Hero = () => {
  const name = read("name");
  return (
    <div class="hero min-h-[50vh] bg-primary-1/5">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <img
          src="/images/promotes/promote.png"
          class="max-w-sm rounded-lg"
          alt=""
        />
        <div>
          <h1 class="text-5xl font-bold">
            Welcome to <label class="text-primary">{name()}</label>!
          </h1>
          <p class="py-6 text-primary-1/80">
            We Choose the best parts of consumable to make the whole toner
            cartridge. We test each other cartridge before delivery to make sure
            quality.
          </p>
          <A href="/products">
            <button class="w-40 btn border-none rounded-full bg-action/10 text-action hover:text-action hover:border-action hover:bg-action/10">
              Products
            </button>
          </A>
        </div>
      </div>
    </div>
  );
};

export default Hero;
