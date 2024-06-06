import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { UserContext } from "../utils/userContext";

const Header = () => {
  const router = useRouter();
  // const [authenticated, setAuthenticated] = useState(false);
  const { user, setUser } = useContext(UserContext);

  // if (!user) {
  //   return <p>Loading...</p>; // Handle the case when user is not yet loaded
  // }

  const { authenticated, setAuthenticated } = useContext(UserContext);
  // const content = useContext(UserContext);
  // console.log(authenticate);
  // console.log(content.authenticate);
  // console.log(content.user);
  // const { user, setUser } = useContext(UserContext);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setAuthenticated(true);
  //   } else {
  //     setAuthenticated(false);
  //   }
  // }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    // setUser("");
    router.push("/");
    // router.push("auth/login");
    toast("User Logged Out SuccessFully...!");
    // setUser("");
  };

  return (
    <>
      <header className="text-gray-600 body-font bg-slate-500">
        {authenticated ? (
          <>
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
              <Link
                href={`/`}
                className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
              >
                <span className="ml-3 text-xl text-white font-bold">
                  {user}' Todos
                </span>
              </Link>
              <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                <Link
                  href={`/create`}
                  className="mr-5 hover:text-gray-900 text-white cursor-pointer"
                >
                  Create Todo
                </Link>
                <Link
                  href={`/view`}
                  className="mr-5 hover:text-gray-900 text-white cursor-pointer"
                >
                  View Todos
                </Link>
                <button
                  className="mr-5 hover:text-gray-900 text-white cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </nav>
            </div>
          </>
        ) : (
          <>
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
              <Link
                href={`/`}
                className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
              >
                <span className="ml-3 text-xl text-white font-bold">
                  Todos-Crud
                </span>
              </Link>
              <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                <Link
                  href={`/auth/login`}
                  className="mr-5 hover:text-gray-900 text-white cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  href={`/auth/register`}
                  className="mr-5 hover:text-gray-900 text-white cursor-pointer"
                >
                  Register
                </Link>
              </nav>
            </div>
          </>
        )}
      </header>
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

export default Header;
