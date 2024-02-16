import { DELIVERIES, DELIVERIES_EXPRESS } from "~/libs/graphql/delivery";
import { FaSolidCircleCheck, FaSolidPhone } from "solid-icons/fa";
import { For, Show, createEffect, createSignal } from "solid-js";
import { SubmitHandler, createForm, required } from "@modular-forms/solid";
import { client, clientQuery } from "~/libs/client";
import { CHECKOUT_PRODUCT } from "~/libs/graphql/checkout";
import { CheckoutType } from "~/types/checkout";
import { DeliveryForm } from "~/components/forms/DeliveryForm";
import { Dialog } from "~/components/Dialog";
import { EmptyCart } from "~/components/Empty";
import { ORDER_PRODUCT } from "~/libs/graphql/order";
import PrivateLayout from "~/components/layout/Private";
import toast, { Toaster } from "solid-toast";

import { useCart } from "~/contexts/useCart";
import { useNavigate } from "solid-start";
import { formatToUSD } from "~/utils/usd";
import { TbMinus, TbPlus, TbTrash } from "solid-icons/tb";
import { BsCheckCircleFill, BsCheckCircle } from "solid-icons/bs";

export default function Checkout() {
  const navigate = useNavigate();
  const [open, setOpen] = createSignal<string | null>(null);
  const [_, { Form, Field }] = createForm<CheckoutType>();

  const [process, setProcess] = createSignal(false);
  const { cartItems, minusCart, removeFromCart, addToCart, cleanCartItems } =
    useCart();

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

  const handleCheckout: SubmitHandler<CheckoutType> = (values) => {
    if (!values.payment) {
      toast.error("Payment is required!");
      return;
    }
    if (!values.delivery_option) {
      toast.error("Your location is required!");
      return;
    }
    const carts = cartItems.map((cart) => {
      setProcess(true);
      return {
        productId: cart.product.id,
        variantId: cart.product.variantId,
        qty: cart.quantity,
        unitPrice: parseInt(cart.product.price.toString()),
      };
    });
    const variables = {
      input: {
        carts: carts,
        currency: "USD",
        totalPrice: price(),
        type: "USER",
      },
    };

    client
      .mutation(ORDER_PRODUCT, variables)
      .toPromise()
      .then((res) => {
        if (res.error) {
          return toast.error(res.error.message);
        }
        client
          .mutation(CHECKOUT_PRODUCT, {
            orderId: res.data.storeCreateOrder.id,
            payment: values.payment,
            deliveryOptionId: values.delivery_option,
            deliveryId: null,
          })
          .toPromise()
          .then((_) => {
            if (res.error) {
              return toast.error(res.error.message);
            }
            setTimeout(() => {
              setProcess(false);
              setOpen(() => "my_modal_2");
            }, 1000);
          });
      });
  };

  return (
    <PrivateLayout>
      <Toaster position="top-right" />
      <Show when={cartItems.length > 0} fallback={<EmptyCart />}>
        <Form onSubmit={handleCheckout} class="p-4">
          <Dialog
            modalId={open}
            classes="sm:w-1/2 h-1/2 sm:h-12 lg:h-1/2 flex justify-center text-center rounded-xl"
          >
            <div class="w-full h-full space-y-2">
              <div class="flex justify-center font-bold text-2xl">
                You've successfully purchased the products!
              </div>
              <img
                alt=""
                src="/images/cta.png"
                class="h-64 sm:h-64 lg:h-2/3 mx-auto flex-grow"
              />
              <button
                class="btn btn-primary rounded-box sm:w-full w-2/3"
                onClick={(e) => {
                  e.preventDefault();
                  cleanCartItems();
                  navigate("/me/history");
                }}
              >
                Continue
              </button>
            </div>
          </Dialog>
          <div>
            <div class="grid md:grid-cols-2 gap-8 mt-8">
              {/* delivery */}
              <DeliveryOptionMobile Field={Field} />
              <main class=" md:block hidden ">
                <div class="p-5 rounded-xl shadow-sm">
                  <DeliveryOption Field={Field} />
                  <div class="flex justify-start">
                    <h1 class="text-xl font-semibold pb-8">Payments</h1>
                  </div>
                  <div class="grid grid-cols-2 gap-4">
                    <For
                      each={[
                        { label: "cash", value: "CASH" },
                        { label: "credit", value: "credit-debit-card" },
                        { label: "ABA Pay", value: "aba-pay" },
                        { label: "Wing Pay", value: "wing-pay" },
                        {
                          label: "Chip Mong Bank",
                          value: "chip-mong-bank",
                        },
                        { label: "Acleda Pay", value: "xpay" },
                      ]}
                    >
                      {({ value }, index) => (
                        <Field
                          name="payment"
                          // validate={[required("Please select your payment.")]}
                        >
                          {(field, props) => (
                            <div
                              class={`rounded-xl p-3 `}
                              classList={{
                                "ring ring-primary":
                                  field.value?.includes(value),
                              }}
                            >
                              <label class="w-full flex gap-6 items-center cursor-pointer ">
                                <input
                                  {...props}
                                  class="radio radio-primary"
                                  type="radio"
                                  disabled={value === "CASH" ? false : true}
                                  value={value}
                                  checked={field.value?.includes(value)}
                                />
                                <img
                                  class="h-10"
                                  src={`/images/banks/${value}.png`}
                                  alt=""
                                />
                              </label>
                            </div>
                          )}
                        </Field>
                      )}
                    </For>
                  </div>
                </div>
                {/* <Delivery Field={Field} /> */}
              </main>
              <main class="w-full">
                <div class="py-6 rounded-xl space-y-3">
                  <h1 class="text-xl font-semibold pb-2">
                    My shopping bag ({cartItems.length})
                  </h1>
                  <For each={cartItems}>
                    {(cartItem) => {
                      return (
                        <Show when={cartItem} fallback={null}>
                          <div class="border border-primary/30 bg-base-100 md:flex md:justify-between items-center p-4 rounded-box">
                            <div class="flex items-center space-x-3">
                              <img
                                src={`${
                                  import.meta.env.VITE_VARIABLE_IPFS
                                }/api/ipfs?hash=${cartItem?.product?.preview}`}
                                alt="product image"
                                class="rounded-md w-16 h-24 sm:w-16 lg:w-24 object-contain bg-base-100"
                              />
                              <div>
                                <h1>{cartItem.product?.name}</h1>
                                <div class="hidden sm:hidden lg:flex items-center">
                                  <p>
                                    {cartItem.product.price.toLocaleString()} x
                                    {cartItem.quantity}
                                  </p>
                                  =
                                  <p class="font-bold text-primary pl-3">
                                    $
                                    {(
                                      cartItem.product.price * cartItem.quantity
                                    ).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="flex items-center justify-between">
                              <div class="flex sm:flex lg:hidden items-center">
                                <p>
                                  {cartItem.product.price.toLocaleString()} x
                                  {cartItem.quantity}
                                </p>
                                =
                                <p class="font-bold text-primary pl-3">
                                  $
                                  {(
                                    cartItem.product.price * cartItem.quantity
                                  ).toLocaleString()}
                                </p>
                              </div>
                              <div class="flex space-x-7 items-center justify-end md:mt-0 mt-2">
                                <div class="flex space-x-3 items-center">
                                  {cartItem.quantity === 1 ? (
                                    <div class="btn btn-xs btn-circle btn-outline btn-disabled">
                                      <TbMinus />
                                    </div>
                                  ) : (
                                    <div
                                      onclick={() =>
                                        minusCart(
                                          cartItem.product,
                                          cartItem.product.variantId
                                            ? true
                                            : false
                                        )
                                      }
                                      class="btn btn-xs btn-circle btn-outline btn-error"
                                    >
                                      <TbMinus />
                                    </div>
                                  )}

                                  <div class="p-1 rounded-box cursor-pointer">
                                    <div
                                      onclick={() =>
                                        addToCart(
                                          cartItem.product,
                                          cartItem.product.variantId
                                            ? true
                                            : false
                                        )
                                      }
                                      class="btn btn-xs btn-circle btn-outline btn-success"
                                    >
                                      <TbPlus />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  onClick={() =>
                                    removeFromCart(
                                      cartItem.product.variantId
                                        ? cartItem.product.variantId
                                        : cartItem.product.id,
                                      cartItem.product.variantId ? true : false
                                    )
                                  }
                                  class="btn btn-xs btn-circle btn-outline btn-error"
                                >
                                  <TbTrash />
                                </div>
                              </div>
                            </div>
                          </div>
                        </Show>
                      );
                    }}
                  </For>
                </div>
                <div class="md:col-span-2 mt-9 md:mt-6 py-4 rounded-xl">
                  <div class="grid grid-cols-1 justify-start">
                    <h1 class="font-bold uppercase">Summary</h1>
                  </div>
                  <div class="divider mt-2"></div>
                  <div class="grid grid-cols-2">
                    <div class="col-span-1 flex justify-start text-md">
                      Subtotal
                    </div>
                    <div class="col-span-1 font-bold flex justify-end">
                      {formatToUSD(price())}
                    </div>
                  </div>
                  <div class="grid grid-cols-2 md:mt-2">
                    <div class="col-span-1 flex justify-start text-md">
                      Estimated Shipping & Handling
                    </div>
                    <div class="col-span-1 font-bold flex justify-end">
                      {formatToUSD(price())}
                    </div>
                  </div>
                  <div class="grid grid-cols-2 md:mt-2">
                    <div class="col-span-1 flex justify-start text-md">
                      Estimated Tax
                    </div>
                    <div class="col-span-1 font-bold flex justify-end">-</div>
                  </div>
                  <div class="divider my-2"></div>
                  <div class="grid grid-cols-2 justify-start">
                    <div class="col-span-1 flex justify-start text-md">
                      Total
                    </div>
                    <h1 class="font-bold uppercase flex justify-end text-primary text-xl">
                      {formatToUSD(price())}
                    </h1>
                  </div>

                  <div class="md:pt-6 pt-10">
                    <button
                      type="submit"
                      class="btn btn-primary w-full rounded-box"
                    >
                      {process() ? (
                        <span class="loading loading-spinner"></span>
                      ) : (
                        "Pay"
                      )}
                    </button>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </Form>
      </Show>
    </PrivateLayout>
  );
}

const Delivery = ({ Field }: any) => {
  const [data] = clientQuery(DELIVERIES_EXPRESS, {});

  return (
    <Show when={!data.loading} fallback={<div>loading...</div>}>
      <h1 class="collapse-title text-xl font-semibold px-0 py-8">
        Delivery Options
      </h1>
      <div class="pb-8 ">
        <Show when={data().storeDeliveriesExpress.length > 0} fallback={null}>
          <section class="grid grid-cols-2 gap-3 items-center px-2 pb-6">
            <For each={data().storeDeliveriesExpress} fallback={null}>
              {(delivery) => {
                return (
                  <Field
                    name="delivery_express"
                    validate={[required("Please select your delivery.")]}
                  >
                    {(field: any, props: any) => (
                      <label class="cursor-pointer ">
                        <input
                          {...props}
                          type="radio"
                          value={delivery.id}
                          checked={field.value?.includes(delivery.id)}
                          class="radio peer sr-only"
                          required
                          name="delivery_express"
                        />
                        <div class="w-full grid grid-cols-4 gap-3 rounded-md p-5 text-gray-600 ring-2 ring-transparent transition-all hover:shadow peer-checked:text-primary peer-checked:ring-primary peer-checked:ring-offset-2">
                          <div class="avatar col-span-1">
                            <div class="w-12 rounded-xl">
                              <img
                                src={`${
                                  import.meta.env.VITE_VARIABLE_IPFS
                                }/api/ipfs?hash=${delivery?.logo}`}
                                alt={delivery.name}
                              />
                            </div>
                          </div>
                          <div class="col-span-3">
                            <div class="flex items-center gap-6 justify-between">
                              <p class="text-sm font-semibold uppercase text-pimary">
                                {delivery.name}
                              </p>
                              <FaSolidCircleCheck class="text-xl" />
                            </div>
                            <div class="flex gap-3 items-center">
                              <FaSolidPhone class="text-sm" />
                              <p class="text-sm font-medium">
                                {delivery.phoneNumber}
                              </p>
                            </div>
                          </div>
                        </div>
                      </label>
                    )}
                  </Field>
                );
              }}
            </For>
          </section>
        </Show>
      </div>
    </Show>
  );
};

const DeliveryOption = ({ Field }: any) => {
  const [data, { refetch }] = clientQuery(DELIVERIES, {});

  return (
    <Show when={!data.loading} fallback={null}>
      <div class="leading-0">
        <h1 class="collapse-title text-xl font-semibold p-0 m-0">
          Delivery Location
        </h1>
        <span class="relative -top-6">Select your location here.</span>
      </div>
      <div class="collapse  collapse-plus mb-6 border border-primary/30">
        <input type="checkbox" />
        <div class="collapse-title text-md font-medium">Add new location</div>
        <div class="collapse-content">
          <DeliveryForm refetch={refetch} />
        </div>
      </div>
      <Show when={data().deliveries.length > 0} fallback={null}>
        <section class="flex flex-wrap gap-3 flex-col  mb-6 relative">
          <For each={data().deliveries} fallback={null}>
            {(delivery) => {
              return (
                <Field
                  name="delivery_option"
                  // validate={[required("Please select your delivery option.")]}
                >
                  {(field: any, props: any) => (
                    <label class="cursor-pointer ">
                      <input
                        {...props}
                        type="radio"
                        value={delivery.id}
                        checked={field.value?.includes(delivery.id)}
                        class="radio peer sr-only"
                        required
                        name="delivery"
                      />
                      <div class="rounded-xl p-5 text-gray-600 ring-2 ring-transparent transition-all peer-checked:text-primary peer-checked:ring-primary peer-checked:ring-offset-2">
                        <div class="flex items-center gap-6 justify-between">
                          <p class="text-sm font-semibold uppercase text-pimary">
                            {delivery.address}
                          </p>
                          {field.value?.includes(delivery.id) ? (
                            <BsCheckCircleFill class="text-xl" />
                          ) : (
                            <BsCheckCircle class="text-xl" />
                          )}
                        </div>
                        <div class="flex gap-3 items-center">
                          <FaSolidPhone class="text-sm" />
                          <p class="text-sm font-medium">
                            {delivery.phoneNumber}
                          </p>
                        </div>
                      </div>
                    </label>
                  )}
                </Field>
              );
            }}
          </For>
        </section>
      </Show>
    </Show>
  );
};

const DeliveryOptionMobile = ({ Field }: any) => {
  const [data, { refetch }] = clientQuery(DELIVERIES, {});

  return (
    <main class="mt-6 md:hidden">
      <div class="grid grid-cols-1 justify-start">
        <Show when={!data.loading} fallback={null}>
          <div class="leading-0">
            <h1 class="collapse-title text-xl font-semibold p-0 m-0">
              Delivery Location
            </h1>
            <span class="relative -top-6">Select your location here.</span>
          </div>
          <div class="collapse  collapse-plus mb-6 border border-primary/30">
            <input type="checkbox" />
            <div class="collapse-title text-md font-medium">
              Add new location
            </div>
            <div class="collapse-content">
              <DeliveryForm refetch={refetch} />
            </div>
          </div>

          <div class="pb-8 px-4">
            <div class="flex justify-start">
              <div class="gird grid-cols-1 space-y-6">
                <For each={data().deliveries} fallback={null}>
                  {(delivery) => (
                    <Field name="delivery_option">
                      {(field: any, props: any) => (
                        <label class="w-full flex col-span-8 gap-6 items-center">
                          <input
                            {...props}
                            classList={{
                              "radio-primary": field.value?.includes(
                                delivery.id
                              ),
                            }}
                            class="radio"
                            type="radio"
                            value={delivery.id}
                            checked={field.value?.includes(delivery.id)}
                            required
                          />
                          <div>{delivery.address}</div>
                        </label>
                      )}
                    </Field>
                  )}
                </For>
              </div>
            </div>
          </div>
        </Show>
      </div>
      <div class="grid grid-cols-1 justify-start">
        <h1 class="font-bold text-xl">Payments</h1>
        <div class="flex justify-start w-full px-4 mt-8">
          <div class="grid grid-cols-8 gap-4 space-y-4">
            <For
              each={[
                { label: "cash", value: "CASH" },
                { label: "credit", value: "credit-debit-card" },
                { label: "ABA Pay", value: "aba-pay" },
                { label: "Wing Pay", value: "wing-pay" },
                {
                  label: "Chip Mong Bank",
                  value: "chip-mong-bank",
                },
                { label: "Acleda Pay", value: "xpay" },
              ]}
            >
              {({ value }) => (
                <Field name="payment">
                  {(field: any, props: any) => (
                    <label class="w-full flex col-span-8 gap-6 items-center">
                      <input
                        {...props}
                        class="radio"
                        classList={{
                          "radio-primary": field.value?.includes(value),
                        }}
                        type="radio"
                        disabled={value === "CASH" ? false : true}
                        value={value}
                        checked={field.value?.includes(value)}
                        required
                      />
                      <img
                        class="h-12"
                        src={`/images/banks/${value}.png`}
                        alt=""
                      />
                    </label>
                  )}
                </Field>
              )}
            </For>
          </div>
        </div>
      </div>
    </main>
  );
};
