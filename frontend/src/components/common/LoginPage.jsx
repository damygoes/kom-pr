import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography} from "@mui/material";
// import { FaStrava } from "react-icons/fa";
import { userLogin } from "../../actions/actions";
import LoginForm from "./LoginForm";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    gap: "12rem",
    position: "relative",
    background: `center / cover no-repeat url("https://images.unsplash.com/photo-1567939696026-529d1b096303?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODN8fGN5Y2xpbmd8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60")`,
    
  },
  containerBlur: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100%",
    gap: "12rem",
    position: "relative",
    backgroundColor: "red"
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
  userForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "#ccc",
    border: "1px solid red",
  },
}));


const LoginPage = () => {
  // * STATES
  const [showLoginIn, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // ################################
  // * EVENT HANDLERS
  const handleFormToggle = () => {
    setShowLogin(!showLoginIn)
  }
  const handleUserLogin = () => {
    handleFormToggle()
    // userLogin();
  };
  const handleUserSignUp = () => {
    console.log("User SignUp");
  };

  // ################################
  const classes = useStyles();
  return (
    <>
      <Box className={showLoginIn ? `${classes.containerBlur}` : `${classes.container}`}>
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
            sx={{ width: "50%" }}
            onClick={handleUserLogin}
          >
            Login
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              width: "90%",
              my: "1.5rem",
            }}
          >
            <hr style={{ border: "1px solid", width: "20%", height: "none" }} />
            <Typography
              variant="p"
              sx={{ fontSize: "1rem", fontStyle: "italic" }}
            >
              or
            </Typography>
            <hr style={{ border: "1px solid", width: "20%", height: "none" }} />
          </Box>
          <Button
            variant="outlined"
            size="medium"
            sx={{ width: "50%", border: "1px solid white", color: "white" }}
            onClick={handleUserSignUp}
          >
            Sign Up
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
              dream . set goals . beat it
            </Typography>
          </Box>
        </Box>
        {showLoginIn && (
          <LoginForm handleFormToggle={handleFormToggle} />   
        )}
      </Box>
    </>
  );
};

export default LoginPage;
