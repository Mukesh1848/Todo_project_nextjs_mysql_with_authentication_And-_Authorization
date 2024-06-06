import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Header from "../Header";
import "react-toastify/dist/ReactToastify.min.css";
import Link from "next/link";
import {
  fetchTodoByIdApi,
  updateTodoApi,
} from "../../helperFunctions/apiHelper";
// import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  // console.log(id);

  const [todo, setTodo] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);

  // Fetch todo from API

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (router.isReady && id) {
          // const {
          //   data: todoData,
          //   isError,
          //   isLoading,
          // } = useQuery({
          //   queryKey: "Todo",
          //   queryFn: fetchTodoByIdApi(id),
          // });
          const todoData = await fetchTodoByIdApi(id);
          // console.log("Fetching todo by id", todoData);
          setTodo(todoData);
          // console.log("todo Data afetr fetching ", todoData);
          setLoading(false);
        }
      } catch (error) {
        // console.error("Error fetching the todo:", error);
        toast("Oops Something Went Wrong...!");
        setLoading(false);
      }
    };
    fetchData();
  }, [router.isReady, id]);

  // const mutation = useMutation({
  //   mutationFn: updateTodoApi,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("todos");
  //     setTodo(todo);
  //     router.push("/view");
  //     toast("Todo Updated SuccessFully...!");
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  // Function to update todo
  const updateTodo = async (event) => {
    event.preventDefault();
    // mutation.mutate({ title: todo?.title, description: todo?.description, id });
    try {
      console.log("todo wants to update with this id", id);
      await updateTodoApi(todo, id);
      // console.log(todo);
      setTodo(todo);
      router.push("/view");
      toast("Todo Updated Successfully...!");
    } catch (error) {
      if (error.response && error.response.status === 403) {
        toast(error.response.data.message);
      } else {
        // console.log(error);
        toast("Oops, Something Went Wrong!");
      }
    }
  };

  // Handle input change
  const onChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Header />
      <div className="my-2 text-3xl">
        {loading ? (
          <div>loading...</div>
        ) : (
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
              <div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                  Update a Todo
                </h2>
                <div className="relative mb-4">
                  <label
                    htmlFor="title"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Update Todo Title
                  </label>
                  <input
                    onChange={onChange}
                    value={todo.title}
                    type="text"
                    id="title"
                    name="title"
                    className="w-full bg-white rounded border border-gray-300 text-base text-gray-700 py-1 px-3"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="desc"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Update Todo Description
                  </label>
                  <input
                    onChange={onChange}
                    value={todo.description}
                    type="text"
                    id="desc"
                    name="description"
                    className="w-full bg-white rounded border border-gray-300 text-base text-gray-700 py-1 px-3"
                  />
                </div>
                <button
                  onClick={updateTodo}
                  className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none w-fit hover:bg-indigo-600 rounded text-lg"
                >
                  Update Todo
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
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

export default Edit;
