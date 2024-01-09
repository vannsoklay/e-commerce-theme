import { For, Show, createSignal } from "solid-js";
import { CardProduct } from "~/components/Cards";
import Hero from "~/components/Hero";
import { publicQuery } from "~/libs/client";
import { PRODUCTS } from "~/libs/graphql/product";
import { RiFinanceShoppingBasketLine } from "solid-icons/ri";
import { Filter } from "~/components/Filter";
import { MeteTag } from "~/components/meta";
import { A, useSearchParams } from "solid-start";
import { createPagination } from "@solid-primitives/pagination";

export default function Product() {
  return (
    <section>
      <MeteTag name="products" />
      <div class="md:block hidden">
        <Hero />
      </div>
      <div class="container mx-auto pt-0 md:pt-4 md:px-32 grid grid-cols-5 gap-3">
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
    <div class="mx-auto max-w-screen-xl space-y-8">
      <div class="grid md:grid-cols-3 grid-cols-1 gap-3 pt-8">
        <Show
          when={products()?.storeFilterSearchProducts}
          fallback={<div>Not Founded</div>}
        >
          <Show
            when={products()?.storeFilterSearchProducts.length > 0}
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
            <For each={products()?.storeFilterSearchProducts}>
              {(latestProduct) => {
                return <CardProduct product={latestProduct} />;
              }}
            </For>
          </Show>
        </Show>
      </div>
      <nav class="pagination">
        <ul>
          <For each={paginationProps()}>
            {(props) => (
              <A
                href={`/products?page=${props.page}&size=${pageSize().size}`}
                class="join-item btn btn-outline"
                {...props}
              />
            )}
          </For>
        </ul>
      </nav>
    </div>
  );
};
