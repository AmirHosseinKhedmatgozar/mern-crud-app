import { Box, Typography } from "@mui/material";

function ErrorComponent({ error }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h6" color="red">
        {error.message ? error.message : "Something went wrong!"}
      </Typography>
    </Box>
  );
}

export default ErrorComponent;
