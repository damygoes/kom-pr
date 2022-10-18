import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material/";
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

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
  const reducerQueries = useSelector((state) => state);
  const { userData } = reducerQueries.userReducer;
  const { user } = userData;
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
