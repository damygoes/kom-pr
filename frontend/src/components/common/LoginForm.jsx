import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, TextField } from "@mui/material";
import { userLogin } from "../../actions/actions";
import { setUser } from "../../features/userSlice";

const useStyles = makeStyles(() => ({
  userForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: "8px",
    backgroundColor: "#ccc",
    opacity: "0.7"
  },
}));

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  // * STATES
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [loginFail, setLoginFail] = useState("");

  // * EVENT HANDLERS
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const user = {
      email: userEmail,
      password: userPassword,
    };
    const response = await userLogin(user);
    if (response.success) {
      dispatch(setUser(response));
      navigate("/");
    } else {
      setLoginFail(response.message);
    }
  };

  return (
    <Box
      component="form"
      className={classes.userForm}
      sx={{
        "& .MuiTextField-root": {
          width: "100%",
          color: "primary"        
        },
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "2rem",
          gap: "2rem",
          width: "100%",
          
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            gap: "2rem",
            alignItems: "center",
            width: "100%",
           
          }}
        >
          <TextField
            required
            id="email"
            placeholder="Email"
            type="text"
            variant="standard"
            helperText={loginFail}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <TextField
            required
            id="password"
            placeholder="Password"
            type="password"
            variant="standard"
            helperText={loginFail}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: "2rem" }}
          onClick={handleFormSubmit}
        >
          Login
        </Button>
      </div>
    </Box>
  );
};

export default LoginForm;
