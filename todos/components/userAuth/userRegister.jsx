import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { registerUser } from "../../helperFunctions/apiHelper";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const UserRegister = () => {
  const router = useRouter();
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      setUsername("");
      setEmail("");
      setPassword("");
      toast("User Registered Successfully!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    },
    onError: (err) => {
      toast(err.message || "An error occurred");
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ userName, email, password });

    /*
    Mutation.mutate;
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/register",
        {
          userName,
          email,
          password,
        }
      );
      // console.log(response);
      // console.log(response.data);
      // console.log(response.data.userName);
      setUsername("");
      setEmail("");
      setPassword("");
      toast("User Register SuceessFully...!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1000);
    } catch (err) {
      // console.log(err);
      // console.log(err.response);
      // console.log(err.response.data);
      // console.log(err.response.data.error);
      toast(err.response.data.error);
    }

    */
  };

  return (
    <div>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-20 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Register Here..
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    UserName
                  </label>
                  <input
                    type="text"
                    id="userName"
                    name="userName"
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
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
                  Register
                </button>
                <p className="font-bold text-center">
                  Already have an Account &nbsp;
                  <Link href="/auth/login" className="underline text-blue-600">
                    Login Here..
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
    </div>
  );
};

export default UserRegister;
