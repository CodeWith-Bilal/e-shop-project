"use client";
import React from 'react'

const Unauthorized = () => {
    return (
        <section className="h-screen bg-gray-800">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8 ">
              <div className="bg-gray-700 shadow">
                <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-5">
                  <h1 className="font-bold text-lg text-gray-200">
                    You don't have access to view this page!
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
}

export default Unauthorized
