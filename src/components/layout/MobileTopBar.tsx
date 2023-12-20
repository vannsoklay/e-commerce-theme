import {
  RiFinanceShoppingBagLine,
  RiFinanceShoppingBagFill,
  RiUserFacesAccountCircleLine,
  RiUserFacesAccountCircleFill,
  RiBuildingsHome4Line,
  RiBuildingsHome4Fill,
} from "solid-icons/ri";
import { Show } from "solid-js";
import { A, useLocation, useSearchParams } from "solid-start";
import { useAuth } from "~/contexts/useAuth";

const MobileTopBar = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <div class="btm-nav h-20 bg-white z-50 xl:hidden">
        <A href="/" class="border-none">
          <div class="h-10 w-10">
            <Show
              when={location.pathname === "/"}
              fallback={<RiBuildingsHome4Line class="h-full w-full" />}
            >
              <RiBuildingsHome4Fill class="h-full w-full" />
            </Show>
          </div>
        </A>

        <A href="/cart" class="border-none">
          <div class="h-10 w-10">
            <Show
              when={
                location.pathname === "/cart" ||
                location.pathname === "/checkouts"
              }
              fallback={<RiFinanceShoppingBagLine class="h-full w-full" />}
            >
              <RiFinanceShoppingBagFill class="h-full w-full" />
            </Show>
          </div>
        </A>

        <A href={`me/@${user()?.first_name?.toLowerCase()}`} class="border-none">
          <div class="h-10 w-10">
            <Show
              when={location.pathname.startsWith("/me")}
              fallback={<RiUserFacesAccountCircleLine class="h-full w-full" />}
            >
              <RiUserFacesAccountCircleFill class="h-full w-full" />
            </Show>
          </div>
        </A>
      </div>
  );
};

export default MobileTopBar;
