import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@mui/material";
import { userLogin } from "../../actions/actions";
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

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  // * STATES
  const [formErrors, setFormErrors] = useState({});
  const [userCred, setUserCred] = useState({
    email: "",
    password: "",
  });
 const [showNotification, setShowNotification] = useState(false)
 const [notificationData, setNotificationData] = useState({
  message: "message",
  status: "info"
 })

  // * EVENT HANDLERS
  const handleFormInputChange = ({ target: input }) => {
    const account = { ...userCred };
    account[input.name] = input.value;
    setUserCred(account);
  };

  const handleFormValidate = () => {
    const errors = {};
    if (userCred.email.trim() === "") {
      errors.email = "Email address is required";
    }
    
    if (userCred.password.trim() === "") {
      errors.password = "Password is required";
    }
    return Object.keys(errors).length === 0 ? "" : errors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = handleFormValidate();
    setFormErrors(errors);
    if (errors) return;


    const response = await userLogin(userCred);
    if (response.success) {
      dispatch(showForms(false));
      dispatch(setUser(response));
      setNotificationData({
        message: "Login Successful",
        status: "success"
      })
      setShowNotification(true)
      setTimeout(()=>{
        navigate("/")
      },300)

    } else {
      setNotificationData({
        message: "Login Failed, Try Again!",
        status: "error"
      })
      setShowNotification(true)
    }
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
            formType="email"
            label="Email Address"
            placeholder="johnsmith@gmail.com"
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
          <Notification showNotification={showNotification} notificationData={notificationData} />
        </Box>
        <Button
          variant="contained"
          size="large"
          sx={{ mt: "2rem" }}
          onClick={handleFormSubmit}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginForm;
