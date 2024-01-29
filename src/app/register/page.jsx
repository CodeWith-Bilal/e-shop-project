"use client"

import InputComponent from '@/components/FormElements/InputComponent/page';
import SelectComponent from '@/components/FormElements/SelectComponent/page';
import ComponentLevelLoader from '@/components/Loader/componentlevel/page';
import Notification from '@/components/Notification/page';
import { GlobalContext } from '@/context';
import { registerNewUser } from '@/services/register';
import { registrationFormControls } from '@/utils';
import { useRouter } from 'next/navigation';
import React, { useContext, useState,useEffect } from 'react'
import { toast } from 'react-toastify';
const initialFormData = {
    name: "",
    email: "",
    password: "",
    role: "customer",
  };

const Register = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [isRegistered, setIsRegistered] = useState(false);
    const { pageLevelLoader, setPageLevelLoader , isAuthUser } = useContext(GlobalContext);
  
    const router = useRouter()
  
//
  
    function isFormValid() {
      return formData &&
        formData.name &&
        formData.name.trim() !== "" &&
        formData.email &&
        formData.email.trim() !== "" &&
        formData.password &&
        formData.password.trim() !== ""
        ? true
        : false;
    }
  
    //
  
    async function handleRegisterOnSubmit() {
      setPageLevelLoader(true);
      const data = await registerNewUser(formData);
  
      if (data.success) {
        toast.success(data.message);
        setIsRegistered(true);
        setPageLevelLoader(false);
        setFormData(initialFormData);
      } else {
        toast.error(data.message);
        setPageLevelLoader(false);
        setFormData(initialFormData);
      }
  
      //
    }
  
    useEffect(() => {
      if (isAuthUser) router.push("/");
    }, [isAuthUser]);
  
    return (
      <div className="bg-gray-800 relative">
        <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-8 mr-auto xl:px-5 lg:flex-row">
          <div className="flex flex-col justify-center items-center w-full pr-10 pl-10 lg:flex-row">
            <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
              <div className="flex flex-col items-center justify-start pt-10 pr-10 pb-10 pl-10 bg-gray-700 shadow-2xl rounded-xl relative z-10">
                <p className="w-full text-4xl font-medium text-center font-serif text-gray-100">
                  {isRegistered
                    ? "Registration Successfull !"
                    : "Sign up for an account"}
                </p>
                {isRegistered ? (
                  <button
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg 
                  text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                  "
                  onClick={()=>router.push('/login')}
                  >
                    Login
                  </button>
                ) : (
                  <div className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                    {registrationFormControls.map((controlItem) =>
                      controlItem.componentType === "input" ? (
                        <InputComponent
                          type={controlItem.type}
                          placeholder={controlItem.placeholder}
                          label={controlItem.label}
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              [controlItem.id]: event.target.value,
                            });
                          }}
                          value={formData[controlItem.id]}
                        />
                      ) : controlItem.componentType === "select" ? (
                        <SelectComponent
                          options={controlItem.options}
                          label={controlItem.label}
                          onChange={(event) => {
                            setFormData({
                              ...formData,
                              [controlItem.id]: event.target.value,
                            });
                          }}
                          value={formData[controlItem.id]}
                        />
                      ) : null
                    )}
                    <button
                      className=" disabled:bg-gray-900 disabled:text-gray-400 inline-flex w-full items-center justify-center btn btn-outline btn-accent text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide
                     "
                      disabled={!isFormValid()}
                      onClick={handleRegisterOnSubmit}
                    >
                      {pageLevelLoader ? (
                        <ComponentLevelLoader
                          text={"Registering"}
                          color={"#ffffff"}
                          loading={pageLevelLoader}
                        />
                      ) : (
                        "Register"
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Notification />
      </div>
    );
  }

export default Register
