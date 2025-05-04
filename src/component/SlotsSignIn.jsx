import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Title from "../../utils/signupComponentHealpers/Title";
import CustomEmailField from "../../utils/signupComponentHealpers/CustomEmailField";
import CustomPasswordField from "../../utils/signupComponentHealpers/CustomPasswordField";
import SignUpLink from "../../utils/signupComponentHealpers/SignUpLink";
import LoadingSlot from "../../utils/signupComponentHealpers/LoadingSlot";
import CustomButton from "../../utils/signupComponentHealpers/CustomButton";

export default function SlotsSignIn() {
  const providers = [{ id: "credentials", name: "Email and Password" }];
  const naviagte = useNavigate();
  const theme = useTheme();
  const [loading, setLoading] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState({
    has: false,
    message: "",
  });
  const { setAuth } = useAuth();

  function handleSignIn(provider, formData) {
    setLoading(true);
    let userInfo = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    axios
      .post("http://localhost:3001/auth", userInfo, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((result) => {
        const { name, roles, accessToken } = result.data;
        setAuth({ name, roles, accessToken });
        naviagte("/", { replace: true });
        setErrorEmail({ has: false, message: "" });
        setLoading(false);
        console.log("login successfully");
        // ذخیره کردن در localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("roles", JSON.stringify(roles));
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          setErrorEmail({ has: true, message: "Please fill in all fields" });
        } else if (err.response?.status === 401) {
          setErrorEmail({
            has: true,
            message: "email or password in not current",
          });
        } else {
          setErrorEmail({
            has: true,
            message: "No response received from the server.",
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <AppProvider theme={theme}>
      <SignInPage
        signIn={handleSignIn}
        slots={{
          title: Title,
          subtitle: errorEmail.has
            ? () => {
                return (
                  <Alert sx={{ mb: 2, px: 1, py: 0.25 }} severity="error">
                    {errorEmail.message}
                  </Alert>
                );
              }
            : null,
          emailField: CustomEmailField,
          passwordField: CustomPasswordField,
          submitButton: CustomButton,
          signUpLink: SignUpLink,
          loadingComponent: loading ? LoadingSlot : null,
        }}
        providers={providers}
      />
    </AppProvider>
  );
}
