import { A, useLocation } from "solid-start";
import {
  RiFinanceShoppingBag3Line,
  RiFinanceShoppingBag3Fill,
  RiBuildingsHomeSmile2Line,
  RiBuildingsHomeSmile2Fill,
} from "solid-icons/ri";
import { IoCartSharp, IoCartOutline } from "solid-icons/io";

import { FiSearch } from "solid-icons/fi";
import { Show } from "solid-js";
import { useCart } from "~/contexts/useCart";

const MobileTopBar = () => {
  const { cartItems } = useCart();
  const location = useLocation();

  return (
    <>
      <div class="btm-nav pb-1 bg-white z-50 xl:hidden backdrop-blur-sm border border-primary/10">
        <A href="/" class="border-none bg-transparent">
          <Show
            when={location.pathname === "/"}
            fallback={
              <button class="btn btn-ghost btn-square btn-md">
                <RiBuildingsHomeSmile2Line size={30} class="text-gray-600" />
                <span class="text-xs font-light relative -mt-1 text-gray-600">
                  Home
                </span>
              </button>
            }
          >
            <button class="btn btn-ghost btn-square btn-md">
              <RiBuildingsHomeSmile2Fill size={30} class="text-primary" />
              <span class="text-xs font-light relative -mt-1 text-primary">
                Home
              </span>
            </button>
          </Show>
        </A>

        <A href="/search" class="border-none bg-transparent">
          <Show
            when={location.pathname === "/search"}
            fallback={
              <button class="btn btn-ghost btn-square btn-md">
                <FiSearch size={30} class="text-gray-600" />
                <span class="text-xs font-light relative -mt-1 text-gray-600">
                  Search
                </span>
              </button>
            }
          >
            <button class="btn btn-ghost btn-square btn-md">
              <FiSearch size={30} class="text-primary" />
              <span class="text-xs font-light relative -mt-1 text-primary">
                Search
              </span>
            </button>
          </Show>
        </A>

        <A href="/products" class="border-none bg-transparent">
          <Show
            when={location.pathname === "/products"}
            fallback={
              <button class="btn btn-ghost btn-square btn-md">
                <RiFinanceShoppingBag3Line size={30} class="text-gray-600" />
                <span class="text-xs font-light relative -mt-1 text-gray-600">
                  Products
                </span>
              </button>
            }
          >
            <button class="btn btn-ghost btn-square btn-md">
              <RiFinanceShoppingBag3Fill size={30} class="text-primary" />
              <span class="text-xs font-light relative -mt-1 text-primary">
                Products
              </span>
            </button>
          </Show>
        </A>

        <A href="/cart" class="border-none bg-transparent">
          <Show
            when={
              location.pathname === "/cart" ||
              location.pathname === "/checkouts"
            }
            fallback={
              <button class="btn btn-ghost btn-square btn-md">
                <Show
                  when={cartItems.length > 0}
                  fallback={<IoCartOutline size={30} class="text-gray-600" />}
                >
                  <div class="indicator">
                    <IoCartOutline size={30} class="text-gray-600" />
                    <span class="badge badge-sm indicator-item bg-primary text-base-100">
                      {cartItems.length}
                    </span>
                  </div>
                </Show>
                <span class="text-xs font-light relative -mt-1 text-gray-600">
                  Cart
                </span>
              </button>
            }
          >
            <button class="btn btn-ghost btn-square">
              <Show
                when={cartItems.length > 0}
                fallback={<IoCartSharp size={30} class="text-primary" />}
              >
                <div class="indicator">
                  <IoCartSharp size={30} class="text-primary" />
                  <span class="badge badge-sm indicator-item bg-primary text-base-100">
                    {cartItems.length}
                  </span>
                </div>
              </Show>
              <span class="text-xs font-light relative -mt-1 text-primary">
                Cart
              </span>
            </button>
          </Show>
        </A>
      </div>
    </>
  );
};

export default MobileTopBar;
