import { Component, For, Show } from "solid-js";
import { CardProduct } from "~/components/Cards";
import Hero from "~/components/Hero";
import { publicQuery } from "~/libs/client";
import { GET_ALL_PRODUCTS } from "~/libs/graphql/product";
import { RiFinanceShoppingBasketLine } from "solid-icons/ri";
import { Filter } from "~/components/Filter";
import { MeteTag } from "~/components/meta";

export default function Product() {
  return (
    <section>
      <MeteTag name="products" />
      <div class="md:block hidden">
        <Hero />
      </div>
      <div class="container mx-auto pt-0 md:pt-4 md:px-0 grid grid-cols-5 gap-3">
        {/* display responsive mobile */}
        <div class="md:col-span-1 md:block hidden">
          <Filter />
        </div>
        <div class="md:col-span-4 col-span-5 md:px-0 px-4">
          <Products />
        </div>
      </div>
    </section>
  );
}

const Products = () => {
  const [products] = publicQuery(GET_ALL_PRODUCTS, {
    filter: {
      limit: 8,
      skip: 0,
      sort: -1,
    },
  });

  return (
    <div class="mx-auto max-w-screen-xl">
      <div class="grid md:grid-cols-3 grid-cols-1 gap-3 pt-8">
        <Show when={products()} fallback={<div>loading...</div>}>
          <Show
            when={products().storeProducts.length > 0}
            fallback={
              <div class="col-span-3 w-full text-center pt-8">
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
