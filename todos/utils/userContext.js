import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("/api/getUserName", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log(response);
          // console.log(response.data.userName);
          // console.log(authenticated);
          // console.log(authenticate);
          // console.log(user);
          setUser(response.data.userName);
          setAuthenticated(true);
          // console.log(user);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          // Handle error (e.g., remove invalid token, redirect to login)
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, authenticated, setAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
