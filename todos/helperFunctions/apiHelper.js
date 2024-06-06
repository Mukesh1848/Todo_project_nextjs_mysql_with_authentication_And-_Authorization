import axios from "axios";
import { getToken } from "./localStorageHelper";
import { useQuery } from "@tanstack/react-query";

const baseUrl = "http://localhost:3000/api";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/user/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "An error occurred");
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${baseUrl}/user/login`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "An error occurred");
  }
};

export const createTodoApi = async (todo) => {
  const token = getToken();
  if (!token) return;
  try {
    const response = await axios.post(`${baseUrl}/create`, todo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// export const fetchTodosApi = async () => {
//   const token = getToken();
//   // console.log("Fetch todo api called");
//   if (!token) return;
//   try {
//     const response = await axios.get(`${baseUrl}/todo`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     // console.log("response of Fetch todo api", response.data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const fetchTodosApi = async () => {
  const token = getToken();
  if (!token) throw new Error("No token found");
  const response = await axios.get(`${baseUrl}/todo`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// export const useTodos = () => {
//   return useQuery(["todos"], fetchTodosApi);
// };

export const useTodos = () => {
  return useQuery({ queryKey: ["todos"], queryFn: fetchTodosApi });
};

export const deleteTodoApi = async (id) => {
  const token = getToken();
  // console.log("token", token);
  // console.log("id for delete todo", id);
  if (!token) return;
  try {
    await axios.delete(`${baseUrl}/delete`, {
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};

export const fetchTodoByIdApi = async (id) => {
  const token = getToken();
  // console.log("fetch by id ", id);
  if (!token) return;
  try {
    const response = await axios.get(`${baseUrl}/todo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(response);
    return response.data[0];
  } catch (error) {
    throw error;
  }
};

// todo

export const updateTodoApi = async (todo, id) => {
  // console.log("todo inside update api ", id);
  const token = getToken();
  if (!token) return;
  try {
    const response = await axios.put(
      `${baseUrl}/update`,
      { todo, id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    // console.log("update todo", error);
    throw error;
  }
};

export const shareTodoApi = async (todoId, userIds, permissions) => {
  const token = getToken();
  if (!token) return;
  try {
    const response = await axios.post(
      `${baseUrl}/shareTodo`,
      {
        todoId,
        userIds,
        permissions,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removePermissionsApi = async (todoId, userIds, permissions) => {
  const token = getToken();
  if (!token) return;

  try {
    const response = await axios.post(
      `${baseUrl}/removePermissions`,
      {
        todoId,
        userIds,
        permissions,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const showUserNameApi = async () => {
  try {
    const response = await axios.get(`${baseUrl}/showUserName`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
