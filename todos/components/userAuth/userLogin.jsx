import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { loginUser } from "../../helperFunctions/apiHelper";
import { setToken } from "../../helperFunctions/localStorageHelper";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const UserLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setToken(data.token);
      router.push("/");
      setEmail("");
      setPassword("");
      toast("Login Successfully!");
    },

    onError: () => {
      toast(err.message || "Oops something went wrong...");
    },
  });

  const handleSubmit = async (e) => {
    // console.log("clicked on login submit button");
    e.preventDefault();
    mutation.mutate({ email, password });
    /*

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        { email, password }
      );
      // console.log(response);
      // console.log(response.data);
      localStorage.setItem("token", response.data.token);
      router.push("/");
      setEmail("");
      setPassword("");
      // toast("Login SuccessFully...!");
      // setTimeout(() => {
      //   router.push("/");
      // }, 1500);
    } catch (error) {
      toast("Oops someThing went wrong...!");
      // console.log(error.response);
    }

    */
  };
  return (
    <>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-20 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Login Here..
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">
                    Password
                  </label>
                  <input
                    type="text"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  onClick={handleSubmit}
                  class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
                >
                  Login
                </button>
                <p className="font-bold text-center">
                  Dont't have an Account &nbsp;
                  <Link
                    href="/auth/register"
                    className="underline text-blue-600"
                  >
                    Register Here..
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default UserLogin;
