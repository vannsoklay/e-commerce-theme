import { Component, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

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
          <div class="group hover:scale-105 duration-150 relative max-w-sm h-[25.5rem] md:h-auto bg-white border border-gray-200 rounded-3xl shadow cursor-pointer">
            <div class="absolute flex flex-col top-0 right-0 p-3">
              <div
                id="tooltip-light"
                role="tooltip"
                class="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 tooltip"
              >
                Available soon
                <div class="tooltip-arrow" data-popper-arrow></div>
              </div>
              <button
                data-tooltip-target="tooltip-light"
                data-tooltip-style="light"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                class="z-40 transition ease-in duration-300 bg-gray-50  hover:text-danger shadow hover:shadow-md text-red-300 rounded-full w-8 h-8 lg:h-6 lg:w-6 2xl:h-8 2xl:w-8 text-center p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6 lg:w-4 lg:h-4 2xl:w-6 2xl:h-6 text-secondary/80"
                >
                  <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>
              </button>
            </div>
            <div class="w-full h-48 bg-contain relative">
              <div class="w-full h-full flex items-center justify-center bg-contain bg-center bg-repeat">
                <img
                  class="rounded-t-lg bg-repeat-round w-full h-full p-8 mx-auto"
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
                  ${props.product?.price}
                </span>
                <button
                  onClick={() => navigate(`/products/${props?.product?.slug}`)}
                  class="w-24 btn border-none rounded-full bg-action/10 text-action hover:text-action hover:border-action hover:bg-action/10"
                >
                  {props.product.variants.length <= 0 ? "Add to cart" : "Views"}
                </button>
                {/* <div
                  class="tooltip tooltip-open tooltip-right"
                  data-tip="hello guy"
                >
                  <button class="btn">Right</button>
                </div> */}
                {/* {!isInCart() ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(props.product);
                    }}
                    class="text-primary hover:text-white border border-primary hover:border-danger hover:bg-danger focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 lg:py-1.5 2xl:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/cart`);
                    }}
                    class="text-white hover:text-white border bg-danger hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 lg:py-1.5 2xl:py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    View Cart
                  </button>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
};
