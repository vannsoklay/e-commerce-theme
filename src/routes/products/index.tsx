import { useSearchParams } from "solid-start";
import { For, Show, createEffect, createMemo, createSignal } from "solid-js";

import { CardProduct } from "~/components/Cards";
import { Filter } from "~/components/Filter";
// import Hero from "~/components/Hero";
import { MeteTag } from "~/components/meta";
import { PRODUCTS } from "~/libs/graphql/product";
import { RiFinanceShoppingBasketLine } from "solid-icons/ri";
import { createPagination } from "@solid-primitives/pagination";
import { publicQuery } from "~/libs/client";
import { ProductType } from "~/types/product";

export default function Product() {
  return (
    <section>
      <MeteTag name="products" />
      {/* <div class="md:block hidden">
        <Hero />
      </div> */}

      <div class="container mx-auto">
        <Filter>
          <Products />
        </Filter>
      </div>
    </section>
  );
}

const Products = () => {
  const [ps] = useSearchParams();
  const [paginationProps] = createPagination({ pages: 100 });
  const [pageSize, setPageSize] = createSignal<{ skip: number; size: number }>({
    skip: 0,
    size: 10,
  });

  const [products] = publicQuery(PRODUCTS, () => ({
    keyword: ps.search ? ps.search : "",
    id: ps.tag ? [ps.tag] : [],
    filter: {
      skip: ps.page
        ? parseInt(ps.page) > 1
          ? parseInt(ps.page) * parseInt(ps.size)
          : 0
        : pageSize().skip,
      limit: ps.size ? parseInt(ps.size) : pageSize().size,
      sort: -1,
    },
  }));

  return (
    <div class="mx-auto container space-y-8">
      <div class="grid md:grid-cols-4 grid-cols-2 gap-3 pt-3">
        <Show
          when={products()?.storeFilterSearchProducts}
          fallback={<div>Not Founded</div>}
        >
          <Show
            when={products()?.storeFilterSearchProducts.length > 0}
            fallback={
              <div class="col-span-3 w-full text-center pt-8">
                <div class="flex justify-center text-center text-2xl items-center">
                  <img alt="no product" src="/images/shop.png" class="w-72" />
                </div>
                <div class="leading-none font-semibold text-gray-400">
                  No Products
                </div>
              </div>
            }
          >
            <For
              each={products()?.storeFilterSearchProducts?.sort(
                (a: ProductType, b: ProductType) => (a.brand > b.brand ? 1 : -1)
              )}
            >
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
