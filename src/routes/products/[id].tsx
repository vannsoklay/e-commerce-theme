import { A, useParams } from "@solidjs/router";
import { Accessor, For, Show, createEffect, createSignal } from "solid-js";

import { AiFillStar } from "solid-icons/ai";
import { CartItem } from "~/types/global";
import { GET_PRODUCT } from "~/libs/graphql/product";
import Image from "~/components/Image";
import { ItemProduct } from "~/types/product";
import { LexicalViewer } from "~/components/LexicalViewer";
import { MeteTag } from "~/components/meta";
import { publicQuery } from "~/libs/client";
import toast from "solid-toast";
import { useCart } from "~/contexts/useCart";
import { useNavigate } from "@solidjs/router";
import { formatToUSD } from "~/utils/usd";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { addToCart, cartItems, addCarts } = useCart();
  const params = useParams<{ id: string }>();
  const [thumb, setThumb] = createSignal<number>(0);
  const [items, setItems] = createSignal<CartItem[]>([]);
  const [active, setActive] = createSignal<string>();

  const viewImage = () => {
    return `${import.meta.env.VITE_VARIABLE_IPFS}/api/ipfs?hash=${
      product()?.storeProduct?.previews[thumb()]
    }`;
  };

  const [product] = publicQuery(GET_PRODUCT, () => ({
    slug: params.id,
  }));

  const handleAddToCart = (product: ItemProduct) => {
    let p: ItemProduct = {
      variantId: null,
      id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      preview: product.preview,
    };
    addToCart(p, false);
  };

  const isInCart = (id: string) => {
    const data = cartItems.some((item: CartItem) => item?.product?.id === id);
    return data;
  };

  createEffect(() => {
    isInCart(product().storeProduct.id);
	console.log("items", items());
	
  });

  return (
    <>
      <MeteTag name="detail" />
      <div class="px-3 lg:px-16 pb-12 sm:pb-0">
        <div class="pt-6">
          <Show when={product()} fallback={<div>Loading ...</div>}>
            <Show
              when={!product().productStore}
              fallback={<div>Not Founded</div>}
            >
              <section class="container mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
                  <div class="col-span-1  lg:col-span-3 w-full gap-3 grid lg:grid-cols-6 ">
                    <Show
                      when={product().storeProduct.previews.length > 1}
                      fallback={null}
                    >
                      <div class="hidden lg:block hide-scroll-bar overflow-y-auto max-h-[45dvh] h-screen space-y-3">
                        <For each={product().storeProduct.previews}>
                          {(res: string, index: Accessor<number>) => {
                            return (
                              <div
                                onClick={() => setThumb(index())}
                                class="cursor-pointer overflow-hidden border border-base-300 rounded-box"
                              >
                                <img
                                  alt="previews"
                                  src={`${
                                    import.meta.env.VITE_VARIABLE_IPFS
                                  }/api/ipfs?hash=${res}`}
                                  class="w-48 h-28 object-contain hover:scale-110 duration-150 "
                                />
                              </div>
                            );
                          }}
                        </For>
                      </div>
                    </Show>
                    <div
                      class="hidden lg:block col-span-5 max-h-[45dvh] border border-base-300 bg-center rounded-box overflow-hidden"
                      classList={{
                        "col-span-full":
                          product().storeProduct.previews.length < 1,
                      }}
                      style={{
                        "background-image": `url("${viewImage()}")`,
                        "background-size": "200%",
                      }}
                    >
                      <div class="backdrop-blur-xl w-full h-full ">
                        <img
                          src={viewImage()}
                          alt=""
                          class="h-full w-auto object-contain mx-auto"
                        />
                      </div>
                    </div>

                    <div class="col-span-6 block lg:hidden w-full ">
                      <div class="w-full carousel rounded-box">
                        <For each={product().storeProduct.previews}>
                          {(res: string, index: Accessor<number>) => {
                            return (
                              <>
                                <div class="badge badge-ghost relative left-12">
                                  {index() + 1}/
                                  {product().storeProduct.previews.length}
                                </div>
                                <div
                                  class="carousel-item w-full"
                                  onScroll={() => {
                                    console.log("you changed");
                                  }}
                                  id={index().toString()}
                                >
                                  <img
                                    src={`${
                                      import.meta.env.VITE_VARIABLE_IPFS
                                    }/api/ipfs?hash=${res}`}
                                    class="w-full"
                                    alt="Tailwind CSS Carousel component"
                                  />
                                </div>
                              </>
                            );
                          }}
                        </For>
                      </div>
                    </div>

                    <div class="col-span-6">
                      {/* ------------Key features ---------- */}
                      <Show
                        when={product().storeProduct.detail}
                        fallback={null}
                      >
                        <section class="mt-9">
                          <h1 class="text-xl sm:text-2xl font-bold mb-6">
                            Description
                          </h1>
                          <div class="text-base-content/90">
                            <LexicalViewer
                              data={product()?.storeProduct?.detail}
                            />
                          </div>
                        </section>
                      </Show>
                    </div>
                  </div>
                  <div class="col-span-1 sm:col-span-2">
                    {/* -----review -------- */}

                    <div class="rating rating-sm mt-3">
                      <Show
                        when={product().storeProduct.rating}
                        fallback={null}
                      >
                        {Array(Math.floor(product().storeProduct.rating)).fill(
                          <AiFillStar class="text-primary text-xl" />
                        )}
                        {5 - Math.floor(product().storeProduct.rating) == 0 ? (
                          ""
                        ) : (
                          <AiFillStar class="text-gray-200 text-xl" />
                        )}
                      </Show>
                      <A
                        href="#"
                        class="ml-3 text-sm font-medium text-base-content"
                      >
                        99+ reviews
                      </A>
                    </div>
                    <h1 class="text-lg mb-2 font-bold tracking-tight text-base-content sm:text-2xl">
                      {product().storeProduct.title}
                    </h1>
                    <div class="mt-4 lg:row-span-3 lg:mt-0">
                      <h2 class="sr-only">Product information</h2>
                      <p class="text-xl sm:text-3xl tracking-tight text-primary font-semibold">
                        {formatToUSD(product().storeProduct.price)}
                      </p>

                      <Show when={product().storeProduct.desc} fallback={null}>
                        <p class="text-base text-base-content/90 mt-3">
                          {product().storeProduct.desc}
                        </p>
                      </Show>

                      <div class="mt-3">
                        <Show when={product().storeProduct.variants.length > 0}>
                          <h3 class="mb-5 text-lg font-medium text-gray-90">
                            Variants
                          </h3>
                        </Show>
                        <ul class="grid w-full gap-3 lg:grid-cols-2">
                          <For each={product().storeProduct.variants}>
                            {(res) => {
                              return (
                                <li>
                                  <input
                                    type="checkbox"
                                    id={res.preview}
                                    name="hosting"
                                    value={res.preview}
                                    class="hidden peer"
                                    required
                                    onChange={(e) => {
                                      e.preventDefault();
                                      const p: ItemProduct = {
                                        id: product().storeProduct.id,
                                        variantId: res.id,
                                        name: res.label,
                                        price: parseInt(res.price),
                                        currency:
                                          product().storeProduct.currency,
                                        preview:
                                          product().storeProduct.variants
                                            .length > 0
                                            ? res.preview
                                            : product().storeProduct.thumbnail,
                                      };
                                      const cart: CartItem = {
                                        product: p,
                                        quantity: 1,
                                      };
									 
									  const carts = items().filter((item) => item.product.variantId != res.id)
                                      items().map(
                                        (item) => item.product.variantId == res.id
                                      ).length < 0 ? 
                                        setItems([...items(), cart]) : setItems([...carts, cart]);

                                      setActive(() => res.id);
                                    }}
                                  />
                                  <label
                                    for={res.preview}
                                    class="inline-flex items-center justify-between w-full p-3 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100"
                                  >
                                    <div class="block">
                                      <img
                                        src={`${
                                          import.meta.env.VITE_VARIABLE_IPFS
                                        }/api/ipfs?hash=${res.preview}`}
                                        alt=""
                                        class="w-40 h-40 rounded-md"
                                      />
                                      <div class="w-full text-sm pt-2">
                                        {res.label}
                                      </div>
                                      <div class="text-md font-bold">
                                        {/* {product().storeProduct.currency ===
                                        "KHR"
                                          ? "៛"
                                          : "$"}
                                        {res.price} */}
                                        {formatToUSD(res.price)}
                                      </div>
                                    </div>
                                  </label>
                                </li>
                              );
                            }}
                          </For>
                        </ul>
                      </div>

                      {/* <div class="mt-6">
												<Show
													when={
														cartItems?.filter(
															(item: CartItem) => item.product.id == active()
														).length <= 0
													}
													fallback={
														<button
															type="submit"
															onClick={(e) => {
																e.stopPropagation();
																navigate(`/cart`);
															}}
															class="btn rounded-box w-full btn-primary"
														>
															View Cart
														</button>
													}
												>
													<Show
														when={!isInCart(product().storeProduct.id)}
														fallback={
															<button
																type="submit"
																onClick={(e) => {
																	e.stopPropagation();
																	navigate(`/cart`);
																}}
																class="btn rounded-box w-full btn-primary"
															>
																View Cart
															</button>
														}
													>
														<button
															onClick={(e) => {
																e.preventDefault();
																const p: ItemProduct = {
																	id: product().storeProduct.id,
																	name: product().storeProduct.title,
																	price: parseInt(product().storeProduct.price),
																	currency: product().storeProduct.currency,
																	preview: product().storeProduct.thumbnail,
																};
																product().storeProduct.variants.length > 0
																	? (addCarts(items()), setItems([]))
																	: handleAddToCart(p);
																toast.success("Added successfully!");
															}}
															class="btn rounded-box w-full btn-primary"
														>
															Add to cart
														</button>
													</Show>
												</Show>
											</div> */}

                      <div class="mt-10">
                        {cartItems?.filter(
                          (item: CartItem) => item.product.variantId == active()
                        ).length <= 0 ? (
                          !isInCart(product().storeProduct.id) ? (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                const p: ItemProduct = {
                                  id: product().storeProduct.id,
                                  variantId: null,
                                  name: product().storeProduct.title,
                                  price: parseInt(product().storeProduct.price),
                                  currency: product().storeProduct.currency,
                                  preview: product().storeProduct.thumbnail,
                                };
                                product().storeProduct.variants.length > 0
                                  ? (addCarts(items()), setItems([]))
                                  : (handleAddToCart(p),
                                    toast.success("Added successfully!"));
                              }}
                              class="btn rounded-box w-full btn-primary"
                            >
                              Add to cart
                            </button>
                          ) : (
                            <button
                              type="submit"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/cart`);
                              }}
                              class="btn rounded-box w-full btn-primary"
                            >
                              View Cart
                            </button>
                          )
                        ) : (
                          <button
                            type="submit"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/cart`);
                            }}
                            class="btn rounded-box w-full btn-primary"
                          >
                            View Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </Show>
          </Show>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
