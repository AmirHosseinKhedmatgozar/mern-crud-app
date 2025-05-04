import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../hooks/useRefreshToken";
import { useAuth } from "../../context/AuthContext";
import LoadingComponent from "../LoadingComponent";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const storedAccessToken = localStorage.getItem("accessToken");
        const storedRoles = JSON.parse(localStorage.getItem("roles"));

        if (storedAccessToken && storedRoles) {
          setAuth({
            accessToken: storedAccessToken,
            roles: storedRoles,
          });
        } else {
          await refresh();
        }
      } catch (err) {
        console.error("Failed to refresh token", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth?.accessToken) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, [auth?.accessToken, refresh, setAuth]);

  if (isLoading) return <LoadingComponent />;

  return <Outlet />;
};

export default PersistLogin;
