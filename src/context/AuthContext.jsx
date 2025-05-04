import { createContext, useContext, useState } from "react";

const authContext = createContext({});

function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const context = useContext(authContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
