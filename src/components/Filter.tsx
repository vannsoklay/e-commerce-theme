import { useNavigate, useSearchParams } from "solid-start";
import { Component, For, Show, createSignal } from "solid-js";
import { publicQuery } from "~/libs/client";
import { BRANDS } from "~/libs/graphql/brands";
import { RiSystemFilter2Fill } from "solid-icons/ri";
import { CATEGORIES, SUB_CATEGORY_BY_ID } from "~/libs/graphql/category";
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
  const [storeOwnerBrands] = publicQuery(BRANDS);
  const [storeOwnerCategories] = publicQuery(CATEGORIES);
  const [storeOwnerSubcategories] = publicQuery(SUB_CATEGORY_BY_ID, () => ({
    parentId: ps.category || "",
  }));

  return (
    <section class="grid col-span-5 sm:grid-cols-5 lg:col-span-1">
      <form
        action="#"
        method="get"
        class="w-full h-screen max-w-xs p-4 overflow-y-auto col-span-1 hide-scroll-bar hidden sm:hidden lg:block"
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
            {/* <div class="space-y-2">
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
            </div> */}
            <div class="join join-vertical w-full">
              <h6 class="text-base font-medium text-black mb-4">Categories</h6>
              <div class="collapse join-item border border-base-300">
                <input
                  type="radio"
                  name="my-accordion-4"
                  onChange={(e) => {
                    e.preventDefault();
                    navigate(`/products`);
                  }}
                />
                <div class="collapse-title text-md">All</div>
              </div>
              <For each={storeOwnerCategories()?.storeOwnerCategories}>
                {(cat) => (
                  <div class="collapse collapse-arrow join-item border border-base-300">
                    <input
                      type="radio"
                      name="my-accordion-4"
                      onChange={(e) => {
                        e.preventDefault();
                        navigate(
                          `?search=${ps.search ? ps.search : ""}&category=${
                            cat.id
                          }`
                        );
                      }}
                      checked={ps.category === cat.id ? true : false}
                    />
                    <div class="collapse-title text-md">
                      {cat.title.en.length <= 24
                        ? cat.title.en
                        : cat.title.en.slice(0, 21) + "..."}
                    </div>
                    <div class="collapse-content">
                      <Show
                        when={!storeOwnerCategories.loading}
                        fallback={null}
                      >
                        <Show
                          when={
                            storeOwnerSubcategories().storeOwnerSubcategories
                              .length > 0
                          }
                          fallback={<div class="text-sm">Empty</div>}
                        >
                          <ul tabindex="1" class="dropdown-content menu w-full">
                            <For
                              each={
                                storeOwnerSubcategories()
                                  .storeOwnerSubcategories
                              }
                              fallback={null}
                            >
                              {(sub) => (
                                <div
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate(
                                      `?search=${
                                        ps.search ? ps.search : ""
                                      }&category=${cat.id}&sub_category=${
                                        sub.id
                                      }`
                                    );
                                  }}
                                  class={
                                    sub.id === ps.sub_category
                                      ? "bg-primary text-base-100 rounded-md"
                                      : ""
                                  }
                                >
                                  <li>
                                    <a>{sub.title.en}</a>
                                  </li>
                                </div>
                              )}
                            </For>
                          </ul>
                        </Show>
                      </Show>
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </form>
      <div class="col-span-4 sm:col-span-1 lg:col-span-4 mt-3 px-3 sm:px-3 lg:px-0">
        <nav class="hidden items-center justify-between sm:hidden lg:flex">
          <input
            type="text"
            onInput={(e) => {
              e.preventDefault();
              setValue(e.target.value),
                navigate(
                  `/products?search=${value() ? value() : ""}&tag=${
                    ps.tag ? ps.tag : ""
                  }`
                );
            }}
            placeholder="Search products ..."
            class="input input-bordered rounded-2xl w-full max-w-xs"
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
                    filter: { sort: 1 },
                  });
                  return;
                } else {
                  setFiltering({
                    ...filtering,
                    status: "price",
                    filter: { sort: -1 },
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

        <div class="drawer">
          <input id="my-drawer" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content flex sm:flex lg:hidden justify-end">
            <label for="my-drawer" class="btn btn-primary btn-sm drawer-button">
              <RiSystemFilter2Fill size={18} />
              Filter
            </label>
          </div>
          <div class="drawer-side z-50">
            <label
              for="my-drawer"
              aria-label="close sidebar"
              class="drawer-overlay"
            ></label>
            <div class=" p-4 w-80 min-h-full bg-base-100 ">
              <form
                action="#"
                method="get"
                class="w-full h-screen max-w-xs py-4 overflow-y-auto col-span-1 hide-scroll-bar"
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
                    {/* <div class="space-y-2">
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
                          <label
                            for="price-to"
                            class="block mb-2 text-sm font-medium "
                          >
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
                    </div> */}

                    {/*  categories */}
                    <div class="join join-vertical w-full pb-28 sm:pb-28 lg:pb-0">
                      <div class="collapse collapse-arrow join-item border border-base-300">
                        <input
                          type="radio"
                          name="my-accordion-4"
                          onChange={(e) => {
                            e.preventDefault();
                            navigate(`/products`);
                          }}
                        />
                        <div class="collapse-title text-md font-medium">
                          All
                        </div>
                      </div>
                      <For each={storeOwnerCategories()?.storeOwnerCategories}>
                        {(cat) => (
                          <div class="collapse collapse-arrow join-item border border-base-300">
                            <input
                              type="radio"
                              name="my-accordion-4"
                              onChange={(e) => {
                                e.preventDefault();
                                navigate(
                                  `?search=${ps.search && ps.search}&category=${
                                    cat.id
                                  }`
                                );
                              }}
                            />
                            <div class="collapse-title text-md">
                              {cat.title.en.length <= 24
                                ? cat.title.en
                                : cat.title.en.slice(0, 21) + "..."}
                            </div>
                            <div class="collapse-content">
                              <Show
                                when={!storeOwnerCategories.loading}
                                fallback={null}
                              >
                                <Show
                                  when={
                                    storeOwnerSubcategories()
                                      .storeOwnerSubcategories.length > 0
                                  }
                                  fallback={<div class="text-sm">Empty</div>}
                                >
                                  <ul
                                    tabindex="1"
                                    class="dropdown-content menu w-full"
                                  >
                                    <For
                                      each={
                                        storeOwnerSubcategories()
                                          .storeOwnerSubcategories
                                      }
                                      fallback={null}
                                    >
                                      {(sub) => (
                                        <div
                                          onClick={(e) => {
                                            e.preventDefault();
                                            navigate(
                                              `?search=${
                                                ps.search ? ps.search : ""
                                              }&category=${
                                                cat.id
                                              }&sub_category=${sub.id}`
                                            );
                                          }}
                                          class={
                                            sub.id === ps.sub_category
                                              ? "bg-primary text-base-100 rounded-md"
                                              : ""
                                          }
                                        >
                                          <li>
                                            <a>{sub.title.en}</a>
                                          </li>
                                        </div>
                                      )}
                                    </For>
                                  </ul>
                                </Show>
                              </Show>
                            </div>
                          </div>
                        )}
                      </For>
                    </div>

                    {/* <Show
                      when={
                        storeOwnerCategories()?.storeOwnerCategories.length > 0
                      }
                      fallback={null}
                    >
                      <div class="space-y-1">
                        <h6 class="text-base font-medium text-black">
                          Categories
                        </h6>

                        <div class="flex items-center">
                          <label class="label cursor-pointer space-x-2">
                            <input
                              name="category"
                              type="radio"
                              checked={ps.category === "" || !ps.category}
                              class="radio radio-primary radio-sm"
                              onChange={(e) => {
                                e.preventDefault();
                                navigate(
                                  `?search=${
                                    ps.search ? ps.search : ""
                                  }&category=`
                                );
                              }}
                            />
                            <span class="label-text">All</span>
                          </label>
                        </div>
                        <For
                          each={storeOwnerCategories()?.storeOwnerCategories}
                        >
                          {(cat) => (
                            <div class="flex items-center">
                              <label class="label cursor-pointer space-x-2">
                                <input
                                  name="category"
                                  type="radio"
                                  checked={cat.id === ps.category}
                                  class="radio radio-primary radio-sm"
                                  onChange={(e) => {
                                    e.preventDefault();
                                    navigate(
                                      `?search=${
                                        ps.search ? ps.search : ""
                                      }&category=${cat.id}`
                                    );
                                  }}
                                />
                                <span class="label-text">{cat.title.en}</span>
                              </label>
                            </div>
                          )}
                        </For>
                      </div>
                    </Show> */}

                    {/*  brands */}
                    {/* <div class="space-y-1">
                      <h6 class="text-base font-medium text-black">Brands</h6>
                      <Show
                        when={storeOwnerBrands()?.storeOwnerBrands}
                        fallback={null}
                      >
                        <div class="flex flex-wrap gap-2">
                          <button class="btn btn-sm w-auto btn-primary">
                            All
                          </button>
                          <For each={storeOwnerBrands()?.storeOwnerBrands}>
                            {(brand) => {
                              return (
                                <button class="btn btn-sm w-auto btn-outline btn-primary">
                                  {brand?.title?.en}
                                </button>
                              );
                            }}
                          </For>
                        </div>
                      </Show>
                    </div> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* <Show
          when={storeOwnerSubcategories()?.storeOwnerSubcategories.length > 0}
          fallback={null}
        >
          <section class="mt-3 flex gap-2 overflow-auto hide-scroll-bar">
            <button
              class="btn btn-sm btn-primary rounded-full"
              classList={{
                "btn-outline": ps.sub_category ? true : false,
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate(
                  `?search=${ps.search ? ps.search : ""}&category=${
                    ps.category
                  }`
                );
              }}
            >
              All
            </button>
            <For
              each={storeOwnerSubcategories()?.storeOwnerSubcategories}
              fallback={null}
            >
              {(sub) => (
                <button
                  class="btn btn-sm rounded-full"
                  classList={{
                    "btn-primary": sub.id === ps.sub_category,
                    "btn-outline btn-primary": sub.id !== ps.sub_category,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(
                      `?search=${ps.search ? ps.search : ""}&category=${
                        ps.category
                      }&sub_category=${sub.id}`
                    );
                  }}
                >
                  {sub?.title.en}
                </button>
              )}
            </For>
          </section>
        </Show> */}

        <section>{children}</section>
      </div>
    </section>
  );
};
