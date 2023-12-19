import { Component, For, Show, createEffect } from "solid-js";
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
    <div class="mx-auto max-w-screen-xl">
      <h1 class="text-center text-primary-1/80 font-extrabold md:text-3xl uppercase">
        Latest Products
      </h1>
      <p class="text-center text-primary-1/50 text-md font-semibold uppercase">
        Out new products
      </p>
      <div class="float-right py-3 flex space-x-1 items-center">
        <A
          href="/products"
          class="text-gray-500 text-xs font-bold hover:text-primary"
        >
          Show More
        </A>
        <img class="w-auto h-3.5" src="/images/right-arrow.png" alt="" />
      </div>
      <div class="grid md:grid-cols-4 grid-cols-1 gap-3 pt-16 justify-center items-center mx-auto">
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
