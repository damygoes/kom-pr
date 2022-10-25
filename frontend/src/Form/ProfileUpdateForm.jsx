import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import Input from "../Auth/Input";
import useStyles from "../Auth/styles";
import { updateUserProfile } from "../actions/auth";

const initialState = {
  ftp: "",
  weight: "",
  wattPerKilo: "",
  bikeWeight: "",
  gender: "",
  location: "",
};

const ProfileUpdateForm = ({ userID, handleToggleForm }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted")
    dispatch(updateUserProfile(userID, formData))
    handleToggleForm()

  };
  // onClose();

  console.log(formData)

  return (
    <Container component="main" maxWidth="xs" sx={{position: "absolute", right: 0}}>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>{/* <LockPersonIcon /> */}</Avatar>
        <Typography variant="h5">Update Profile</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="ftp"
              label="FTP (w)"
              type="text"
              handleChange={handleChange}
              half
              autoFocus
            />
            <Input
              name="wattPerKilo"
              label="Watt Per Kilo (w/kg)"
              type="text"
              handleChange={handleChange}
              half
            />
            <Input
              name="weight"
              label="Weight (kg)"
              type="text"
              handleChange={handleChange}
              half
            />
            <Input
              name="bikeWeight"
              label="Bike Weight (kg)"
              type="text"
              handleChange={handleChange}
              half
            />
            <Input
              name="location"
              label="Location"
              type="text"
              handleChange={handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="gender">Gender</InputLabel>
              <Select
                name="gender"
                labelId="gender"
                id="gender"
                value={formData.gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ProfileUpdateForm;
