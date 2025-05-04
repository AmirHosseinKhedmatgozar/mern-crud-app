import { Button, Container } from "@mui/material";
import TableUI from "./TableUI";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { setAuth } = useAuth();
  function handleClick() {
    axios
      .get("http://localhost:3001/logout", {
        withCredentials: true,
      })
      .then(() => {
        if (
          localStorage.getItem("accessToken") &&
          localStorage.getItem("roles")
        ) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("roles");
          setAuth({});
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <Container>
      <TableUI />
      <Button onClick={handleClick}>
        <ExitToAppIcon
          variant="outlined"
          sx={{ marginTop: "10px", fontSize: "50px" }}
        />
      </Button>
    </Container>
  );
}

export default Home;
