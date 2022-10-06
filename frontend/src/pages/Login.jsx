import React from "react";
import { useNavigate } from "react-router";
import {
  Box
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    gap: "2rem",
    overflowY: "hidden"
    // border: "1px solid green",
  },
}));

const Login = () => {
  const classes = useStyles();
  const { googleSignIn } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      navigate("/")

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={classes.container}>
      <Box>
        <img
          src={"logo1.png"
            
          }
          alt="#"
          style={{width: "100%", height: "100%", objectFit: "cover"}}
        />
      </Box>
      <Box>
        {" "}
        <GoogleButton onClick={handleGoogleSignIn} />{" "}
      </Box>
    </Box>
  );
};

export default Login;
