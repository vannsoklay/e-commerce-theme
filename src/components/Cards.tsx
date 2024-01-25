import { AiFillHeart, AiFillStar } from "solid-icons/ai";
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
	const { addToCart, cartItems, addCarts } = useCart();
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
		<div class="h-full backdrop-blur-lg bg-primary/10 transition-all hover:shadow-md rounded-box">
			<Show when={props} fallback={<p>Loading...</p>}>
				<div
					onClick={() => {
						navigate(`/products/${props?.product?.slug}`);
					}}
					data-aos="zoom-out-down"
				>
					<div class=" cursor-pointer relative w-full  rounded-lg">
						<figure>
							<div class="flex items-center justify-center bg-contain bg-center bg-repeat p-2">
								<img
									class="group-hover:scale-105 duration-150 w-full h-48 bg-repeat-round rounded-2xl mx-auto object-contain"
									src={`${import.meta.env.VITE_VARIABLE_IPFS}/api/ipfs?hash=${
										props?.product?.thumbnail
									}`}
									alt="product image"
								/>
							</div>
						</figure>
						<div class="p-3">
							<div class="text-base font-medium  mb-4 lg:h-12 h-auto">
								{props.product.title}
							</div>
							<div class="card-accents flex items-center justify-between">
								<span class=" lg:text-lg text-sm font-bold">
									{formatToUSD(props.product.price)}
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
									class="w-auto btn btn-primary btn-sm font-normal border-none rounded-box"
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
