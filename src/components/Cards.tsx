import { Component, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { AiFillHeart } from "solid-icons/ai";

export const CardProduct: Component<{ product: ProductType }> = (props) => {
  const navigate = useNavigate();

  return (
    <div>
      <Show when={props} fallback={<p>Loading...</p>}>
        <div
          onClick={() => {
            navigate(`/products/${props?.product?.slug}`);
          }}
          data-aos="zoom-out-down"
        >
          <div class="group relative md:max-w-sm md-full h-auto bg-white border border-gray-200 rounded-3xl shadow cursor-pointer">
            <div class="absolute flex flex-col top-0 right-0 p-3">
              {/* <div
                id="tooltip-light"
                role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
              >
                Available soon
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div> */}
              <button
                data-tooltip-target="tooltip-light"
                data-tooltip-style="light"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                class="z-40 transition ease-in duration-300 bg-gray-50  hover:text-danger shadow hover:shadow-md text-red-300 rounded-full w-8 h-8 lg:h-6 lg:w-6 2xl:h-8 2xl:w-8 text-center p-1"
              >
                <AiFillHeart class="w-6 h-6 lg:w-4 lg:h-4 2xl:w-6 2xl:h-6 text-secondary/30 group-hover:text-secondary/80" />
              </button>
            </div>
            <div class="w-full md:h-48 h-54 bg-contain relative">
              <div class="w-full h-full flex items-center justify-center bg-contain bg-center bg-repeat p-3">
                <img
                  class="group-hover:scale-105 duration-150 bg-repeat-round w-full h-full rounded-2xl mx-auto object-cover"
                  src={`${import.meta.env.VITE_VARIABLE_IPFS}/api/ipfs?hash=${
                    props?.product?.thumbnail
                  }`}
                  alt="product image"
                />
              </div>
            </div>
            <div class="px-5 pb-5">
              <span class="text-md font-bold">{props?.product?.brand}</span>
              <div class="flex items-center mb-2">
                <svg
                  class="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  class="w-4 h-4 text-yellow-300 mr-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg
                  class="w-4 h-4 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                  {props?.product?.rating}
                </span>
              </div>
              <p class="text-md font-medium text-gray-800">
                {props.product.title}
              </p>

              <div
                class={`flex items-center justify-between ${
                  props?.product?.title?.length > 35 ? "mt-1" : "mt-3"
                }`}
              >
                <span class="text-3xl lg:text-xl 2xl:text-3xl font-bold text-secondary">
                {props.product.currency === "KHR" ? "៛" : "$"}{props.product?.price}
                </span>
                <button
                  onClick={() => navigate(`/products/${props?.product?.slug}`)}
                  class="w-auto btn btn-sm border-none rounded-full bg-action/10 text-action hover:text-action hover:border-action hover:bg-action/10"
                >
                  {props.product.variants.length <= 0 ? "Add to cart" : "Views"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};
