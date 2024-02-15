import { useSearchParams } from "solid-start";
import {
  Component,
  For,
  Match,
  Show,
  Switch,
  createSignal,
} from "solid-js";
import { CardProduct } from "~/components/Cards";
import { Filter } from "~/components/Filter";
// import Hero from "~/components/Hero";
import { MeteTag } from "~/components/meta";
import { GLOBAL_PRODUCT_FILTERING } from "~/libs/graphql/product";
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
      tagId: ps.category
        ? ps.sub_category
          ? [ps.sub_category]
          : [ps.category]
        : ps.search
        ? []
        : null,
      keyword: ps.search ? ps.search : filtering().keyword,
      status: filtering().status === "price" ? "price" : null,
      range: filtering().range,
      filter: {
        skip: ps.page
          ? parseInt(ps.page) > 1
            ? parseInt(ps.page) * parseInt(ps.size)
            : 0
          : pageSize().skip,
        limit: ps.size ? parseInt(ps.size) : pageSize().size,
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
          <Match when={filtering()?.status === "mostPopular"}>
            <Filter
              children={<Products products={mostPopularSort()} />}
              filtering={filtering()}
              setFiltering={setFiltering}
            />
          </Match>
          <Match when={filtering()?.status === "price"}>
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
      <Show
        when={props.products && props.products.length > 0}
        fallback={
          <div class="w-full flex justify-center items-center text-center mx-auto min-h-[50dvh]">
            <div class="leading-none font-semibold text-gray-400">
              <img alt="" src="/images/shop.png" class="w-64" />
              <span>No Products</span>
            </div>
          </div>
        }
      >
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3">
          <For each={props.products}>
            {(latestProduct) => {
              return <CardProduct product={latestProduct} />;
            }}
          </For>
        </div>
      </Show>
    </div>
  );
};
