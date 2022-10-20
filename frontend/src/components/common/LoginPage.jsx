import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import SignUpForm from './SignUpForm';

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
    padding: "1rem",
    background: `center / cover no-repeat url("https://images.unsplash.com/photo-1478059299873-f047d8c5fe1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y3ljbGluZyUyMGJhY2tncm91bmR8ZW58MHwxfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60")`,
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    zIndex: "99",
    overflow: "hidden"
  },
  overlay: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    opacity: "0.8"
  },
  colAlignment: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "95%",
  },
  rowAlignment: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const LoginPage = () => {
  // * STATES
  const [showSignUp, setShowSignUp] = useState(false);

  // ################################
  // * EVENT HANDLERS
 const toggleSignUpForm = () => {
  setShowSignUp(!showSignUp)
 }

  // ################################
  const classes = useStyles();
  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.overlay}>
          <Box
            className={classes.colAlignment}
            sx={{
              color: "#fff",
            }}
          >
            <Box className={classes.colAlignment}>
              <Typography
                variant="h3"
                sx={{ fontSize: "1.2rem" }}
              >
                Go beyond with
              </Typography>
              <Typography
                variant="h1"
                sx={{ textTransform: "uppercase" }}
              >
                kom-pr
              </Typography>
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
            <Box sx={{ width: "50%" }}>
              {showSignUp ? <SignUpForm /> : <LoginForm /> }
            </Box>
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
              <hr
                style={{ border: "1px solid", width: "20%", height: "none" }}
              />
              <Typography
                variant="p"
                sx={{ fontSize: "1rem", fontStyle: "italic" }}
              >
                or
              </Typography>
              <hr
                style={{ border: "1px solid", width: "20%", height: "none" }}
              />
            </Box>
            <Button
              variant="outlined"
              size="medium"
              sx={{ maxWidth: "15%", border: "1px solid white", color: "white" }}
              onClick={toggleSignUpForm}
            >
              {showSignUp ? "Login" : "Create Account"}
            </Button>
            
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default LoginPage;
