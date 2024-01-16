import { A } from "solid-start";
import Button from "./Button";
import { FiShoppingCart } from "solid-icons/fi";

export const EmptyCart = () => {
	return (
		<div class="container mx-auto h-[48vh] flex justify-center items-center">
			<main class="text-center">
				<h1 class="text-4xl font-bold text-error/70 pb-6">Empty Cart</h1>
				<A href="/products">
					<button class="btn btn-primary bg-opacity-50 w-64 rounded-box animate-pulse">
						<FiShoppingCart class="text-xl" />
						More Products
					</button>
				</A>
			</main>
		</div>
	);
};
