import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography } from "@mui/material";
import { FaStrava } from "react-icons/fa";
import { userLogin } from "../../actions/actions";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    gap: "12rem",
    background: `center / contain no-repeat url("https://images.unsplash.com/photo-1567939696026-529d1b096303?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODN8fGN5Y2xpbmd8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60")`,
  },
  colAlignment: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  rowAlignment: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
  },
}));

const handleUserLogin = () => {
  userLogin();
};

const StravaLoginPage = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Box></Box>
      <Box
        className={classes.colAlignment}
        sx={{
          width: "40%",
          color: "#fff",
        }}
      >
        <Box className={classes.colAlignment}>
          <Typography
            variant="h3"
            sx={{ marginBottom: "-1rem", fontSize: "1.2rem" }}
          >
            {" "}
            Go beyond with{" "}
          </Typography>
          <Typography
            variant="h1"
            sx={{ textTransform: "uppercase", marginTop: 0, mb: "3rem" }}
          >
            kom-pr
          </Typography>
        </Box>
        <Button
          variant="contained"
          size="large"
          endIcon={<FaStrava />}
          sx={{ width: "100%" }}
          onClick={handleUserLogin}
        >
          Login with STRAVA
        </Button>
        <Box className={classes.rowAlignment}>
          <Typography
            variant="p"
            sx={{
              textTransform: "capitalise",
              fontSize: "0.9rem",
              fontStyle: "italic",
            }}
          >
            {" "}
            dream . set goals . beat it{" "}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StravaLoginPage;
