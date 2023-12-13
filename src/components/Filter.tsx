import { A } from "solid-start";

export const Filter = () => {
  return (
    <div class="mt-8">
      <h5 class="inline-flex items-center text-base font-semibold text-gray-400">
        Filters
      </h5>
      <form class="my-4 border-y border-gray-200">
        <ul class="space-y-4 px-4 py-3 border-gray-200 pb-6 text-sm text-gray-600">
          <li>
            <A href="#">Equipment</A>
          </li>
          <li>
            <A href="#">Ink Cartridge</A>
          </li>
          <li>
            <A href="#">CAM-TONER CARTRIDGE</A>
          </li>
          <li>
            <A href="#">Printer</A>
          </li>
          <li>
            <A href="#">Bill Counter</A>
          </li>
          <li>
            <A href="#">IT Services</A>
          </li>
          <li>
            <A href="#">Ribbon</A>
          </li>
          <li>
            <A href="#">Accessories</A>
          </li>
        </ul>
      </form>
      <h5 class="inline-flex items-center text-base font-medium text-gray-400">
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
      </form>
    </div>
  );
};
