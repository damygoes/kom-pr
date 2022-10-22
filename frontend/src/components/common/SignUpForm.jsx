import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@mui/material";
import { registerUser } from "../../actions/actions";
import { setUser } from "../../features/userSlice";
import { showForms } from "../../features/loginFormSlice";
import FormInput from "./FormInput";
import Notification from "./Notification";

const useStyles = makeStyles(() => ({
  userForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: "5px",
    backgroundColor: "#ccc",
    opacity: "0.7",
  },
}));

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  // * STATES
  const [formErrors, setFormErrors] = useState({});
  const [userCred, setUserCred] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    message: "message",
    status: "info",
  });

  // * EVENT HANDLERS
  const handleFormInputChange = ({ target: input }) => {
    const account = { ...userCred };
    account[input.name] = input.value;
    setUserCred(account);
  };

  const handleFormValidate = () => {
    const errors = {};
    if (userCred.username.trim() === "") {
      errors.username = "Name is required";
    }
    if (userCred.email.trim() === "") {
      errors.email = "Email address is required";
    }

    if (userCred.password.trim() === "") {
      errors.password = "Password is required";
    }
    return Object.keys(errors).length === 0 ? "" : errors;
  };

  const handleSignUpForm = async (e) => {
    e.preventDefault();
    const errors = handleFormValidate();
    setFormErrors(errors);
    if (errors) return;

    const response = await registerUser(userCred);
    const { success, user } = response;
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
      },
    };
    if (success) {
      dispatch(showForms(false))
      dispatch(setUser(userData));
      setNotificationData({
        message: "Signup Successful",
        status: "success",
      });
      setShowNotification(true);
      resetForm();
      setTimeout(() => {
        navigate("/");
      }, 300);
    } else {
      setNotificationData({
        message: "Login Failed, Try Again!",
        status: "error",
      });
      setShowNotification(true);
    }
  };
  const resetForm = () => {
    setUserCred({
      username: "",
      email: "",
      password: "",
    });
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
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: "1rem",
          gap: "1rem",
          width: "100%",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            gap: "2rem",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormInput
            formType="username"
            label="Name"
            placeholder="John Snow"
            variant="standard"
            helperText={formErrors.username && `${formErrors.username}`}
            value={userCred.username}
            error={formErrors.username}
            onChange={handleFormInputChange}
          />
           <FormInput
            formType="email"
            label="Email Address"
            placeholder="johnsnow@gmail.com"
            variant="standard"
            helperText={formErrors.email && `${formErrors.email}`}
            value={userCred.email}
            error={formErrors.email}
            onChange={handleFormInputChange}
          />
          <FormInput
            formType="password"
            label="Password"
            placeholder="*************"
            variant="standard"
            helperText={formErrors.password && `${formErrors.password}`}
            value={userCred.password}
            error={formErrors.password}
            onChange={handleFormInputChange}
          />
          <Notification showNotification={showNotification} notificationData={notificationData}/>
        </Box>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: "2rem" }}
          onClick={handleSignUpForm}
        >
          Create Account
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpForm;
