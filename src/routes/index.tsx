import { For, Show } from "solid-js";

import { A } from "solid-start";
import { CardProduct } from "~/components/Cards";
import { GET_ALL_PRODUCTS } from "~/libs/graphql/product";
import Hero from "~/components/Hero";
import { ProductType } from "~/types/product";
import { RiFinanceShoppingBasketLine } from "solid-icons/ri";
import { TAGS } from "~/libs/graphql/tag";
import Team from "~/components/Team";
import { publicQuery } from "~/libs/client";

export default function Home() {
	return (
		<div>
			<section id="hero">
				<Hero />
			</section>
			<section id="products" class="pt-8">
				<LatestProducts />
			</section>
		</div>
	);
}

export const LatestProducts = () => {
	const [products] = publicQuery(GET_ALL_PRODUCTS, {
		filter: {
			limit: 8,
			skip: 0,
			sort: -1,
		},
	});

	const [tags] = publicQuery(TAGS);

	return (
		<div class="container mx-auto">
			<h1 class="text-primary/80 font-extrabold md:text-4xl text-xl text-center md:py-12 py-8">
				Our Products
			</h1>

			<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
				<Show when={products()} fallback={<div>loading...</div>}>
					<Show
						when={products()?.storeProducts.length > 0}
						fallback={
							<div class="md:col-span-3 lg:col-span-5 col-span-1 w-full text-center pt-8">
								<div class="flex justify-center text-center text-2xl items-center">
									<RiFinanceShoppingBasketLine
										size={120}
										class="text-gray-300"
									/>
								</div>
								<div class="leading-none font-semibold text-gray-400">
									No Products
								</div>
							</div>
						}
					>
						<For each={products()?.storeProducts}>
							{(latestProduct: ProductType) => {
								return <CardProduct product={latestProduct} />;
							}}
						</For>
					</Show>
				</Show>
			</div>
			{products()?.storeProducts.length >= 10 && (
				<div class="flex justify-center mt-8">
					<A href="/products">
						<button class="px-8 py-2 rounded-box text-white transition-all hover:text-accent hover:border-accent shadow-none">
							Show All
						</button>
					</A>
				</div>
			)}

			<h1 class="text-primary/80 font-extrabold md:text-4xl text-xl text-center md:py-12 py-8 lg:mt-20 mt-8">
				Shop by categories
			</h1>

			<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
				<Show when={tags()?.storeOwnerTags} fallback={<div>loading...</div>}>
					<For
						each={tags().storeOwnerTags}
						fallback={
							<div class="md:col-span-3 grid-col-2 lg:col-span-4 flex justify-center">
								Not founded
							</div>
						}
					>
						{(tag) => {
							return (
								<A href={`/products?tag=${tag.id}`}>
									<div class="bg-secondary/5 backdrop-blur-lg flex justify-center items-center px-3 py-6 font-bold rounded-box hover:border-primary transition-all hover:shadow-md hover:text-primary">
										{tag.title.en}
									</div>
								</A>
							);
						}}
					</For>
				</Show>
			</div>

			<Team />
		</div>
	);
};
