import { A } from "@solidjs/router";
import { Logo } from "../Logo";
import { Show } from "solid-js";
import { useAuth } from "~/contexts/useAuth";
import { useCart } from "~/contexts/useCart";
import { TbShoppingCart } from "solid-icons/tb";

const Navbar = () => {
  const { cartItems, logout } = useCart();
  const { user, loading } = useAuth();

  return (
    <div class="navbar sm:h-12 lg:h-16 w-full bg-base/100 relative sm:sticky top-0 z-50 backdrop-blur-lg shadow-sm shadow-primary/10">
      <div class="md:flex hidden justify-between w-full container mx-auto ">
        <Logo />
        <div class="flex items-center space-x-3">
          <Show when={!loading()!} fallback={null}>
            <A href="/cart">
              <div class="dropdown dropdown-end">
                <div
                  tabindex="0"
                  role="button"
                  class="btn btn-ghost btn-circle bg-primary/10 hover:bg-primary/30"
                >
                  <div class="indicator">
                    <TbShoppingCart size={20} class="text-primary" />
                    <span class="badge badge-sm indicator-item bg-primary text-base-100">
                      {cartItems.length}
                    </span>
                  </div>
                </div>
              </div>
            </A>
          </Show>
          <Show when={!loading()!} fallback={null}>
            <Show
              when={user()}
              fallback={
                <a href={`https://backend.riverbase.org/sso/store`}>
                  <button class="btn px-14 rounded-box bg-primary/10 hover:bg-primary/5 text-primary border-none">
                    Login
                  </button>
                </a>
              }
            >
              <div class="dropdown dropdown-end ">
                <label
                  tabIndex={0}
                  class="btn btn-ghost btn-circle avatar bg-primary/20 hover:bg-primary/20 placeholder"
                >
                  <span>{user().fullname?.charAt(0).toUpperCase()}</span>
                </label>
                <ul
                  tabIndex={0}
                  class="p-2 shadow menu dropdown-content z-50 bg-base-100 rounded-box w-52 mt-2"
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
