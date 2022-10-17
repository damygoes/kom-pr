import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material/";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

const useStyles = makeStyles(() => ({
  buttonStyle: {
    fontSize: "1.5rem",
  },
  buttonStyleFill: {
    fontSize: "1.5rem",
    color: "red"
  },
}));

const LikeOrSave = ({ onClick, saveClimb }) => {
  const classes = useStyles();
  return (
    <Box>
      {saveClimb ? (
        <BsBookmarkFill onClick={onClick} className={classes.buttonStyleFill} />
      ) : (
        <BsBookmark onClick={onClick} className={classes.buttonStyle} />
      )}
    </Box>
  );
};

export default LikeOrSave;
