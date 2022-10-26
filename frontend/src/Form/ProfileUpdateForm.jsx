import React from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  FormLabel,
  Container,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import Input from "../Auth/Input";
import useStyles from "../Auth/styles";

const ProfileUpdateForm = ({
  handleSubmit,
  handleChange,
  userAvatar
}) => {
  const classes = useStyles();

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{ position: "absolute", right: 0, bottom: 0 }}
    >
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar} src={userAvatar} alt="User"/> 
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
              half
              name="location"
              label="Location"
              type="text"
              handleChange={handleChange}
            />
            <FormControl>
              <FormLabel id="gender">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="gender"
                // defaultValue="female"
                name="gender"
                onChange={handleChange}
              >
                <FormControlLabel
                  value="Female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="Other"
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
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
