import Home from "./component/Home";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Unauthorized from "./component/Unauthorized";
import NotFound from "./component/NotFound";
import RequiredAuth from "./component/authComponents/RequireAuth";
import { Toaster } from "react-hot-toast";
import { AddFormProvider } from "./context/AddFormContext";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PersistLogin from "./component/authComponents/PersistLogin";
function App() {
  const ROLES = {
    User: 1000,
    Editor: 1002,
    Admin: 1001,
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <AuthProvider>
          <AddFormProvider>
            <Routes>
              {/* protected routes */}
              <Route element={<PersistLogin />}>
                <Route
                  element={
                    <RequiredAuth allowedRoles={[ROLES.User, ROLES.Editor]} />
                  }
                >
                  <Route path="/" element={<Home />} />
                </Route>
              </Route>
              {/* public routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AddFormProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
export default App;
