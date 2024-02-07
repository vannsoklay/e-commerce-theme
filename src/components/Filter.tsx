import { A, useNavigate, useSearchParams, useLocation } from "solid-start";
import { For, Show, createSignal } from "solid-js";
import { TAGS } from "~/libs/graphql/tag";
import { publicQuery } from "~/libs/client";
import { BRANDS } from "~/libs/graphql/brands";

export const Filter = ({ children }: any) => {
  const [ps] = useSearchParams();
  const navigate = useNavigate();
  const [value, setValue] = createSignal("");
  const [tags] = publicQuery(TAGS);
  const location = useLocation();
  const [category] = publicQuery(BRANDS);

  console.log("category", category()?.categories);

  return (
    // <div class="mt-8">
    //   <input
    //     type="text"
    //     onInput={(e) => {
    //       setValue(e.target.value),
    //         navigate(
    //           `/products?search=${value() ? value() : ""}&tag=${
    //             ps.tag ? ps.tag : ""
    //           }`
    //         );
    //     }}
    //     placeholder="Search"
    //     class="input input-bordered w-full max-w-xs"
    //   />
    //   <div class="py-2 rounded-box mt-5 bg-gray-50 ">
    //     <h5 class="inline-flex items-center text-xl font-semibold mb-2 pl-4 ">
    //       Filters
    //     </h5>
    //     <div>
    //       <ul class="w-full relative bg-red text-sm text-base-content/60">
    //         <Show
    //           when={tags()?.storeOwnerTags}
    //           fallback={<div>loading...</div>}
    //         >
    //           <For
    //             each={tags().storeOwnerTags}
    //             fallback={<div>Not founded</div>}
    //           >
    //             {(tag) => {
    //               return (
    //                 <li class="transition-all mt-0 w-full block px-2">
    //                   <A
    //                     classList={{
    //                       "font-medium bg-primary text-white rounded rounded-xl transform active:scale-75 transition-transform":
    //                         tag.id === ps.tag,
    //                     }}
    //                     class="w-full block py-2 px-3"
    //                     href={`/products?search=${
    //                       ps.search ? ps.search : ""
    //                     }&tag=${tag.id}`}
    //                   >
    //                     {tag.title.en}
    //                   </A>
    //                 </li>
    //               );
    //             }}
    //           </For>
    //         </Show>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
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
            <div class="space-y-1">
              <h6 class="text-base font-medium text-black">Brands</h6>
              <Show when={category()?.categories} fallback={null}>
                <div class="flex items-center">
                  <div class="form-control">
                    <label class="label cursor-pointer space-x-2">
                      <input
                        name="brand"
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
                <For each={category()?.categories}>
                  {(brand) => {
                    return (
                      // <button class="btn btn-sm btn-outline btn-primary w-auto">
                      //   {brand?.title?.en}
                      // </button>
                      <div class="flex items-center">
                        <label class="label cursor-pointer space-x-2">
                          <input
                            name="brand"
                            type="radio"
                            // checked={tag.id === ps.tag}
                            class="radio radio-primary radio-sm"
                            // onChange={(e) => {
                            //   e.preventDefault();
                            //   navigate(
                            //     `?search=${ps.search ? ps.search : ""}&tag=${
                            //       tag.id
                            //     }`
                            //   );
                            // }}
                          />
                          <span class="label-text">{brand?.title?.en}</span>
                        </label>
                      </div>
                    );
                  }}
                </For>
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

            <div class="space-y-2">
              <h6 class="text-base font-medium ">Prices</h6>
              <input
                type="range"
                min={0}
                max="100"
                class="range range-primary range-xs"
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
                    min="1"
                    max="10000"
                    placeholder="0"
                    id="price-from"
                  />
                </div>

                <div class="w-full">
                  <label for="price-to" class="block mb-2 text-sm font-medium ">
                    To
                  </label>
                  <input
                    type="number"
                    class="input input-md input-bordered w-full max-w-xs"
                    min="1"
                    max="10000"
                    placeholder="1"
                    id="max-experience-input"
                  />
                </div>
              </div>
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
            <select class="select select-md select-bordered w-full max-w-xs">
              <option selected>Most Popular</option>
              <option>Newest</option>
              <option>Low to High</option>
              <option>High to Low </option>
            </select>
          </div>
        </nav>
        <section>{children}</section>
      </div>
    </section>
  );
};
