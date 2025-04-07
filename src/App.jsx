import { Container } from "@mui/material";
import TableUI from "./component/TableUI";
import { AddFormProvider } from "./context/AddFormContext";

function App() {
  return (
    <AddFormProvider>
      <Container>
        <TableUI />
      </Container>
    </AddFormProvider>
  );
}
export default App;
