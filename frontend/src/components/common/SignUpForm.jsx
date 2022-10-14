import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, TextField } from "@mui/material";
import { registerUser } from "../../actions/actions";
import { setUser } from "../../features/userSlice";

const useStyles = makeStyles(() => ({
  userForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: "8px",
    backgroundColor: "#ccc",
    opacity: "0.7",
  },
}));

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  // * STATES
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [signUpInfo, setSignUpInfo] = useState("");

  // * EVENT HANDLERS
  const handleSignUpForm = async (e) => {
    e.preventDefault();
    const userInfo = {
      username: userName,
      email: userEmail,
      password: userPassword,
    };
    const response = await registerUser(userInfo);
    const { message, success, user } = response;
    const { admin, avatar, email, id, username, token } = user;
    const userData = {
      success,
      user: {
        admin,
        avatar,
        email,
        id,
        username,
        token,
        // admin: user.admin,
        // avatar: user.avatar,
        // email: user.email,
        // id: user.id,
        // username: user.username,
        // token: user.token,
      },
    };
    if (success) {
      setSignUpInfo(message);
      dispatch(setUser(userData))
      resetForm();
      setTimeout(async () => {
        navigate("/")
      }, 200);
    }
  };
  const resetForm = () => {
    setUserName("");
    setUserEmail("");
    setUserPassword("");
  };

  return (
    <Box
      component="form"
      className={classes.userForm}
      sx={{
        "& .MuiTextField-root": {
          width: "100%",
          color: "primary",
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
            id="userName"
            placeholder="Name"
            type="text"
            variant="standard"
            // helperText={loginFail}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            required
            id="email"
            placeholder="Email"
            type="text"
            variant="standard"
            // helperText={loginFail}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <TextField
            required
            id="password"
            placeholder="Password"
            type="password"
            variant="standard"
            helperText={signUpInfo}
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: "2rem" }}
          onClick={handleSignUpForm}
        >
          Signup
        </Button>
      </div>
    </Box>
  );
};

export default LoginForm;
