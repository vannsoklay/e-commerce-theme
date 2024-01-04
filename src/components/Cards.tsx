import { Component, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { AiFillStar, AiFillHeart } from "solid-icons/ai";

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
          <div class="group cursor-pointer relative card w-full h-96 bg-base-100 shadow-xl">
            <figure>
              <div class="absolute flex flex-col top-0 right-0 p-3">
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
              <div class="flex items-center justify-center bg-contain bg-center bg-repeat p-3">
                <img
                  class="group-hover:scale-105 duration-150 w-full max-h-48 bg-repeat-round rounded-2xl mx-auto object-contain"
                  src={`${import.meta.env.VITE_VARIABLE_IPFS}/api/ipfs?hash=${
                    props?.product?.thumbnail
                  }`}
                  alt="product image"
                />
              </div>
            </figure>
            <div class="card-body">
              <span class="text-xs">{props?.product?.brand}</span>
              <div class="flex items-center">
                <Show when={props?.product?.rating} fallback={null}>
                  {Array(Math.floor(props?.product?.rating)).fill(
                    <AiFillStar class="text-primary text-md" />
                  )}
                  {5 - Math.floor(props?.product?.rating) == 0 ? (
                    ""
                  ) : (
                    <AiFillStar class="text-gray-200 text-md" />
                  )}
                </Show>
                <span class="bg-primary/10 text-primary text-xs font-semibold mr-2 px-2.5 py-0.5 rounded ml-3">
                  {props?.product?.rating}
                </span>
              </div>

              <p class="text-md font-medium text-gray-800">
                {props.product.title}
              </p>
              <div class="card-actions flex items-center justify-between">
                <span class="text-3xl lg:text-xl 2xl:text-3xl font-bold text-secondary">
                  {props.product.currency === "KHR" ? "៛" : "$"}
                  {props.product?.price}
                </span>
                <button
                  onClick={() => navigate(`/products/${props?.product?.slug}`)}
                  class="w-auto btn btn-sm btn-primary border-none rounded-full"
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
