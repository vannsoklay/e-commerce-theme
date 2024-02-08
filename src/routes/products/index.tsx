import { useSearchParams } from "solid-start";
import {
  Component,
  For,
  Match,
  Show,
  Switch,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";

import { CardProduct } from "~/components/Cards";
import { Filter } from "~/components/Filter";
// import Hero from "~/components/Hero";
import { MeteTag } from "~/components/meta";
import { GLOBAL_PRODUCT_FILTERING, PRODUCTS } from "~/libs/graphql/product";
import { createPagination } from "@solid-primitives/pagination";
import { publicQuery } from "~/libs/client";
import { ProductType } from "~/types/product";

interface Range {
  end: number;
  start: number;
}

interface Sort {
  sort: number;
}
interface ProductFilter {
  id?: string[] | null;
  keyword?: string | null;
  status?: string | null;
  filter?: Sort | null;
  range?: Range | null;
}

export default function Product() {
  const [ps] = useSearchParams();
  const [paginationProps] = createPagination({ pages: 10 });
  const [pageSize, setPageSize] = createSignal<{ skip: number; size: number }>({
    skip: 0,
    size: 16,
  });

  const [filtering, setFiltering] = createSignal<ProductFilter>({
    id: null,
    keyword: null,
    status: null,
    filter: null,
    range: null,
  });

  const [storeGlobalFilterProducts] = publicQuery(
    GLOBAL_PRODUCT_FILTERING,
    () => ({
      tagId: ps.tag ? [ps.tag] : ps.search ? [] : null,
      keyword: ps.search ? ps.search : filtering().keyword,
      status: filtering().status === "price" ? "price" : null,
      range: filtering().range,
      filter: {
        // skip: ps.page
        //   ? parseInt(ps.page) > 1
        //     ? parseInt(ps.page) * parseInt(ps.size)
        //     : 0
        //   : pageSize().skip,
        // limit: ps.size ? parseInt(ps.size) : pageSize().size,
        sort: filtering().filter?.sort,
      },
    })
  );

  const defaultSort = () =>
    storeGlobalFilterProducts()?.storeGlobalFilterProducts?.sort(
      (a: ProductType, b: ProductType) => (a.brand > b.brand ? 1 : -1)
    );

  const mostPopularSort = () =>
    storeGlobalFilterProducts()?.storeGlobalFilterProducts?.sort(
      (a: ProductType, b: ProductType) => (a.sell > b.sell ? -1 : 1)
    );

  return (
    <section>
      <MeteTag name="products" />

      <div class="container mx-auto">
        <Switch
          fallback={
            <Filter
              children={<Products products={defaultSort()} />}
              filtering={filtering()}
              setFiltering={setFiltering}
            />
          }
        >
          <Match when={filtering().status === "mostPopular"}>
            <Filter
              children={<Products products={mostPopularSort()} />}
              filtering={filtering()}
              setFiltering={setFiltering}
            />
          </Match>
          <Match when={ps.search || ps.tag}>
            <Filter
              children={
                <Products
                  products={
                    storeGlobalFilterProducts()?.storeGlobalFilterProducts
                  }
                />
              }
              filtering={filtering()}
              setFiltering={setFiltering}
            />
          </Match>
        </Switch>
      </div>
    </section>
  );
}

const Products: Component<{ products: ProductType[] }> = (props) => {
  return (
    <div class="mx-auto container space-y-8">
      <div class="grid md:grid-cols-4 grid-cols-2 gap-3 pt-3">
        <Show
          when={props.products}
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
          <Show when={props.products.length > 0}>
            <For each={props.products}>
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
