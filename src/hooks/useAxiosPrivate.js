import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import { useAuth } from "../context/AuthContext";
import useRefreshToken from "./useRefreshToken.js";

function useAxiosPrivate() {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    //config request --  ghabl az inke darkhast samte server bere to heade ye autorazation ghara bde
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    //vaghti ejra mishe ke response ro daryaft kardim vali hanooz be application nareside
    const responseIntercept = axiosPrivate.interceptors.response.use(
      //access token agar valid hast hamoon response ro mifrestim
      (response) => response,
      //dar inja access token avaliid nist ya expired shode
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          //dobare request midim
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
}

export default useAxiosPrivate;
