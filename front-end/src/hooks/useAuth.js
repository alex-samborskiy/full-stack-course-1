import React, { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

import { setItem, removeItem, getItem } from "../utils/localStorage";

const authContext = createContext({});

function useProvideAuth() {
  const navigate = useNavigate();

  const signIn = ({ email, password }) => {
    setItem('user', { email, password });
    navigate("/list", { replace: true });
  };

  const singOut = () => {
    removeItem('user');
    navigate("/login", { replace: true });
  };

  return {
    user: getItem('user'),
    signIn,
    singOut,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
