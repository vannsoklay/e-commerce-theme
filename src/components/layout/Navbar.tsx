import { A } from "@solidjs/router";
import { Logo } from "../Logo";
import { Show } from "solid-js";
import { useAuth } from "~/contexts/useAuth";
import { useCart } from "~/contexts/useCart";

const Navbar = () => {
	const { cartItems, logout } = useCart();
	const { user, loading, login } = useAuth();

	return (
		<div class="navbar w-full bg-white/80 relative sm:sticky top-0 z-50 backdrop-blur-lg border">
			<div class="md:flex hidden justify-between w-full container mx-auto ">
				<Logo />
				<div class="flex items-center space-x-3">
					<Show
						when={!loading()!}
						fallback={
							<div class="skeleton w-12 h-12 rounded-full shrink-0"></div>
						}
					>
						<A href="/cart">
							<div class="dropdown dropdown-end">
								<div
									tabindex="0"
									role="button"
									class="btn btn-ghost btn-circle bg-primary/5 hover:bg-primary/5"
								>
									<div class="indicator">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-5 w-5 text-primary"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
											/>
										</svg>
										<span class="badge badge-sm indicator-item text-red-600">
											{cartItems.length}
										</span>
									</div>
								</div>
							</div>
						</A>
					</Show>
					<Show
						when={!loading()!}
						fallback={
							<div class="skeleton w-12 h-12 rounded-full shrink-0"></div>
						}
					>
						<Show
							when={user()}
							fallback={
								// <>
								//   <a
								//     href={`https://oauth.selendra.org/v1/oauth?client_id=${
								//       import.meta.env.VITE_DID_CLIENT_ID
								//     }&scope=default&redirect_uri=${
								//       import.meta.env.VITE_DOMAIN
								//     }`}
								//   >
								//     Login with Digital ID
								//   </a>
								// </>
								<a href={`https://backend.riverbase.org/sso/store`}>
									<button class="btn px-14 rounded-full bg-primary/10 hover:bg-primary/5 text-primary border-none">
										Login
									</button>
								</a>
							}
						>
							<div class="dropdown dropdown-end">
								<label
									tabIndex={0}
									class="btn btn-ghost btn-circle avatar bg-primary/20 hover:bg-primary/20 placeholder"
								>
									<div class="bg-primary text-neutral-content rounded-full w-10">
										<span>{user().fullname?.charAt(0).toUpperCase()}</span>
									</div>
								</label>
								<ul
									tabIndex={0}
									class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
								>
									<li>
										<A href={`me/@${user().fullname?.toLowerCase()}`}>
											Profile
										</A>
									</li>
									<li>
										<A href={`me/history`}>History</A>
									</li>
									<li>
										<A href={`me/delivery`}>Delivery</A>
									</li>
									<li>
										<button onClick={() => logout()}>Logout</button>
									</li>
								</ul>
							</div>
						</Show>
					</Show>
				</div>
			</div>
			{/* mobile responsive */}
			<div class="md:hidden text-center w-full">
				<Logo />
			</div>
		</div>
	);
};

export default Navbar;
