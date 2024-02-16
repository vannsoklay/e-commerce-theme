import { A } from "@solidjs/router";
import { Logo } from "../Logo";
import { Show } from "solid-js";
import { useAuth } from "~/contexts/useAuth";
import { useCart } from "~/contexts/useCart";
import { TbShoppingCart } from "solid-icons/tb";
import { TbHistory, TbLogout, TbTruckDelivery, TbUser } from "solid-icons/tb";
import { RiUserFacesAccountCircleFill } from "solid-icons/ri";
import { useNavigate } from "solid-start";

const Navbar = () => {
  const { cartItems, logout } = useCart();
  const { user, loading } = useAuth();
  const navigator = useNavigate();

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
                  class="btn btn-ghost btn-circle text-primary font-bold text-2xl bg-primary/20 hover:bg-primary/20 placeholder"
                >
                  <span>{user().fullname?.charAt(0).toUpperCase()}</span>
                </label>
                <ul
                  tabIndex={0}
                  class="p-2 shadow menu dropdown-content z-50 bg-base-100 rounded-box w-52 mt-2"
                >
                  <li>
                    <A
                      href={`/me/@${user()?.fullname?.toLowerCase()}`}
                      class="flex py-2 place-content-between"
                    >
                      Profile
                      <button class="btn btn-circle btn-sm bg-primary/20 ">
                        <TbUser size={18} class="text-primary" />
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
                        <TbHistory size={18} class="text-primary" />
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
                        <TbTruckDelivery size={18} class="text-primary" />
                      </button>
                    </A>
                  </li>
                  <li>
                    <A
                      class="flex py-2 place-content-between text-primary"
                      href="/logout"
                      onClick={(e) => {
                        e.preventDefault();
                        logout();
                        window?.location.replace("/");
                      }}
                    >
                      Logout
                      <button class="btn btn-circle btn-sm bg-primary/20">
                        <TbLogout size={18} class="text-primary" />
                      </button>
                    </A>
                  </li>
                </ul>
              </div>
            </Show>
          </Show>
        </div>
      </div>
      {/* mobile responsive */}
      <div class=" flex sm:flex lg:hidden justify-between w-full">
        <Logo />
        <Show
          when={user()}
          fallback={
            <A
              href={`https://backend.riverbase.org/sso/store`}
              class="border-none bg-transparent"
            >
              <button class="btn btn-ghost btn-sm" tabIndex={0}>
                <RiUserFacesAccountCircleFill size={40} class="text-gray-500" />
              </button>
            </A>
          }
        >
          <A
            href={`me/@${user()?.fullname?.toLowerCase()}`}
            class="border-none bg-transparent"
            onClick={(e) => e.preventDefault()}
          >
            <div class="dropdown dropdown-bottom dropdown-end">
              <label
                tabIndex={0}
                class="btn btn-ghost btn-circle text-primary font-bold text-2xl bg-primary/20 hover:bg-primary/20 placeholder"
              >
                <span>{user().fullname?.charAt(0).toUpperCase()}</span>
              </label>
              <ul
                tabIndex={0}
                class="dropdown-content z-50 menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <label
                    onClick={() =>
                      navigator(`/me/@${user()?.fullname?.toLowerCase()}`)
                    }
                    class="flex py-2 place-content-between"
                  >
                    Profile
                    <button class="btn btn-circle btn-sm bg-primary/20 ">
                      <TbUser size={18} class="text-primary" />
                    </button>
                  </label>
                </li>
                <li>
                  <label
                    onClick={() => navigator(`/me/history`)}
                    class="flex py-2 place-content-between"
                  >
                    History
                    <button class="btn btn-circle btn-sm bg-primary/20">
                      <TbHistory size={18} class="text-primary" />
                    </button>
                  </label>
                </li>
                <li>
                  <label
                    onClick={() => navigator(`me/delivery`)}
                    class="flex py-2 place-content-between"
                  >
                    Delivery
                    <button class="btn btn-circle btn-sm bg-primary/20">
                      <TbTruckDelivery size={18} class="text-primary" />
                    </button>
                  </label>
                </li>
                <li>
                  <A
                    class="flex py-2 place-content-between text-primary"
                    href="/logout"
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                      window?.location.replace("/");
                    }}
                  >
                    Logout
                    <button class="btn btn-circle btn-sm bg-primary/20">
                      <TbLogout size={18} class="text-primary" />
                    </button>
                  </A>
                </li>
              </ul>
            </div>
          </A>
        </Show>
      </div>
    </div>
  );
};

export default Navbar;
