import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, Typography } from "@mui/material";
import {AiOutlineCloseCircle} from "react-icons/ai"
import LoginForm from "./LoginForm";
import SignUpForm from './SignUpForm';

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    position: "fixed",
    top: "10%",
    left: "10%",
    width: "80%",
    height: "80%",
    borderRadius: "12px",
    overflow: "hidden"
  },
  overlay: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    opacity: "0.9"
  },
  colAlignment: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    width: "100%",
    height: "95%",
  },
  rowAlignment: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const LoginPage = ({onClose}) => {
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
            <AiOutlineCloseCircle fontSize="4rem" color="#ff0100" style={{alignSelf: "flex-end", cursor: "pointer" }}  onClick={onClose}/>
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
              sx={{ width: "12rem", border: "1px solid white", color: "white" }}
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
