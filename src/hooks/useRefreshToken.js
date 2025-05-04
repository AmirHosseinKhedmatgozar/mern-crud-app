import axios from "axios";
import { useAuth } from "../context/AuthContext";

//SAVE THE ACCESS TOKEN IN THE AUTH CONTEXT
const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get("/refresh", { withCredentials: true });
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.accessToken,
        roles: response.data.roles,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
