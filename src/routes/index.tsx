import { For, Show } from "solid-js";
import { A, useNavigate, useSearchParams } from "solid-start";
import { CardProduct } from "~/components/Cards";
import { GET_ALL_PRODUCTS } from "~/libs/graphql/product";
import Hero from "~/components/Hero";
import { ProductType } from "~/types/product";
import { RiFinanceShoppingBasketLine } from "solid-icons/ri";
import Team from "~/components/Team";
import { publicQuery } from "~/libs/client";
import { CATEGORIES } from "~/libs/graphql/category";
import Footer from "~/components/layout/Footer";

export default function Home() {
  return (
    <div>
      <section class="bg-gradient-to-r from-primary/10">
        <Hero />
      </section>
      <section id="products" class="pt-8">
        <LatestProducts />
      </section>
    </div>
  );
}

export const LatestProducts = () => {
  const navigate = useNavigate();
  const [ps] = useSearchParams();

  const [storeOwnerCategories] = publicQuery(CATEGORIES, {
    filter: {
      limit: 8,
      skip: 0,
      sort: -1,
    },
  });

  const [products] = publicQuery(GET_ALL_PRODUCTS, {
    filter: {
      limit: 10,
      skip: 0,
      sort: -1,
    },
  });

  return (
    <div class="container mx-auto">
      <h1 class="text-primary font-extrabold md:text-4xl text-lg text-center md:py-12 py-8">
        CHECK THE CORE PRODUCT
      </h1>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 px-2 border border-base-100">
        <Show when={products()} fallback={<div>loading...</div>}>
          <Show
            when={products()?.storeProducts.length > 0}
            fallback={
              <div class="md:col-span-3 lg:col-span-5 col-span-1 w-full text-center pt-8">
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
            <For
              each={products()?.storeProducts?.sort(
                (a: ProductType, b: ProductType) => (a.brand > b.brand ? 1 : -1)
              )}
            >
              {(latestProduct: ProductType) => {
                return <CardProduct product={latestProduct} />;
              }}
            </For>
          </Show>
        </Show>
      </div>

      {products()?.storeProducts.length >= 10 && (
        <div class="flex justify-center mt-8">
          <A href="/products">
            <button class="px-8 py-2 rounded-box text-white transition-all hover:text-accent hover:border-accent shadow-none">
              Show All
            </button>
          </A>
        </div>
      )}

      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 px-2"></div>

      <Show
        when={storeOwnerCategories()?.storeOwnerCategories.length > 0}
        fallback={null}
      >
        <div class="font-extrabold md:text-3xl text-center md:py-12 pb-4 mt-2 lg:mt-20">
          <div class="text-primary text-lg">CHOOSE CATEGORY</div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 px-4">
          <For each={storeOwnerCategories()?.storeOwnerCategories}>
            {(cat) => (
              <A href={`/products?search=&category=${cat.id}`}>
                <div class="bg-primary/10 backdrop-blur-lg flex justify-center items-center px-8 py-6 font-bold rounded-box hover:border-primary transition-all hover:shadow-md hover:text-primary">
                  {cat.title.en}
                </div>
              </A>
            )}
          </For>
        </div>
      </Show>
      <Team />
    </div>
  );
};
