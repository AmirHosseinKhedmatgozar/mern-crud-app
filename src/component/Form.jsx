import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import * as yup from "yup";
import { useAddForm } from "../context/AddFormContext";
import { useFetchUser } from "../hooks/useFetchUser";

function Form({ addUser, editUser, setCloseModal }) {
  const [toggleButton, setToggleButton] = useState(true);
  const { setOpenAddForm } = useAddForm();
  const { fetchUsers } = useFetchUser();
  function onSubmit(valuse) {
    if (addUser) {
      axios
        .post("http://localhost:3001/createUser", valuse)
        .then(() => {
          fetchUsers();
          setToggleButton(false);
          setOpenAddForm(false);
        })
        .catch((err) => console.log(err));
    }

    if (editUser) {
      const userId = localStorage.getItem("userId");
      axios
        .patch(`http://localhost:3001/updateUser/`, { userId, ...valuse })
        .then(() => {
          fetchUsers();
          setToggleButton(false);
          setCloseModal(true);
        })
        .catch((err) => console.log(err));
    }
  }

  const styleForm = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "The submitted format is not correct."
      )
      .required("email is required"),
    name: yup.string().min(6, "min 6 char").required("name is required"),
    age: yup.number("please enter a number").required("age is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
    },
    onSubmit: onSubmit,
    validationSchema: validationSchema,
  });

  if (!toggleButton) return null;
  return (
    <Box sx={{ mt: "5px", boxShadow: 5, p: "5px" }}>
      <form onSubmit={formik.handleSubmit} style={styleForm}>
        <Box sx={{ width: "100%", display: "flex", gap: 4, mb: "10px" }}>
          <TextField
            label={"name"}
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            label={"age"}
            type="number"
            name="age"
            value={formik.values.age}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.age && Boolean(formik.errors.age)}
            helperText={formik.touched.age && formik.errors.age}
          />
          <TextField
            sx={{ flexGrow: 1 }}
            label={"email"}
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Box>
        <Button variant="contained" type="submit">
          {addUser && "+ADD"}
          {editUser && "UPDATE"}
        </Button>
      </form>
    </Box>
  );
}

export default Form;
