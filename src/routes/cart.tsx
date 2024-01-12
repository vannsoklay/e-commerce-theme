import { For, Show, createEffect, createSignal } from "solid-js";

import { A } from "solid-start";
import Button from "~/components/Button";
import { EmptyCart } from "~/components/Empty";
import { FiShoppingCart } from "solid-icons/fi";
import { useCart } from "~/contexts/useCart";

export default function Cart() {
  const { cartItems, addToCart, minusCart, removeFromCart } = useCart();

  const [price, setPrice] = createSignal(0);
  createEffect(() => {
    const subtotal: number[] = [];
    cartItems.map((product) =>
      subtotal.push(product.quantity * product.product.price)
    );
    const Subtotal: any = subtotal.reduce((accumulator, value) => {
      return accumulator + value;
    }, 0);
    setPrice(Subtotal);
  });
  return (
    <main class="mx-auto text-gray-700 p-4">
      <Show when={cartItems.length > 0} fallback={<EmptyCart />}>
        <div class="mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl px-4 md:px-24 lg:px-24 xl:px-24 2xl:px-0">
          <h2 class="text-2xl opacity-50 font-bold mb-8">Shopping Cart</h2>
          <div class="grid md:grid-cols-5 md:gap-20">
            <div class="md:col-span-3">
              <div class="backdrop-blur-sm bg-white bg-opacity-80 space-y-4 divide-y">
                <For each={cartItems}>
                  {(cartItem) => {
                    return (
                      <Show when={cartItem} fallback={<p>Loading...</p>}>
                        <div class="md:flex md:justify-between md:items-center pt-6 bg-slate-50 px-4 rounded-md">
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="avatar">
                                <div class="w-24 rounded">
                                  <img
                                    src={`${
                                      import.meta.env.VITE_VARIABLE_IPFS
                                    }/api/ipfs?hash=${
                                      cartItem?.product?.preview
                                    }`}
                                    alt=""
                                    class="rounded-md"
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <h1>{cartItem.product?.name}</h1>
                              <div class="flex">
                                <p>
                                  {cartItem.product.price.toLocaleString()} x
                                  {cartItem.quantity}
                                </p>
                                =
                                <p class="font-bold mr-4">
                                  $
                                  {(
                                    cartItem.product.price * cartItem.quantity
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="flex space-x-7 items-center md:mt-0 mt-2">
                            <div class="flex space-x-3 items-center">
                              {cartItem.quantity === 1 ? (
                                <div class="bg-gray-100 p-1 rounded-full cursor-pointer">
                                  <div>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="w-5 h-5 text-gray-600"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              ) : (
                                <div class="bg-orange-100 p-1 rounded-full cursor-pointer">
                                  <div
                                    onclick={() => minusCart(cartItem.product)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="w-5 h-5 text-orange-600"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              )}

                              <div class="bg-green-100 p-1 rounded-full cursor-pointer">
                                <div
                                  onclick={() => addToCart(cartItem.product)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-5 h-5 text-green-600"
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div
                              onClick={() =>
                                removeFromCart(cartItem.product.id)
                              }
                              class="bg-red-100 p-1 rounded-full cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="w-4 h-4 text-red-500"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </Show>
                    );
                  }}
                </For>
              </div>
              <A href="/products">
                <Button.Primary class="w-full rounded-full my-8">
                  <FiShoppingCart class="text-xl" />
                  More Products
                </Button.Primary>
              </A>
            </div>

            <div class="md:col-span-2 border bg-slate-50/10 p-4 rounded-xl h-auto">
              <div class="grid grid-cols-1 justify-start">
                <h1 class="font-bold text-lg uppercase">Summary</h1>
              </div>
              <div class="divider mt-2"></div>
              <div class="grid grid-cols-2">
                <div class="col-span-1 flex justify-start text-md">
                  Subtotal
                </div>
                <div class="col-span-1 font-bold flex justify-end">
                  {price()} USD
                </div>
              </div>
              <div class="grid grid-cols-2 md:mt-2">
                <div class="col-span-1 flex justify-start text-md">
                  Shipping
                </div>
                <div class="col-span-1 font-bold flex justify-end">0 USD</div>
              </div>
              <div class="grid grid-cols-2 md:mt-2">
                <div class="col-span-1 flex justify-start text-md">
                  Estimated Tax
                </div>
                <div class="col-span-1 font-bold flex justify-end">-</div>
              </div>
              <div class="divider my-2"></div>
              <div class="grid grid-cols-2 flex justify-start">
                <div class="col-span-1 flex justify-start text-md">Total</div>
                <h1 class="font-bold uppercase flex justify-end">
                  {price()} USD
                </h1>
              </div>
              <div class="pt-6">
                <A href="/checkouts">
                  <Button.Primary class="w-full rounded-full">
                    Checkout
                  </Button.Primary>
                </A>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </main>
  );
}
