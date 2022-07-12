import React, { useState, useContext, createContext } from "react";

const authContext = createContext({});

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = ({ email, password }) => {
    setUser({ email, password });
  };

  const singOut = () => {
    setUser(null);
  };

  return {
    user,
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
