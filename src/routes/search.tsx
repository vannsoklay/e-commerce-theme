import { Component } from "solid-js";
import { FiShoppingBag } from "solid-icons/fi";

const Search = () => {
	return (
		<div class="container mx-auto p-3">
			<form data-svelte-search="">
				<input
					type="search"
					placeholder="Search…"
					class="input input-bordered w-full"
					autocomplete="on"
					spellcheck={false}
					aria-autocomplete="list"
					aria-controls="typeahead-0.nrh5wc1w7r-listbox"
					aria-labelledby="typeahead-0.nrh5wc1w7r-label"
				/>
			</form>
			<div>
				<p class="text-lg font-semibold mt-3">Popular Search</p>
				<div class="mt-3 flex flex-wrap gap-2">
					<button class="btn btn-sm w-auto font-medium">sneaker king</button>
					<button class="btn btn-sm w-auto font-medium">nike</button>
					<button class="btn btn-sm w-auto font-medium">
						nike shoes for men
					</button>
					<button class="btn btn-sm w-auto font-medium">iphone 15promax</button>
					<button class="btn btn-sm w-auto font-medium">puma king</button>
					<button class="btn btn-sm w-auto font-medium">clothes</button>
					<button class="btn btn-sm w-auto font-medium">eletronic</button>
					<button class="btn btn-sm w-auto font-medium">iphone case</button>
				</div>
			</div>
			<div class="flex flex-col gap-y-1">
				<p class="text-lg font-semibold mt-6 mb-2">Trending Now</p>
				<div class="flex gap-3 items-center">
					<img
						alt=""
						src="/images/products/product-2.png"
						class="aspect-auto w-16 bg-slate-100 rounded-lg"
					/>
					<div>
						<h2 class="font-semibold text-md">Printer full colors</h2>
						<div class="flex gap-1 items-center">
							<FiShoppingBag />: SONY
						</div>
					</div>
				</div>
				<div class="flex gap-3 items-center">
					<img
						alt=""
						src="/images/products/product-2.png"
						class="aspect-auto w-16 bg-slate-100 rounded-lg"
					/>
					<div>
						<h2 class="font-semibold text-md">Printer full colors</h2>
						<div class="flex gap-1 items-center">
							<FiShoppingBag />: SONY
						</div>
					</div>
				</div>
				<div class="flex gap-3 items-center">
					<img
						alt=""
						src="/images/products/product-2.png"
						class="aspect-auto w-16 bg-slate-100 rounded-lg"
					/>
					<div>
						<h2 class="font-semibold text-md">Printer full colors</h2>
						<div class="flex gap-1 items-center">
							<FiShoppingBag />: SONY
						</div>
					</div>
				</div>
				<div class="flex gap-3 items-center">
					<img
						alt=""
						src="/images/products/product-2.png"
						class="aspect-auto w-16 bg-slate-100 rounded-lg"
					/>
					<div>
						<h2 class="font-semibold text-md">Printer full colors</h2>
						<div class="flex gap-1 items-center">
							<FiShoppingBag />: SONY
						</div>
					</div>
				</div>
				<div class="flex gap-3 items-center">
					<img
						alt=""
						src="/images/products/product-2.png"
						class="aspect-auto w-16 bg-slate-100 rounded-lg"
					/>
					<div>
						<h2 class="font-semibold text-md">Printer full colors</h2>
						<div class="flex gap-1 items-center">
							<FiShoppingBag />: SONY
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search;
