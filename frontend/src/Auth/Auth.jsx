import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
  Container,
} from "@mui/material";
// import { GoogleLogin } from "react-google-login";
// import GoogleIcon from "@mui/icons-material/Google";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Input from "./Input";
import useStyles from "./styles";
import { registerUser, userLogin } from "../actions/auth";
// import { setUser } from "../features/userSlice";
// import { showForm } from "../actions/formState";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  avatar: "",
};

const AvatarGroup = {
  "Rider One": "cyclist-1.png",
  "Rider Two": "cyclist-4.png",
  "Rider Three": "cyclist-10.png",
  "Male One": "cyclist-2.png",
  "Male Two": "cyclist-6.png",
  "Male Three": "cyclist-9.png",
  "Male Four": "cyclist-3.png",
  "Female One": "cyclist-5.png",
  "Female Two": "cyclist-7.png",
  "Female Three": "cyclist-8.png",
};

const Auth = ({ onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  // const [errorText, setErrorText] = useState("");
  const [formData, setFormData] = useState(initialState);

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleFormSwitch = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setShowPassword(false);
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(registerUser(formData));
    } else {
      dispatch(userLogin(formData));
    }
    onClose();
  };


  // const googleSuccess = () => {};
  // const googleFailure = () => {};


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockPersonIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignUp ? "Create Account" : "Login"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  type="text"
                  handleChange={handleChange}
                  half
                  autoFocus
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  type="text"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              type="email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              handleChange={handleChange}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography variant="h6" component="p">
                    <PhotoCamera />
                    Avatar
                  </Typography>
                  <Select
                    name="avatar"
                    labelId="avatar"
                    id="avatar"
                    value={formData.avatar}
                    label="avatar"
                    onChange={handleChange}
                    size="medium"
                  >
                    {Object.keys(AvatarGroup).map((rider) => {
                      return (
                        <MenuItem key={rider} value={AvatarGroup[rider]}>
                          {rider}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Stack>
              </>
            )}
          </Grid>
          {/* <GoogleLogin
            clientId="client id"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<GoogleIcon />}
                variant="contained"
              >
                Google Login
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignUp ? "Create Account" : "Login"}
          </Button>
          <Grid container>
            <Grid item>
              <Button onClick={handleFormSwitch}>
                {isSignUp ? (
                  <Typography variant="h6">
                    Already have an account? Login
                  </Typography>
                ) : (
                  <Typography variant="h6">
                    Don't have an account yet? Create One
                  </Typography>
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
