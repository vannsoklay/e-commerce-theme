import { A } from "solid-start";
import Button from "./Button";
import { FiShoppingCart } from "solid-icons/fi";

export const EmptyCart = () => {
  return (
    <div class="container mx-auto h-[48vh] flex justify-center items-center">
      <main class="text-center">
        <h1 class="text-2xl font-bold text-red-500 pb-4">Empty Cart</h1>
        <A href="/products">
          <Button.Action class="w-64 rounded-full">
            <FiShoppingCart class="text-xl" />
            More Products
          </Button.Action>
        </A>
      </main>
    </div>
  );
};
