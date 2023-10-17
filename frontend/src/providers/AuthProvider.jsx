import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isUserLoading, setUserLoading] = useState(true);
  const [user, setUser] = useState(null);

  const signIn = (values) => {
    setUserLoading(true);
    const { email, password } = values;

    return fetch(`/users.json`)
      .then((response) => response.json())
      .then((result) => {
        const user = result.find(
          (user) => user.email === email && user.password === +password,
        );

        sessionStorage.setItem("_user", JSON.stringify(user));
        setLoggedIn(!isLoggedIn);
        return user;
      });
  };

  const signOut = () => {
    sessionStorage.removeItem("user");
    setLoggedIn(!isLoggedIn);
  };

  const authInfo = {
    isUserLoading,
    setUserLoading,
    user,
    signIn,
    signOut,
  };

  useEffect(() => {
    const existUser = sessionStorage.getItem("_user");

    if (existUser) setUser(JSON.parse(existUser));
    else setUser(null);

    setUserLoading(false);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
