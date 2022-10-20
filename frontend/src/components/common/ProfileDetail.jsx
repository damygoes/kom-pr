import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@mui/material";

const useStyles = makeStyles(() => ({
  textFieldRow: {
    display: "flex",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "1rem",
  },
  formValues: {
    display: "flex",
    gap: "0.2rem",
    fontStyle: "italic",
  },
}));

const ProfileDetail = ({ title, text, unit = "" }) => {
  //* DECLARED VARIABLES
  const classes = useStyles();
  return (
    <Box className={classes.textFieldRow}>
      <Typography variant="h5" sx={{ fontWeight: 500, fontSize: "1rem" }}>
        {title}:
      </Typography>
      <Box className={classes.formValues}>
        <Typography
          variant="h6"
          sx={{fontWeight: 100, fontSize: "1.2rem" }}
        >
          {text}
        </Typography>
        <Typography variant="h6" sx={{fontWeight: 100, fontSize: "1.2rem"}}>
          {unit}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProfileDetail;
