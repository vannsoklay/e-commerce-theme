import { A, useLocation } from "solid-start";
import {
  RiUserFacesAccountCircleFill,
  RiFinanceShoppingBag3Line,
  RiFinanceShoppingBag3Fill,
  RiBuildingsHomeSmile2Line,
  RiBuildingsHomeSmile2Fill,
} from "solid-icons/ri";
import { IoCartSharp, IoCartOutline } from "solid-icons/io";

import { FiSearch } from "solid-icons/fi";
import { Show } from "solid-js";
import { useAuth } from "~/contexts/useAuth";
import { useCart } from "~/contexts/useCart";
import { TbHistory, TbLogout, TbTruckDelivery, TbUser } from "solid-icons/tb";

const MobileTopBar = () => {
  const { user, loading, login } = useAuth();
  const { cartItems, logout } = useCart();
  const location = useLocation();

  return (
    <>
      <div class="btm-nav pb-2 bg-white z-50 xl:hidden backdrop-blur-sm border border-primary/10">
        <A href="/" class="border-none bg-transparent">
          <Show
            when={location.pathname === "/"}
            fallback={
              <button class="btn btn-ghost btn-sm">
                <RiBuildingsHomeSmile2Line size={30} class="text-gray-600" />
                <span class="text-xs font-light relative -mt-2 text-gray-600">
                  Home
                </span>
              </button>
            }
          >
            <button class="btn btn-ghost btn-sm">
              <RiBuildingsHomeSmile2Fill size={30} class="text-primary" />
              <span class="text-xs font-light relative -mt-2 text-primary">
                Home
              </span>
            </button>
          </Show>
        </A>

        <A href="/search" class="border-none bg-transparent">
          <Show
            when={location.pathname === "/search"}
            fallback={
              <button class="btn btn-ghost btn-sm">
                <FiSearch size={30} class="text-gray-600" />
                <span class="text-xs font-light relative -mt-2 text-gray-600">
                  Search
                </span>
              </button>
            }
          >
            <button class="btn btn-ghost btn-sm">
              <FiSearch size={30} class="text-primary" />
              <span class="text-xs font-light relative -mt-2 text-primary">
                Search
              </span>
            </button>
          </Show>
        </A>

        <A href="/products" class="border-none bg-transparent">
          <Show
            when={location.pathname === "/products"}
            fallback={
              <button class="btn btn-ghost btn-sm">
                <RiFinanceShoppingBag3Line size={30} class="text-gray-600" />
                <span class="text-xs font-light relative -mt-2 text-gray-600">
                  Products
                </span>
              </button>
            }
          >
            <button class="btn btn-ghost btn-sm">
              <RiFinanceShoppingBag3Fill size={30} class="text-primary" />
              <span class="text-xs font-light relative -mt-2 text-primary">
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
              <button class="btn btn-ghost btn-sm">
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
                <span class="text-xs font-light relative -mt-2 text-gray-600">
                  Cart
                </span>
              </button>
            }
          >
            <button class="btn btn-ghost btn-sm">
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
              <span class="text-xs font-light relative -mt-2 text-primary">
                Cart
              </span>
            </button>
          </Show>
        </A>
        <Show
          when={user()}
          fallback={
            <A
              href={`https://backend.riverbase.org/sso/store`}
              class="border-none bg-transparent"
            >
              <button class="btn btn-ghost btn-sm" tabIndex={0}>
                <RiUserFacesAccountCircleFill size={30} class="text-gray-600" />
                <span class="text-xs font-light relative -mt-2 text-gray-600">
                  Account
                </span>
              </button>
            </A>
          }
        >
          <A
            href={`me/@${user()?.first_name?.toLowerCase()}`}
            class="border-none bg-transparent"
            onClick={(e) => e.preventDefault()}
          >
            <div class="dropdown dropdown-top dropdown-left">
              <button class="btn btn-ghost btn-sm" tabIndex={0}>
                <RiUserFacesAccountCircleFill size={30} class="text-gray-600" />
                <span class="text-xs font-light relative -mt-2 text-gray-600">
                  You
                </span>
              </button>
              <ul
                tabIndex={0}
                class="-mr-8 mb-8 bg-base-100 dropdown-content z-[1] shadow menu menu-sm rounded-box w-52 border px-1"
              >
                <li>
                  <A
                    href={`/me/@${user()?.first_name?.toLowerCase()}`}
                    class="flex py-2 place-content-between"
                  >
                    Profile
                    <button class="btn btn-circle btn-sm bg-primary/20 ">
                      <TbUser size={18} />
                    </button>
                  </A>
                </li>
                <li>
                  <A
                    href={`/me/history`}
                    class="flex py-2 place-content-between"
                  >
                    History
                    <button class="btn btn-circle btn-sm bg-primary/20">
                      <TbHistory size={18} />
                    </button>
                  </A>
                </li>
                <li>
                  <A
                    href={`me/delivery`}
                    class="flex py-2 place-content-between"
                  >
                    Delivery
                    <button class="btn btn-circle btn-sm bg-primary/20">
                      <TbTruckDelivery size={18} />
                    </button>
                  </A>
                </li>
                <li>
                  <A
                    class="flex py-2 place-content-between"
                    href="/logout"
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                      window?.location.replace("/");
                    }}
                  >
                    Logout
                    <button class="btn btn-circle btn-sm bg-primary/20">
                      <TbLogout size={18} />
                    </button>
                  </A>
                </li>
              </ul>
            </div>
          </A>
        </Show>
      </div>
    </>
  );
};

export default MobileTopBar;
