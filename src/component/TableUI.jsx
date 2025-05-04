import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ModalUI from "./Modal";
import Form from "./Form";
import axios from "axios";
import toast from "react-hot-toast";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import { useAddForm } from "../context/AddFormContext";
import { useFetchData } from "../hooks/useFetchData";

function TableUI() {
  const [openModal, setOpenModal] = useState(false);
  const { openAddForm, setOpenAddForm } = useAddForm();
  const { data: users, loading, error } = useFetchData("usersForm");

  function handleEdit(row) {
    localStorage.setItem("userId", row?._id);
    setOpenModal(true);
  }

  function handleDelete(row) {
    axios
      .delete(`http://localhost:3001/usersForm/deleteUser/${row?._id}`)
      .then(() => {
        toast.success("Successfully deleted user!");
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Failed to delete user!");
        console.log(err);
      });
  }

  function handleCloseModal() {
    setOpenModal(false);
  }

  function handleShowForm() {
    setOpenAddForm((s) => !s);
  }

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        mt: "50px",
      }}
    >
      <ModalUI
        open={openModal}
        close={handleCloseModal}
        setOpenModal={setOpenModal}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{ backgroundColor: "#99dfff" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>NAME</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                EMAIL
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                AGE
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((row) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">
                  <Button
                    sx={{ width: "70px" }}
                    variant="outlined"
                    onClick={() => {
                      handleEdit(row);
                    }}
                  >
                    UPDATE
                  </Button>
                </TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => {
                      handleDelete(row);
                    }}
                    sx={{ width: "70px" }}
                    variant="outlined"
                    color="error"
                  >
                    DELETE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!openAddForm && (
        <Button
          onClick={handleShowForm}
          variant="contained"
          sx={{
            mt: "2px",
            width: "100%",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          +ADD USER
        </Button>
      )}
      {openAddForm && <Form addUser={true} />}
    </Box>
  );
}

export default TableUI;
