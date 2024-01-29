"use client";

import InputComponent from "@/components/FormElements/InputComponent/page";
import ComponentLevelLoader from "@/components/Loader/componentlevel/page";
import Notification from "@/components/Notification/page";
import { GlobalContext } from "@/context";
import { login } from "@/services/login";
import { loginFormControls } from "@/utils";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React,{ useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const initialFormdata = {
  email: "",
  password: "",
};
const Login = () => {
    const [formData, setFormData] = useState(initialFormdata);
    const {
      isAuthUser,
      setIsAuthUser,
      user,
      setUser,
      componentLevelLoader,
      setComponentLevelLoader,
    } = useContext(GlobalContext);
  
    const router = useRouter();
  
    //
  
    function isValidForm() {
      return formData &&
        formData.email &&
        formData.email.trim() !== "" &&
        formData.password &&
        formData.password.trim() !== ""
        ? true
        : false;
    }
  
    async function handleLogin() {
      setComponentLevelLoader({ loading: true, id: "" });
      const res = await login(formData);
  
      //
  
      if (res.success) {
        toast.success(res.message);
        setIsAuthUser(true);
        setUser(res?.finalData?.user);
        setFormData(initialFormdata);
        Cookies.set("token", res?.finalData?.token);
        localStorage.setItem("user", JSON.stringify(res?.finalData?.user));
        setComponentLevelLoader({ loading: false, id: "" });
      } else {
        toast.error(res.message);
        setIsAuthUser(false);
        setComponentLevelLoader({ loading: false, id: "" });
      }
    }
  
    //
  
    useEffect(() => {
      if (isAuthUser) router.push("/");
    }, [isAuthUser]);
  
    return (
      <div className="bg-gray-800 relative">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
          <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
            <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-gray-700 shadow-3xl rounded-xl relative z-10">
                <p className="w-full text-4xl font-medium text-center font-serif text-gray-100">
                  Login
                </p>
                <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                  {loginFormControls.map((controlItem) =>
                    controlItem.componentType === "input" ? (
                      <InputComponent
                        type={controlItem.type}
                        placeholder={controlItem.placeholder}
                        label={controlItem.label}
                        value={formData[controlItem.id]}
                        onChange={(event) => {
                          setFormData({
                            ...formData,
                            [controlItem.id]: event.target.value,
                          });
                        }}
                      />
                    ) : null
                  )}
                  <button
                    className="disabled:bg-gray-800 disabled:text-white inline-flex w-full items-center justify-center btn btn-outline btn-accent text-lg 
                       text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                       "
                    disabled={!isValidForm()}
                    onClick={handleLogin}
                  >
                    {componentLevelLoader && componentLevelLoader.loading ? (
                      <ComponentLevelLoader
                        text={"Logging In"}
                        color={"#ffffff"}
                        loading={
                          componentLevelLoader && componentLevelLoader.loading
                        }
                      />
                    ) : (
                      "Login"
                    )}
                  </button>
                  <div className="flex flex-col gap-2 text-gray-200">
                    <p>New to website ?</p>
                    <button
                      className="inline-flex w-full items-center justify-center btn btn-outline btn-info text-lg 
                       transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                       "
                      onClick={() => router.push("/register")}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Notification />
      </div>
    );
  }

export default Login
