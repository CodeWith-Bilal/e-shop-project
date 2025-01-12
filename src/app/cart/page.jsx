"use client";

import CommonCart from "@/components/CommonCart/page";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import React,{ useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";
const Cart = () => {
    const {
        user,
        setCartItems,
        cartItems,
        pageLevelLoader,
        setPageLevelLoader,
        setComponentLevelLoader,
        componentLevelLoader,
      } = useContext(GlobalContext);
    
      async function extractAllCartItems() {
        setPageLevelLoader(true);
        const res = await getAllCartItems(user?._id);
    
        if (res?.success) {
          const updatedData =
            res.data && res.data.length
              ? res.data.map((item) => ({
                  ...item,
                  productID: {
                    ...item.productID,
                    price:
                      item.productID.onSale === "yes"
                        ? parseInt(
                            (
                              item.productID.price -
                              item.productID.price * (item.productID.priceDrop / 100)
                            ).toFixed(2)
                          )
                        : item.productID.price,
                  },
                }))
              : [];
          setCartItems(updatedData);
          setPageLevelLoader(false);
          localStorage.setItem("cartItems", JSON.stringify(updatedData));
        }
    
      
      }
    
      useEffect(() => {
        if (user !== null) extractAllCartItems();
      }, [user]);
    
      async function handleDeleteCartItem(getCartItemID) {
        setComponentLevelLoader({ loading: true, id: getCartItemID });
        const res = await deleteFromCart(getCartItemID);
    
        if (res.success) {
          setComponentLevelLoader({ loading: false, id: "" });
          toast.success(res.message);
    
          extractAllCartItems();
        } else {
          toast.error(res.message);
          setComponentLevelLoader({ loading: false, id: getCartItemID });
        }
      }
    
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
        <CommonCart
          componentLevelLoader={componentLevelLoader}
          handleDeleteCartItem={handleDeleteCartItem}
          cartItems={cartItems}
        />
      );
    }

export default Cart
