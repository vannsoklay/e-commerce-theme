import { A, useNavigate, useSearchParams } from "solid-start";
import { For, Show, createEffect, createSignal } from "solid-js";
import { TAGS } from "~/libs/graphql/tag";
import { publicQuery } from "~/libs/client";

export const Filter = () => {
  const [ps] = useSearchParams();
  const navigate = useNavigate();
  const [value, setValue] = createSignal("");
  const [tags] = publicQuery(TAGS);

  // createEffect(() => {
  //   console.log("tag", tags());
  // });
  return (
    <div class="mt-8">
      <input
        class="input bg-gray-50 w-full"
        onInput={(e) => {
          setValue(e.target.value),
            navigate(
              `/products?search=${value() ? value() : ""}&tag=${
                ps.tag ? ps.tag : ""
              }`
            );
        }}
        type="text"
        placeholder="Search"
      />
      <div class="py-2 rounded-box mt-5 bg-gray-50 ">
        <h5 class="inline-flex items-center text-xl font-semibold mb-2 pl-4 ">
          Filters
        </h5>
        <div>
          <ul class="w-full relative bg-red text-sm text-base-content/60">
            <Show
              when={tags()?.storeOwnerTags}
              fallback={<div>loading...</div>}
            >
              <For
                each={tags().storeOwnerTags}
                fallback={<div>Not founded</div>}
              >
                {(tag) => {
                  return (
                    <li class="transition-all mt-0 w-full block px-2">
                      <A
                        classList={{
                          "font-medium bg-primary text-white rounded rounded-xl transform active:scale-75 transition-transform":
                            tag.id === ps.tag,
                        }}
                        class="w-full block py-2 px-3"
                        href={`/products?search=${
                          ps.search ? ps.search : ""
                        }&tag=${tag.id}`}
                      >
                        {tag.title.en}
                      </A>
                    </li>
                  );
                }}
              </For>
            </Show>
          </ul>
        </div>
      </div>
      {/* <h5 class="inline-flex items-center text-base font-medium text-gray-400">
        Categories
      </h5>
      <form class="my-4 border-gray-200">
        <div class="space-y-4 px-4 py-1 border-gray-200 pb-6 text-sm text-gray-600">
          <div class="flex items-center">
            <input
              id="filter-category-0"
              name="category[]"
              value="new-arrivals"
              type="checkbox"
              class="checkbox checkbox-sm"
            />
            <label for="filter-category-0" class="ml-3 text-sm text-gray-600">
              RIBBON
            </label>
          </div>
          <div class="flex items-center">
            <input
              id="filter-category-1"
              name="category[]"
              value="sale"
              type="checkbox"
              class="checkbox checkbox-sm"
            />
            <label for="filter-category-1" class="ml-3 text-sm text-gray-600">
              EVOLIS
            </label>
          </div>
          <div class="flex items-center">
            <input
              id="filter-category-2"
              name="category[]"
              value="travel"
              type="checkbox"
              checked
              class="checkbox checkbox-sm"
            />
            <label for="filter-category-2" class="ml-3 text-sm text-gray-600">
              FUJIFILM
            </label>
          </div>
          <div class="flex items-center">
            <input
              id="filter-category-3"
              name="category[]"
              value="organization"
              type="checkbox"
              class="checkbox checkbox-sm"
            />
            <label for="filter-category-3" class="ml-3 text-sm text-gray-600">
              HP
            </label>
          </div>
          <div class="flex items-center">
            <input
              id="filter-category-4"
              name="category[]"
              value="accessories"
              type="checkbox"
              class="checkbox checkbox-sm"
            />
            <label for="filter-category-4" class="ml-3 text-sm text-gray-600">
              DELL
            </label>
          </div>
          <div class="flex items-center">
            <input
              id="filter-category-4"
              name="category[]"
              value="accessories"
              type="checkbox"
              class="checkbox checkbox-sm"
            />
            <label for="filter-category-4" class="ml-3 text-sm text-gray-600">
              SONY
            </label>
          </div>
        </div>
      </form> */}
    </div>
  );
};
