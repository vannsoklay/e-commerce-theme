import { For, Show } from "solid-js";

import { A } from "solid-start";
import { CardProduct } from "~/components/Cards";
import { GET_ALL_PRODUCTS } from "~/libs/graphql/product";
import Hero from "~/components/Hero";
import { RiFinanceShoppingBasketLine } from "solid-icons/ri";
import { publicQuery } from "~/libs/client";

export default function Home() {
  return (
    <div>
      <section id="hero">
        <Hero />
      </section>
      <section id="products" class="pt-8">
        <LatestProducts />
      </section>
    </div>
  );
}

export const LatestProducts = () => {
  const [products] = publicQuery(GET_ALL_PRODUCTS, {
    filter: {
      limit: 8,
      skip: 0,
      sort: -1,
    },
  });

  return (
    <div class="mx-auto max-w-screen-xl md:px-12 xl:px-0">
      <h1 class="text-center text-primary-1/80 font-extrabold md:text-5xl text-md ">
        Our Products
      </h1>
      {/* <p class="text-center text-primary-1/50 md:text-md text-xs font-semibold ">
        Out new products
      </p> */}

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:pt-8 pt-8 md:px-0 px-6 pb-9 sm:pb-0">
        <Show when={products()} fallback={<div>loading...</div>}>
          <Show
            when={products().storeProducts.length > 0}
            fallback={
              <div class="col-span-4 w-full text-center pt-8">
                <div class="flex justify-center text-center text-2xl items-center">
                  <RiFinanceShoppingBasketLine
                    size={120}
                    class="text-gray-300"
                  />
                </div>
                <div class="leading-none font-semibold text-gray-400">
                  No Products
                </div>
              </div>
            }
          >
            <For each={products().storeProducts}>
              {(latestProduct) => {
                return <CardProduct product={latestProduct} />;
              }}
            </For>
          </Show>
        </Show>
      </div>
      {products().storeProducts.length >= 10 && (
        <div class="flex justify-center mt-8">
          <A href="/products">
            <button class="px-8 py-2 rounded-full bg-action text-white transition-all hover:text-action hover:border-action hover:bg-action/10 shadow-none">
              Show All
            </button>
          </A>
        </div>
      )}
    </div>
  );
};
