import { Accessor, createEffect, createSignal, For, Show } from "solid-js";
import { A, useParams } from "@solidjs/router";
import { useCart } from "~/contexts/useCart";
import { useNavigate } from "@solidjs/router";
import Image from "~/components/Image";
import { publicQuery } from "~/libs/client";
import { GET_PRODUCT } from "~/libs/graphql/product";
import { MeteTag } from "~/components/meta";
import { LexicalViewer } from "~/components/LexicalViewer";
import { AiFillStar } from "solid-icons/ai";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const params = useParams<{ id: string }>();
  const [thumb, setThumb] = createSignal<number>(0);

  const viewImage = () => {
    return `${import.meta.env.VITE_VARIABLE_IPFS}/api/ipfs?hash=${
      product()?.storeProduct?.previews[thumb()]
    }`;
  };

  const [product] = publicQuery(GET_PRODUCT, () => ({
    slug: params.id,
  }));

  const handleAddToCart = (product: ProductType) => {
    addToCart(product);
  };

  const isInCart = () => {
    const data = cartItems.some((item) => item?.product?.id === params.id);
    return data;
  };

  createEffect(() => {
    isInCart();
  });

  return (
    <>
      <MeteTag name="detail" />
      <div class="px-0 md:px-16">
        <div class="pt-6">
          <Show when={product()} fallback={<div>Loading ...</div>}>
            <Show
              when={!product().productStore}
              fallback={<div>Not Founded</div>}
            >
              <section>
                <div class="hidden md:block mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-6 lg:gap-x-4 lg:px-8">
                  <div class="col-span-5">
                    <div class="aspect-h-4 aspect-w-3 p-3 rounded-xl lg:block border mx-auto ">
                      <img
                        src={viewImage()}
                        alt=""
                        class="w-full h-[60dvh] rounded-lg object-contain object-center hover:scale-110 duration-150 animate-jump-in"
                      />
                    </div>
                  </div>
                  <div class="hide-scroll-bar overflow-y-auto h-[65dvh]">
                    <div class="space-y-4">
                      <For each={product().storeProduct.previews}>
                        {(res: string, index: Accessor<number>) => {
                          return (
                            <div
                              onClick={() => setThumb(index())}
                              class="cursor-pointer"
                            >
                              <Image
                                image={`${
                                  import.meta.env.VITE_VARIABLE_IPFS
                                }/api/ipfs?hash=${res}`}
                                name=""
                                width="w-full"
                                heigh="h-[12dvh]"
                                is_scale={true}
                              />
                            </div>
                          );
                        }}
                      </For>
                    </div>
                  </div>
                </div>

                <div class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                  <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                      {product().storeProduct.title}
                    </h1>
                  </div>

                  <div class="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 class="sr-only">Product information</h2>
                    <p class="text-5xl tracking-tight text-base-content font-semibold">
                      {product().storeProduct.currency === "KHR" ? "៛" : "$"}{product().storeProduct.price}
                    </p>

                    {/* -----review -------- */}

                    <div class="rating rating-sm mt-3">
                      {product().storeProduct.rating && (
                        <>
                          {Array(
                            Math.floor(product().storeProduct.rating)
                          ).fill(<AiFillStar class="text-warning text-xl" />)}
                          {5 - Math.floor(product().storeProduct.rating) ==
                          0 ? (
                            ""
                          ) : (
                            <AiFillStar class="text-gray-200 text-xl" />
                          )}
                        </>
                      )}
                      <A
                        href="#"
                        class="ml-3 text-sm font-medium text-base-content"
                      >
                        99+ reviews
                      </A>
                    </div>

                    <div class="mt-3">
                      <h3 class="mb-5 text-lg font-medium text-gray-900 dark:text-white">
                        Variants
                      </h3>
                      <ul class="grid w-full gap-3 md:grid-cols-2">
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
                                      class="w-full h-full rounded-md"
                                    />
                                    <div class="w-full text-sm pt-2">
                                      {res.label}
                                    </div>
                                  </div>
                                </label>
                              </li>
                            );
                          }}
                        </For>
                      </ul>
                    </div>

                    <form class="mt-10">
                      {!isInCart() ? (
                        <button
                          type="submit"
                          onClick={(e) => {
                            e.preventDefault(),
                              handleAddToCart(product().storeProduct);
                          }}
                          class="btn rounded-full w-full bg-action/10 text-action/80 hover:text-action hover:border-action hover:bg-action/10 border-none"
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
                          class="mt-10 flex w-full items-center justify-center rounded-full border border-transparent bg-danger px-8 py-3 text-base font-medium text-white hover:bg-danger/90 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          View Cart
                        </button>
                      )}
                    </form>
                  </div>

                  <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                    <div>
                      <h3 class="sr-only">Description</h3>

                      <div class="space-y-6">
                        <p class="text-base text-gray-900">
                          {product().storeProduct.desc}
                        </p>
                      </div>
                    </div>

                    {/* ------------Key features ---------- */}
                    <LexicalViewer data={product().storeProduct.detail} />
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
