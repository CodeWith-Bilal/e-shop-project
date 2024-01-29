"use client";

import { useRouter } from "next/navigation";
import ProductButton from "./ProductButtons/page";
import ProductTile from "./ProductTile/page";
import React,{ useEffect } from "react";
import Notification from "../Notification/page";

const CommonListing = ({data}) => {
    const router = useRouter();

    useEffect(() => {
      router.refresh();
    }, []);
  
    return (
      <section className="bg-gray-800 py-12 sm:py-16">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
            {data && data.length
              ? data.map((item) => (
                  <article
                    className="bg-gray-700 p-2 relative flex flex-col overflow-hidden border-gray-900 cursor-pointer"
                    key={item._id}
                  >
                    <ProductTile item={item} />
                    <ProductButton item={item} />
                  </article>
                ))
              : null}
          </div>
        </div>
        <Notification/>
      </section>
    );
  }

export default CommonListing
