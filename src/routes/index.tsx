import { For, Show } from "solid-js";
import { A } from "solid-start";
import { CardProduct } from "~/components/Cards";
import Hero from "~/components/Hero";
import { publicQuery } from "~/libs/client";
import { GET_ALL_PRODUCTS } from "~/libs/graphql/product";
import { RiFinanceShoppingBasketLine } from "solid-icons/ri";

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
      <h1 class="text-center text-primary-1/80 font-extrabold md:text-3xl text-md uppercase">
        Latest Products
      </h1>
      <p class="text-center text-primary-1/50 md:text-md text-xs font-semibold uppercase">
        Out new products
      </p>
      <A
        href="/products"
        class="text-gray-500 text-xs font-bold hover:text-primary md:w-full flex md:justify-end justify-center md:mt-12 mt-4"
      >
        Show More
      </A>
      <div class="grid sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-3 md:pt-8 pt-8 md:px-0 px-6 pb-9 sm:pb-0">
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
    </div>
  );
};
