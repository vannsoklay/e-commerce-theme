import { Component, Show, createSignal } from "solid-js";
import { ItemProduct, ProductType } from "~/types/product";

import { CartItem } from "~/types/global";
import toast from "solid-toast";
import { useCart } from "~/contexts/useCart";
import { useNavigate } from "@solidjs/router";
import { formatToUSD } from "~/utils/usd";

export const CardProduct: Component<{ product: ProductType }> = (props) => {
  const navigate = useNavigate();
  const [items, setItems] = createSignal<CartItem[]>([]);
  const { addToCart, addCarts } = useCart();
  const handleAddToCart = (product: ItemProduct) => {
    let p: ItemProduct = {
      id: product.id,
      variantId: null,
      name: product.name,
      price: product.price,
      currency: product.currency,
      preview: product.preview,
    };
    addToCart(p, false);
  };

  return (
    <div class="h-full backdrop-blur-lg bg-gray-50 transition-all hover:shadow-md rounded-box group">
      <Show when={props} fallback={<p>Loading...</p>}>
        <div
          onClick={() => {
            navigate(`/products/${props?.product?.slug}`);
          }}
          data-aos="zoom-out-down"
        >
          <div class=" cursor-pointer relative w-full rounded-lg">
            <figure>
              <div class="flex items-center justify-center bg-contain bg-center bg-repeat p-1 sm:p-1 lg:p-2">
                <img
                  class="group-hover:scale-105 duration-150 w-full h-32 sm:h-32 lg:h-48 bg-repeat-round rounded-2xl mx-auto object-contain bg-white"
                  src={`${import.meta.env.VITE_VARIABLE_IPFS}/api/ipfs?hash=${
                    props?.product?.thumbnail
                  }`}
                  alt="product image"
                />
              </div>
            </figure>
            <div class="p-3">
              <div class="text-[12px] text-primary">{props.product.brand}</div>
              <div class="text-base font-medium  mb-4 lg:h-12 h-auto">
                {props.product.title.length <= 40
                  ? props.product.title
                  : props.product.title.slice(0, 40) + "..."}
              </div>
              <div class="card-accents flex items-center justify-between">
                <span class="text-primary lg:text-xl text-sm font-bold">
                  {formatToUSD(parseInt(props.product.price.toString()))}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const p: ItemProduct = {
                      id: props.product.id,
                      variantId: null,
                      name: props.product.title,
                      price: props.product.price,
                      currency: props.product.currency,
                      preview: props.product.thumbnail,
                    };
                    props.product.variants.length > 0
                      ? (addCarts(items()), setItems([]))
                      : handleAddToCart(p);
                    toast.success("Added successfully!");
                  }}
                  class="w-auto glass btn btn-xs sm:btn-xs lg:btn-sm bg-secondary font-normal"
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
