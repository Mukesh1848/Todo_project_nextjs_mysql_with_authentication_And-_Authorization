import { createTodoApi } from "../../helperFunctions/apiHelper";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import withAuth from "../../utils/withAuth";
import Header from "../Header";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const CreateTodos = () => {
  const [addTodo, setTodo] = useState({
    title: "",
    description: "",
  });

  const queryClient = useQueryClient();

  // here we are creating mutation to creating a todo
  // const mutation = useMutation(createTodoApi, {
  //   onSuccess: () => {
  //     // On success, invalidate 'todos' queries to refetch data
  //     queryClient.invalidateQueries("todos");
  //     setTodo({ title: "", description: "" });
  //     toast.success("Todo Added Successfully...!");
  //   },

  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  const mutation = useMutation({
    mutationFn: createTodoApi,
    onSuccess: () => {
      // On success, invalidate 'todos' queries to refetch data
      queryClient.invalidateQueries("todos");
      setTodo({ title: "", description: "" });
      toast.success("Todo Added Successfully...!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation check
    if (!addTodo.title || !addTodo.description) {
      toast.warning("Title and Description cannot be empty!");
      return;
    }

    // Trigger the mutation with the new todo data
    mutation.mutate(addTodo);

    // try {
    //   await createTodoApi(addTodo);
    //   console.log("Data submitted successfully!");
    //   setTodo({ title: "", description: "" });
    //   // alert("Todos Added Successfully");
    //   toast.success("Todos Added Successfully...");
    // } catch (error) {
    //   // console.error("Error submitting data:", error);
    //   toast(error);
    // }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // console.log("value", value);
    setTodo({ ...addTodo, [e.target.name]: value });
  };

  return (
    <>
      <Header />
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-20 mx-auto">
          <div class="flex flex-col text-center w-full mb-12">
            <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Add Todo
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    Title
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="title"
                    value={addTodo.title}
                    onChange={handleChange}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="description"
                    onChange={handleChange}
                    value={addTodo.description}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  onClick={handleSubmit}
                  class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Add Todo
                </button>
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

// export default CreateTodos;
export default withAuth(CreateTodos);
