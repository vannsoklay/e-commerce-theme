import { useNavigate, useSearchParams, useLocation } from "solid-start";
import { Component, For, Show, createSignal } from "solid-js";
import { TAGS } from "~/libs/graphql/tag";
import { publicQuery } from "~/libs/client";
import { BRANDS } from "~/libs/graphql/brands";

interface Sort {
  sort: number;
}

interface Range {
  end: number;
  start: number;
}

interface ProductFilter {
  id?: string[] | null;
  keyword?: string | null;
  status?: string | null;
  filter?: Sort | null;
  range?: Range | null;
}

interface Filters {
  filtering: ProductFilter;
  setFiltering: Function;
  children: any;
}

export const Filter: Component<Filters> = ({
  filtering,
  setFiltering,
  children,
}) => {
  const [ps] = useSearchParams();
  const navigate = useNavigate();
  const [value, setValue] = createSignal("");

  // queries
  const [tags] = publicQuery(TAGS);
  const location = useLocation();
  const [category] = publicQuery(BRANDS);

  return (
    <section class="grid grid-cols-5">
      <form
        action="#"
        method="get"
        class="w-full h-screen max-w-xs p-4 overflow-y-auto col-span-1 hide-scroll-bar"
        tabindex="-1"
        aria-labelledby="drawer-label"
      >
        <h5
          id="drawer-label"
          class="inline-flex items-center mb-4 text-base font-semibold uppercase"
        >
          Filter
        </h5>
        <div class="flex flex-col justify-between flex-1">
          <div class="space-y-6">
            <div class="space-y-2">
              <h6 class="text-base font-medium ">Prices</h6>
              <input
                type="range"
                min={0}
                max={10000}
                value={1}
                class="range range-primary range-xs"
                onChange={(e) => {
                  setFiltering({
                    ...filtering,
                    range: {
                      start: 0,
                      end: parseInt(e.target.value),
                    },
                  });
                }}
              />
              {/* <div class="flex justify-between items-center">
                <label class="text-primary">0</label>
                <label class="text-primary">{filtering.range?.end}</label>
              </div> */}
              <div class="flex items-center justify-between col-span-2 space-x-3">
                <div class="w-full">
                  <label
                    for="min-experience-input"
                    class="block mb-2 text-sm font-medium "
                  >
                    From
                  </label>
                  <input
                    type="number"
                    class="input input-md input-bordered w-full max-w-xs"
                    min={0}
                    max={10000}
                    id="price-from"
                    value={0}
                    onChange={(e) => {
                      setFiltering({
                        ...filtering,
                        range: {
                          start: parseInt(e.target.value),
                          end: 0,
                        },
                      });
                    }}
                    disabled
                  />
                </div>

                <div class="w-full">
                  <label for="price-to" class="block mb-2 text-sm font-medium ">
                    To
                  </label>
                  <input
                    type="number"
                    class="input input-md input-bordered w-full max-w-xs"
                    min={1}
                    max={10000}
                    value={1}
                    onChange={(e) => {
                      setFiltering({
                        ...filtering,
                        range: {
                          start: 0,
                          end: parseInt(e.target.value),
                        },
                      });
                    }}
                    id="max-experience-input"
                  />
                </div>
              </div>
            </div>

            <div class="space-y-1">
              <h6 class="text-base font-medium text-black">Brands</h6>
              <Show when={category()?.categories} fallback={null}>
                <div class="flex flex-wrap gap-2">
                  <button class="btn btn-sm w-auto btn-primary">All</button>
                  <For each={category()?.categories}>
                    {(brand) => {
                      return (
                        // <div class="flex items-center">
                        //   <label class="label cursor-pointer space-x-2">
                        //     <input
                        //       name="brand"
                        //       type="radio"
                        //       // checked={tag.id === ps.tag}
                        //       class="radio radio-primary radio-sm"
                        //       // onChange={(e) => {
                        //       //   e.preventDefault();
                        //       //   navigate(
                        //       //     `?search=${ps.search ? ps.search : ""}&tag=${
                        //       //       tag.id
                        //       //     }`
                        //       //   );
                        //       // }}
                        //     />
                        //     <span class="label-text">{brand?.title?.en}</span>
                        //   </label>
                        // </div>
                        <button class="btn btn-sm w-auto btn-outline btn-primary">
                          {brand?.title?.en}
                        </button>
                      );
                    }}
                  </For>
                </div>
              </Show>
            </div>
            <div class="space-y-1">
              <h6 class="text-base font-medium text-black">Categories</h6>

              <Show
                when={tags()?.storeOwnerTags}
                fallback={<div>loading...</div>}
              >
                <div class="flex items-center">
                  <div class="form-control">
                    <label class="label cursor-pointer space-x-2">
                      <input
                        name="category"
                        type="radio"
                        checked={location.pathname === "/products"}
                        class="radio radio-primary radio-sm"
                        onChange={(e) => {
                          e.preventDefault();
                          navigate(`/products`);
                        }}
                      />
                      <span class="label-text">All</span>
                    </label>
                  </div>
                </div>
                <div class="form-control">
                  <For
                    each={tags().storeOwnerTags}
                    fallback={<div>Not founded</div>}
                  >
                    {(tag) => {
                      return (
                        <div class="flex items-center">
                          <label class="label cursor-pointer space-x-2">
                            <input
                              name="category"
                              type="radio"
                              checked={tag.id === ps.tag}
                              class="radio radio-primary radio-sm"
                              onChange={(e) => {
                                e.preventDefault();
                                navigate(
                                  `?search=${ps.search ? ps.search : ""}&tag=${
                                    tag.id
                                  }`
                                );
                              }}
                            />
                            <span class="label-text">{tag.title.en}</span>
                          </label>
                        </div>
                      );
                    }}
                  </For>
                </div>
              </Show>
            </div>
          </div>
        </div>
      </form>
      <div class="col-span-4 mt-3">
        <nav class="flex items-center justify-between">
          <input
            type="text"
            onInput={(e) => {
              setValue(e.target.value),
                navigate(
                  `/products?search=${value() ? value() : ""}&tag=${
                    ps.tag ? ps.tag : ""
                  }`
                );
            }}
            placeholder="Search products ..."
            class="input input-bordered w-full max-w-xs"
          />
          <div class="flex items-center gap-3">
            <label class="w-32">Sort by</label>
            <select
              class="select select-md select-bordered w-full max-w-xs"
              onChange={(e) => {
                e.preventDefault();

                if (e.target.value === "Most Popular") {
                  setFiltering({
                    ...filtering,
                    status: "mostPopular",
                  });
                  return;
                }
                if (e.target.value === "Newest") {
                  setFiltering({
                    ...filtering,
                    status: null,
                    filter: { sort: -1 },
                  });
                  return;
                }
                if (e.target.value === "Low to High") {
                  setFiltering({
                    ...filtering,
                    status: "price",
                    filter: { sort: -1 },
                  });
                  return;
                } else {
                  setFiltering({
                    ...filtering,
                    status: "price",
                    filter: { sort: 1 },
                  });
                  return;
                }
              }}
            >
              <option value="All">All</option>
              <option value="Most Popular">Most Popular</option>
              <option value="Newest">Newest</option>
              <option value="Low to High">Low to High</option>
              <option value="High to Low">High to Low </option>
            </select>
          </div>
        </nav>
        <section>{children}</section>
      </div>
    </section>
  );
};
