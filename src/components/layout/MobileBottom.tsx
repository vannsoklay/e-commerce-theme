import {
  RiFinanceShoppingBagLine,
  RiFinanceShoppingBagFill,
  RiUserFacesAccountCircleLine,
  RiUserFacesAccountCircleFill,
  RiBuildingsHome4Line,
  RiBuildingsHome4Fill,
} from "solid-icons/ri";
import { FiSearch } from "solid-icons/fi";
import { Show } from "solid-js";
import { A, useLocation } from "solid-start";
import { useAuth } from "~/contexts/useAuth";
import { useCart } from "~/contexts/useCart";

const MobileTopBar = () => {
  const { user, loading, login } = useAuth();
  const { cartItems, logout } = useCart();
  const location = useLocation();

  return (
    <>
      <div class="btm-nav h-20 bg-white/60 z-50 xl:hidden backdrop-blur-sm">
        <A href="/" class="border-none bg-transparent">
          <Show
            when={location.pathname === "/"}
            fallback={
              <label class="btn-md flex justify-center btn-ghost btn-circle avatar">
                <div class="w-7 rounded-full">
                  <RiBuildingsHome4Line class="h-full w-full text-primary" />
                </div>
              </label>
            }
          >
            <label class="btn-md flex justify-center btn-ghost btn-circle avatar bg-primary/20 hover:bg-primary/20">
              <div class="w-7 rounded-full">
                <RiBuildingsHome4Fill class="h-full w-full text-primary" />
              </div>
            </label>
          </Show>
        </A>

        <A href="/search" class="border-none bg-transparent">
          <Show
            when={location.pathname === "/"}
            fallback={
              <label class="btn-md flex justify-center btn-ghost btn-circle avatar">
                <div class="w-7 rounded-full">
                  <FiSearch class="h-full w-full text-primary" />
                </div>
              </label>
            }
          >
            <label class="btn-md flex justify-center btn-ghost btn-circle avatar ">
              <div class="w-7 rounded-full">
                <FiSearch class="h-full w-full text-primary" />
              </div>
            </label>
          </Show>
        </A>

        <A href="/cart" class="border-none bg-transparent">
          <Show
            when={
              location.pathname === "/cart" ||
              location.pathname === "/checkouts"
            }
            fallback={
              <label class="btn-md flex justify-center btn-ghost btn-circle avatar ">
                <div class="w-7 rounded-full">
                  <RiFinanceShoppingBagLine class="h-full w-full text-primary" />
                </div>
              </label>
            }
          >
            <label class="btn-md flex justify-center btn-ghost btn-circle avatar bg-primary/20 hover:bg-primary/20">
              <div class="w-7 rounded-full">
                <RiFinanceShoppingBagFill class="h-full w-full text-primary" />
              </div>
            </label>
          </Show>
        </A>
        <Show
          when={user()}
          fallback={
            <label
              onClick={() => login("my_modal_2")}
              class="btn-sm btn-ghost btn-circle avatar"
            >
              <div class="w-8 rounded-full">
                <RiUserFacesAccountCircleLine class="h-full w-full text-primary" />
              </div>
            </label>
          }
        >
          <A
            href={`me/@${user()?.first_name?.toLowerCase()}`}
            class="border-none bg-transparent"
          >
            <Show
              when={location.pathname.startsWith("/me")}
              fallback={
                <label class="btn-sm btn-ghost btn-circle avatar">
                  <div class="w-8 rounded-full">
                    <RiUserFacesAccountCircleLine class="h-full w-full text-primary" />
                  </div>
                </label>
              }
            >
              <div class="dropdown dropdown-top">
                <label
                  tabIndex={0}
                  class="btn-md flex justify-center btn-ghost btn-circle avatar bg-primary/20 hover:bg-primary/20"
                >
                  <div class="w-8 rounded-full">
                    <RiUserFacesAccountCircleFill class="h-full w-full text-primary" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  class="-ml-32 mb-2 dropdown-content z-[1] shadow menu menu-sm rounded-box w-52"
                >
                  <li>
                    <A
                      href={`me/@${user()?.first_name?.toLowerCase()}`}
                      class="h-12 rounded-md flex items-center"
                    >
                      <div class="w-8 h-8 rounded-full">
                        <img
                          alt=""
                          class="w-8 h-8 rounded-full"
                          src="https://i0.wp.com/vrscout.com/wp-content/uploads/2022/10/IronManVRQuest2.jpg?fit=1132%2C670&ssl=1"
                        />
                      </div>
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
          </A>
        </Show>
      </div>
    </>
  );
};

export default MobileTopBar;
