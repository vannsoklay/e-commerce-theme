import { Component, For, Show, createEffect } from "solid-js";
import { A } from "solid-start";
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
      <Hero />
      <div class="container mx-auto pt-0 md:pt-4 md:px-32 grid grid-cols-5 gap-16">
        <div class="col-span-1">
          <Filter />
        </div>
        <div class="col-span-4">
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
      <div class="grid md:grid-cols-3 grid-cols-1 gap-16 pt-8">
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

const Banner: Component = () => {
  return (
    <main>
      <div class="hidden md:flex justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-4">
        <div class="rounded-2xl flex flex-col md:flex-row justify-between bg-gray-50 py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12">
          <div class="flex flex-col justify-center md:w-1/2">
            <h1 class="text-3xl lg:text-4xl font-semibold text-gray-800">
              Best Deal
            </h1>
            <p class="text-base lg:text-xl text-gray-800 mt-2">
              Save upto <span class="font-bold">50%</span>
            </p>
          </div>
          <div class="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
            <img src="./images/products/product-2.png" alt="" class="w-1/2" />
          </div>
        </div>
        <div class="rounded-2xl md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-50 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center">
          <div class="flex flex-col justify-center">
            <h1 class="text-3xl lg:text-4xl font-semibold text-gray-800">
              RIBBON
            </h1>
            <p class="text-base lg:text-xl text-gray-800">
              Save Upto <span class="font-bold">30%</span>
            </p>
          </div>
          <div class="flex justify-end lg:bottom-0 lg:right-0">
            <img src="./images/products/product-2.png" alt="" class="w-1/2" />
          </div>
        </div>
      </div>

      <div class="block md:hidden relative -z-50">
        <div id="default-carousel" class="w-full">
          <div class="relative h-[180px] overflow-hidden rounded-lg">
            <div class="hidden duration-700 ease-in-out">
              <img
                src="./images/thumbnails/thumbnail-1.png"
                alt=""
                class="w-full object-contain"
              />
            </div>

            <div class="hidden duration-700 ease-in-out">
              <img
                src="./images/thumbnails/thumbnail-2.png"
                alt=""
                class="w-full object-contain"
              />
            </div>

            <div class="hidden duration-700 ease-in-out">
              <img
                src="./images/thumbnails/thumbnail-3.png"
                alt=""
                class="w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
