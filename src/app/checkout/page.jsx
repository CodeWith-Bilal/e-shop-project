"use client";

import Notification from "@/components/Notification/page";
import { GlobalContext } from "@/context";
import { fetchAllAddresses } from "@/services/address";
import { createNewOrder } from "@/services/order";
import { callStripeSession } from "@/services/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import React,{ Suspense, useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
const Checkout = () => {
    const {
        cartItems,
        user,
        addresses,
        setAddresses,
        checkoutFormData,
        setCheckoutFormData,
      } = useContext(GlobalContext);
    
      const [selectedAddress, setSelectedAddress] = useState(null);
      const [isOrderProcessing, setIsOrderProcessing] = useState(false);
      const [orderSuccess, setOrderSuccess] = useState(false);
    
      const router = useRouter();
    
      const publishableKey =process.env.PUBLISHABLE_KEY;
      const stripePromise = loadStripe(publishableKey);
    
    
      async function getAllAddresses() {
        const res = await fetchAllAddresses(user?._id);
    
        if (res.success) {
          setAddresses(res.data);
        }
      }
    
      useEffect(() => {
        if (user !== null) getAllAddresses();
      }, [user]);
    
      useEffect(() => {
        async function createFinalOrder() {
          const isStripe = JSON.parse(localStorage.getItem("stripe"));
    
          if (
            isStripe &&
            cartItems &&
            cartItems.length > 0
          ) {
            setIsOrderProcessing(true);
            const getCheckoutFormData = JSON.parse(
              localStorage.getItem("checkoutFormData")
            );
    
            const createFinalCheckoutFormData = {
              user: user?._id,
              shippingAddress: getCheckoutFormData.shippingAddress,
              orderItems: cartItems.map((item) => ({
                qty: 1,
                product: item.productID,
              })),
              paymentMethod: "Stripe",
              totalPrice: cartItems.reduce(
                (total, item) => item.productID.price + total,
                0
              ),
              isPaid: true,
              isProcessing: true,
              paidAt: new Date(),
            };
    
            const res = await createNewOrder(createFinalCheckoutFormData);
    
            if (res.success) {
              setIsOrderProcessing(false);
              setOrderSuccess(true);
              toast.success(res.message);
            } else {
              setIsOrderProcessing(false);
              setOrderSuccess(false);
              toast.error(res.message);
            }
          }
        }
    
        createFinalOrder();
      }, [cartItems]);
    
      function handleSelectedAddress(getAddress) {
        if (getAddress._id === selectedAddress) {
          setSelectedAddress(null);
          setCheckoutFormData({
            ...checkoutFormData,
            shippingAddress: {},
          });
    
          return;
        }
    
        setSelectedAddress(getAddress._id);
        setCheckoutFormData({
          ...checkoutFormData,
          shippingAddress: {
            ...checkoutFormData.shippingAddress,
            fullName: getAddress.fullName,
            city: getAddress.city,
            country: getAddress.country,
            postalCode: getAddress.postalCode,
            address: getAddress.address,
          },
        });
      }
    
      async function handleCheckout() {
        const stripe = await stripePromise;
    
        const createLineItems = cartItems.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              images: [item.productID.imageUrl],
              name: item.productID.name,
            },
            unit_amount: item.productID.price * 100,
          },
          quantity: 1,
        }));
    
        const res = await callStripeSession(createLineItems);
        setIsOrderProcessing(true);
        localStorage.setItem("stripe", true);
        localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));
    
        const { error } = await stripe.redirectToCheckout({
          sessionId: res.id,
        });
    
      }
    
    
      useEffect(() => {
        if (orderSuccess) {
          setTimeout(() => {
            router.push("/orders");
          }, [2000]);
        }
      }, [orderSuccess]);
    
      if (orderSuccess) {
        return (
          <section className="h-screen bg-gray-800">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
                <div className="bg-gray-700 shadow">
                  <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                    <h1 className="font-bold text-lg text-gray-200">
                      Your payment is successfull and you will be redirected to
                      orders page in 2 seconds !
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }
    
      if (isOrderProcessing) {
        return (
          <div className="w-full min-h-screen flex justify-center items-center">
            <PulseLoader
              color={"#ffffff"}
              loading={isOrderProcessing}
              size={30}
              data-testid="loader"
            />
          </div>
        );
      }
    
      return (
        <div>
          <Suspense fallback={null}>
          <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 bg-gray-800">
            <div className="px-4 pt-8">
              <p className="font-medium text-xl">Cart Summary</p>
              <div className="mt-8 space-y-3 rounded-lg border bg-gray-700 px-2 py-4 sm:px-5">
                {cartItems && cartItems.length ? (
                  cartItems.map((item) => (
                    <div
                      className="flex flex-col rounded-lg bg-gray-600 sm:flex-row"
                      key={item._id}
                    >
                      <img
                        src={item && item.productID && item.productID.imageUrl}
                        alt="Cart Item"
                        className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      />
                      <div className="flex w-full flex-col px-4 py-4">
                        <span className="font-bold text-gray-200">
                          {item && item.productID && item.productID.name}
                        </span>
                        <span className="font-semibold text-gray-200">
                          {item && item.productID && item.productID.price}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>Your cart is empty</div>
                )}
              </div>
            </div>
            <div className="mt-10 bg-gray-700 px-4 pt-8 lg:mt-0">
              <p className="text-xl font-medium">Shipping address details</p>
              <p className="text-gray-300 font-bold">
                Complete your order by selecting address below
              </p>
              <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
                {addresses && addresses.length ? (
                  addresses.map((item) => (
                    <div
                      onClick={() => handleSelectedAddress(item)}
                      key={item._id}
                      className={`border p-6 ${
                        item._id === selectedAddress ? "border-red-500" : ""
                      }`}
                    >
                      <p>Name : {item.fullName}</p>
                      <p>Address : {item.address}</p>
                      <p>City : {item.city}</p>
                      <p>Country : {item.country}</p>
                      <p>PostalCode : {item.postalCode}</p>
                      <button className="rounded-lg mt-5 mr-5 inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                        {item._id === selectedAddress
                          ? "Selected Address"
                          : "Select Address"}
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No addresses added</p>
                )}
              </div>
              <button
                onClick={() => router.push("/account")}
                className="mt-5 mr-5 inline-block btn btn-outline btn-accent px-5 py-3 text-xs font-medium uppercase tracking-wide"
              >
                Add new address
              </button>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-200">Subtotal</p>
                  <p className="text-lg font-bold text-gray-200">
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
                  <p className="text-sm font-medium text-gray-200">Shipping</p>
                  <p className="text-lg font-bold text-gray-200">Free</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-200">Total</p>
                  <p className="text-lg font-bold text-gray-200">
                    $
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) => item.productID.price + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>
                <div className="pb-10">
                  <button
                    disabled={
                      (cartItems && cartItems.length === 0) ||
                      Object.keys(checkoutFormData.shippingAddress).length === 0
                    }
                    onClick={handleCheckout}
                    className="disabled:bg-gray-700 disabled:text-white mt-5 mr-5 w-full  inline-block btn btn-outline btn-accent px-5 py-3 text-xs font-medium uppercase tracking-wide"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Notification />
          </Suspense>
        </div>
      );
}

export default Checkout
