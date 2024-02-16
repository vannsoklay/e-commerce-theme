import { For, Show, createSignal } from "solid-js";
import { GLOBAL_PRODUCT_FILTERING } from "~/libs/graphql/product";
import { publicQuery } from "~/libs/client";
import { ProductType } from "~/types/product";
import { useNavigate, useSearchParams } from "solid-start";
import { formatToUSD } from "~/utils/usd";
import { CATEGORIES } from "~/libs/graphql/category";

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

const Search = () => {
  const navigate = useNavigate();
  const [ps] = useSearchParams();
  const [value, setValue] = createSignal("");

  const [filtering, setFiltering] = createSignal<ProductFilter>({
    id: null,
    keyword: null,
    status: null,
    filter: null,
    range: null,
  });

  const [storeOwnerCategories] = publicQuery(CATEGORIES);

  const [storeGlobalFilterProducts] = publicQuery(
    GLOBAL_PRODUCT_FILTERING,
    () => ({
      tagId: ps.tag ? [ps.tag] : ps.search ? [] : null,
      keyword: ps.search ? ps.search : filtering().keyword,
      status: filtering().status === "price" ? "price" : null,
      range: filtering().range,
      filter: {
        skip: 0,
        limit: 10,
        sort: filtering().filter?.sort,
      },
    })
  );

  const mostPopularSort = () =>
    storeGlobalFilterProducts()?.storeGlobalFilterProducts?.sort(
      (a: ProductType, b: ProductType) => (a.sell > b.sell ? -1 : 1)
    );

  const limitCats = () =>
    storeOwnerCategories()?.storeOwnerCategories?.slice(0, 10);

  return (
    <div class="container mx-auto p-3">
      <div class="flex gap-2 items-center">
        <input
          type="search"
          name="search"
          placeholder="Find your products here ..."
          class="input input-primary border-1 w-full rounded-2xl"
          autocomplete="on"
          spellcheck={false}
          aria-autocomplete="list"
          aria-controls="typeahead-0.nrh5wc1w7r-listbox"
          aria-labelledby="typeahead-0.nrh5wc1w7r-label"
          onChange={(e) => {
            e.preventDefault();
            setValue(e.target.value),
              navigate(`/products?search=${value() ? value() : ""}&tag=`);
          }}
          required
        />
        <button class="btn btn-primary rounded-2xl" type="submit">
          Search
        </button>
      </div>
      <Show when={storeOwnerCategories()?.storeOwnerCategories} fallback={null}>
        <p class="text-lg font-semibold mt-3">Popular Search</p>
        <div class="mt-3 flex flex-wrap gap-2">
          <For each={limitCats()} fallback={null}>
            {(cat) => {
              return (
                <button
                  class="btn btn-sm btn-outline btn-primary w-auto font-medium rounded-xl"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(
                      `/products?search=${
                        ps.search ? ps.search : ""
                      }&category=${cat.id}`
                    );
                  }}
                >
                  {cat.title.en}
                </button>
              );
            }}
          </For>
        </div>
      </Show>
      <Show when={mostPopularSort()?.length > 0}>
        <p class="text-lg font-semibold mt-6 mb-2">Trending Now</p>
        <div class="grid grid-cols-2 gap-2">
          <For each={mostPopularSort()?.slice(0, 10)}>
            {(product: ProductType) => (
              <div class="h-full backdrop-blur-lg bg-gray-50 transition-all hover:shadow-md rounded-box">
                <div
                  onClick={() => {
                    navigate(`/products/${product?.slug}`);
                  }}
                  data-aos="zoom-out-down"
                >
                  <div class=" cursor-pointer relative w-full  rounded-lg">
                    <figure>
                      <div class="flex items-center justify-center bg-contain bg-center bg-repeat p-2">
                        <img
                          class=" w-full h-32 p-5 bg-repeat-round rounded-2xl mx-auto object-contain bg-white"
                          src={`${
                            import.meta.env.VITE_VARIABLE_IPFS
                          }/api/ipfs?hash=${product?.thumbnail}`}
                          alt="product image"
                        />
                      </div>
                    </figure>
                    <div class="p-3">
                      <div class="text-[12px] text-primary">
                        {product.brand}
                      </div>
                      <div class="text-base font-medium  mb-4 lg:h-12 h-auto">
                        {product.title.length <= 40
                          ? product.title
                          : product.title.slice(0, 40) + "..."}
                      </div>
                      <div class="card-accents flex items-center justify-between">
                        <span class="text-primary lg:text-xl text-sm font-bold">
                          {formatToUSD(parseInt(product.price.toString()))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
};

export default Search;
