import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button, TextField } from "@mui/material";
import { GrClose } from "react-icons/gr";

const useStyles = makeStyles(() => ({
  userForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    top: "50",
    left: "50",
    width: "60%",
    backgroundColor: "#ccc",
    borderRadius: "12px",
  },
}));

const LoginForm = ({ handleFormToggle }) => {
  const classes = useStyles();

// * STATES
const [userEmail, setUserEmail] = useState("")
const [userPassword, setUserPassword] = useState("")

// * EVENT HANDLERS
const handleFormSubmit = (e) => {
    e.preventDefault();
    const user = {
        email: userEmail,
        password: userPassword
    }

    console.log(user)
}

  return (
    <Box
      component="form"
      className={classes.userForm}
      sx={{
        "& .MuiTextField-root": {
          width: "100%",
        },
      }}
      validate
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
          height: "100%",
          border: "1px solid red",
        }}
      >
        <GrClose
          style={{ fontSize: "1.2rem", marginBottom: "3rem" }}
          onClick={handleFormToggle}
        />
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
            helperText="Some important text"
            value={userEmail}
            onChange={(e)=>setUserEmail(e.target.value)}
          />
          <TextField
            required
            id="password"
            placeholder="Password"
            type="password"
            variant="standard"
            helperText="Some important text"
            value={userPassword}
            onChange={(e)=>setUserPassword(e.target.value)}
          />
        </div>
        <Button variant="contained" size="large" onClick={handleFormSubmit}>
          Login
        </Button>
      </div>
    </Box>
  );
};

export default LoginForm;
