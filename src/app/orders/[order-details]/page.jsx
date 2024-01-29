"use client";

import { GlobalContext } from "@/context";
import { getOrderDetails } from "@/services/order";
import { useParams, useRouter } from "next/navigation";
import React,{ useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
const OrderDetails = () => {
    const {
        pageLevelLoader,
        setPageLevelLoader,
        orderDetails,
        setOrderDetails,
        user,
      } = useContext(GlobalContext);
    
      const params = useParams();
      const router = useRouter()
    
      async function extractOrderDetails() {
        setPageLevelLoader(true);
    
        const res = await getOrderDetails(params["order-details"]);
    
        if (res.success) {
          setPageLevelLoader(false);
          setOrderDetails(res.data);
        } else {
          setPageLevelLoader(false);
        }
    
        
      }
    
      useEffect(() => {
        extractOrderDetails();
      }, []);
    
      if (pageLevelLoader) {
        return (
          <div className="w-full min-h-screen flex justify-center items-center">
            <PulseLoader
              color={"#ffffff"}
              loading={pageLevelLoader}
              size={30}
              data-testid="loader"
            />
          </div>
        );
      }
    
      return (
        <div className="py-14 px-4 md:px-6 bg-gray-800">
          <div className="flex justify-start items-start space-y-2 flex-col">
            <h1 className="text-3xl lg:text-4xl font-bold leading-7 lg:leading-9 text-gray-200">
              Order #{orderDetails && orderDetails._id}
            </h1>
            <p className="text-base font-medium leadong-6 text-gray-300">
              {orderDetails &&
                orderDetails.createdAt &&
                orderDetails.createdAt.split("T")[0]}{" "}
              |{" "}
              {orderDetails &&
                orderDetails.createdAt &&
                orderDetails.createdAt.split("T")[1].split(".")[0]}
            </p>
          </div>
          <div className="mt-10 flex flex-col justify-center xl:flex-row items-stretch w-full xl:space-x-8 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start bg-gray-700 px-4 py-4 md:p-6 xl:p-8 w-full">
                <p className="font-bol text-lg text-gray-200">Your order summary</p>
                {orderDetails &&
                orderDetails.orderItems &&
                orderDetails.orderItems.length
                  ? orderDetails.orderItems.map((item) => (
                      <div
                        key={item._id}
                        className="text-gray-200 mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
                      >
                        <div className="pb-4 md:pb-8 w-full md:w-40">
                          <img
                            src={item && item.product && item.product.imageUrl}
                            className="w-full hidden md:block"
                          />
                        </div>
                        <div className="border-b border-gray-300 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                          <div className="w-full flex flex-col justify-start items-start space-y-8">
                            <h3 className="text-xl font-semibold leading-6 text-gray-200">
                              {item && item.product && item.product.name}
                            </h3>
                          </div>
                          <div className="w-full flex justify-between items-start space-x-8">
                            <h3 className="text-xl font-semibold leading-6 text-gray-200">
                              ${item && item.product && item.product.price}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-5 xl:space-x-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-700 space-y-6">
                  <h3 className="text-xl font-semibold leading-6 text-gray-200">
                    Summary
                  </h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between w-full">
                      <p className="text-base leading-5 text-gray-200">Subtotal</p>
                      <p className="text-base leading-5 text-gray-200">
                        ${orderDetails && orderDetails.totalPrice}
                      </p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="text-base leading-5 text-gray-200">Shipping</p>
                      <p className="text-base leading-5 text-gray-200">Free</p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="text-base leading-5 text-gray-200">Subtotal</p>
                      <p className="text-base leading-5 text-gray-200">
                        ${orderDetails && orderDetails.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 bg-gray-700 ">
              <div className="bg-gray-700 w-full xl:w-96 flex  items-center md:items-start px-4 py-6 flex-col">
                <h3 className="text-xl font-semibold leading-6 text-gray-200">
                  Customer Details
                </h3>
                <div className="flex flex-col justify-start items-start flex-shrink-0">
                  <div className="flex gap-4 justify-center flex-col w-full md:justify-start   py-8 border-b border-gray-200">
                    <p className="text-xl font-semibold leading-4 text-left text-gray-200">
                      Name: {user?.name}
                    </p>
                    <p className="text-lg font-semibold leading-4 text-left text-gray-2000">
                      Email: {user?.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pl-10 flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 md:space-y-0 xl:space-y-12 md:flex-row items-center md:items-start ">
                  <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-gray-200 text-xl">Shipping Address</p>
                    <p className="text-gray-300 text-lg">
                      Address :{" "}
                      {orderDetails && orderDetails.shippingAddress.address}
                    </p>
                    <p className="text-xl text-gray-200">City : <span className="text-lg text-gray-300">{orderDetails && orderDetails.shippingAddress.city}</span></p>
                    <p className="text-xl text-gray-200">
                      Country :{" "}<span className="text-lg text-gray-300">
                      {orderDetails && orderDetails.shippingAddress.country}</span>
                    </p>
                    <p className="text-xl text-gray-200">
                      Postal Code :{" "}<span className="text-lg text-gray-300">
                      {orderDetails && orderDetails.shippingAddress.postalCode}</span>
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push(`/`)}
                className="mt-5  inline-block btn btn-outline btn-accent px-5 py-3 text-xs font-medium uppercase tracking-wide"
              >
                Shop Again
              </button>
            </div>
          </div>
        </div>
      );
    }

export default OrderDetails
