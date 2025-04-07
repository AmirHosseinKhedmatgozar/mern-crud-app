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
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAddForm } from "../context/AddFormContext";
import { useFetchUser } from "../hooks/useFetchUser";

function TableUI() {
  const [openModal, setOpenModal] = useState(false);
  const { openAddForm, setOpenAddForm } = useAddForm();
  const { users, fetchUsers } = useFetchUser();

  useEffect(
    function () {
      fetchUsers();
    },
    [fetchUsers]
  );

  function handleEdit(row) {
    if (!openModal) {
      setOpenModal(true);
      localStorage.setItem("userId", row?._id);
    }
  }
  function handleDelete(row) {
    axios
      .delete(`http://localhost:3001/deleteUser/${row?._id}`)
      .then(() => {
        fetchUsers();
      })
      .catch((err) => console.log(err));
  }

  function handleCloseModal() {
    setOpenModal(false);
  }
  function handleShowForm() {
    setOpenAddForm((s) => !s);
  }

  return (
    <Box
      sx={{
        width: "100% ",
        mt: "50px",
      }}
    >
      <ModalUI open={openModal} close={handleCloseModal} />
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
