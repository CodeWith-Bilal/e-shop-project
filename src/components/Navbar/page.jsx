"use client";

import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions } from "@/utils";
import React,{ Fragment, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import CartModal from "../CartModal/page";
import CommonModal from "../CommonModal/page";
import { Tektur } from 'next/font/google'
import Link from "next/link";
const oswald = Tektur({ subsets: ['latin'] })

function NavItems({ isModalView = false, isAdminView, router }) {
  return (
    <div
      className={`items-center justify-between w-full md:flex md:w-auto ${
        isModalView ? "" : "hidden"
      }`}
      id="nav-items"
    >
      <ul
        className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ${
          isModalView ? "border-none" : "border border-gray-100"
        }`}
      >
        {isAdminView
          ? adminNavOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 text-gray-200 rounded md:p-0"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                {item.label}
              </li>
            ))
          : navOptions.map((item) => (
              <li
                className="cursor-pointer block py-2 pl-3 pr-4 lg:text-gray-200 rounded md:p-0 md:text-gray-200 sm:text-black"
                key={item.id}
                onClick={() => router.push(item.path)}
              >
                <Link href={item.path}>{item.label}</Link>
              </li>
            ))}
      </ul>
    </div>
  );
}
const Navbar = () => {
    const { showNavModal, setShowNavModal } = useContext(GlobalContext);
    const {
      user,
      isAuthUser,
      setIsAuthUser,
      setUser,
      currentUpdatedProduct,
      setCurrentUpdatedProduct,
      showCartModal,
      setShowCartModal
    } = useContext(GlobalContext);
  
    const pathName = usePathname();
    const router = useRouter();
  
  
    useEffect(() => {
      if (
        pathName !== "/admin-view/add-product" &&
        currentUpdatedProduct !== null
      )
        setCurrentUpdatedProduct(null);
    }, [pathName]);
  
    function handleLogout() {
      setIsAuthUser(false);
      setUser(null);
      Cookies.remove("token");
      localStorage.clear();
      router.push("/");
    }
  
    const isAdminView = pathName.includes("admin-view");
  
    return (
      <>
        <nav className="bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-400">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <div
              onClick={() => router.push("/")}
              className="flex items-center cursor-pointer"
            >
              <span className="slef-center text-4xl font-semibold whitespace-nowrap text-white">
              <span className={oswald.className}>E-Shop</span>
              </span>
            </div>
            <div className="flex md:order-2 gap-2">
              {!isAdminView && isAuthUser ? (
                <Fragment>
                  <button
                    className={
                      "mt-1.5 inline-block btn btn-outline btn-accent px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                    }
                    onClick={()=>router.push('/account')}
                  >
                    Account
                  </button>
                  <button
                    className={
                      "mt-1.5 inline-block btn btn-outline btn-accent px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                    }
                    onClick={()=> setShowCartModal(true)}
                  >
                    Cart
                  </button>
                </Fragment>
              ) : null}
              {user?.role === "admin" ? (
                isAdminView ? (
                  <button
                    className={
                      "mt-1.5 inline-block btn btn-outline btn-accent px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                    }
                    onClick={() => router.push("/")}
                  >
                    Client View
                  </button>
                ) : (
                  <button
                    onClick={() => router.push("/admin-view")}
                    className={
                      "mt-1.5 inline-block btn btn-outline btn-accent px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                    }
                  >
                    Admin View
                  </button>
                )
              ) : null}
              {isAuthUser ? (
                <button
                  onClick={handleLogout}
                  className={
                    "mt-1.5 inline-block btn btn-outline btn-error px-5 py-3 text-xs font-medium upprcase tracking-wide"
                  }
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => router.push("/login")}
                  className={
                    "mt-1.5 inline-block btn btn-outline btn-info px-5 py-3 text-xs font-medium upprcase tracking-wide text-white"
                  }
                >
                  Login
                </button>
              )}
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
                onClick={() => setShowNavModal(true)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <NavItems router={router} isAdminView={isAdminView} />
          </div>
        </nav>
        <CommonModal
          showModalTitle={false}
          mainContent={
            <NavItems
              router={router}
              isModalView={true}
              isAdminView={isAdminView}
            />
          }
          show={showNavModal}
          setShow={setShowNavModal}
        />
        {showCartModal && <CartModal />}
      </>
    );
  }

export default Navbar
