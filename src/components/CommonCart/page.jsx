import { useRouter } from "next/navigation";
import React from "react";
import ComponentLevelLoader from "../Loader/componentlevel/page";

const CommonCart = ({
  cartItems = [],
  handleDeleteCartItem,
  componentLevelLoader,
}) => {

    const router = useRouter()
  return(
    <section className="h-screen bg-gray-800">
    <div className="mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-700 shadow">
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              {cartItems && cartItems.length ? (
                <ul className="-my-8">
                  {cartItems.map((cartItem) => (
                    <li
                      className="flex-col flex space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                      key={cartItem.id}
                    >
                      <div className="shrink-0">
                        <img
                          src={
                            cartItem &&
                            cartItem.productID &&
                            cartItem.productID.imageUrl
                          }
                          alt="Product image"
                          className="h-24 w-25 max-w-full rounded-lg object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                          <div className="pr-8 sm:pr-4">
                            <p className="text-base font-semibold text-gray-200">
                              {cartItem &&
                                cartItem.productID &&
                                cartItem.productID.name}
                            </p>
                          </div>
                          <div className="mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <p className="shrink-0 w-20 text-base font-semibold text-gray-200 sm:order-1 sm:ml-8 sm:text-right">
                              $
                              {cartItem &&
                                cartItem.productID &&
                                cartItem.productID.price}
                            </p>
                            <button
                              type="button"
                              className="font-medium btn btn-outline btn-error sm:order-2"
                              onClick={() =>
                                handleDeleteCartItem(cartItem._id)
                              }
                            >
                              {componentLevelLoader &&
                              componentLevelLoader.loading &&
                              componentLevelLoader.id === cartItem._id ? (
                                <ComponentLevelLoader
                                  text={"Removing"}
                                  color={"#ffffff"}
                                  loading={
                                    componentLevelLoader &&
                                    componentLevelLoader.loading
                                  }
                                />
                              ) : (
                                "Remove"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <h1 className="font-bold text-lg text-gray-200">Your cart is Empty !</h1>
              )}
            </div>
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-200">Subtotal</p>
                <p className="text-lg text-gray-200 font-semibold">
                  $
                  {cartItems && cartItems.length
                    ? cartItems.reduce(
                        (total, item) => item.productID.price + total,
                        0
                      )
                    : "0"}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-200">Shipping</p>
                <p className="text-lg text-gray-200 font-semibold">$0</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-200">Total</p>
                <p className="text-lg text-gray-200 font-semibold">
                  $
                  {cartItems && cartItems.length
                    ? cartItems.reduce(
                        (total, item) => item.productID.price + total,
                        0
                      )
                    : "0"}
                </p>
              </div>
              <div className="mt-5 text-center">
                <button
                onClick={()=>router.push('/checkout')}
                  disabled={cartItems && cartItems.length === 0}
                  className="disabled:opacity-50 group inline-flex w-full items-center justify-center btn btn-outline btn-accent text-lg text-white font-medium uppercase tracking-wide"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default CommonCart;
