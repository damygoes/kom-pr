import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@mui/material";
import PageHeadingCard from "../components/common/PageHeadingCard";

const useStyles = makeStyles(() => ({
  pageCol: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "2rem",
  },
  pageRow: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "2rem",
    padding: "3rem",
    marginTop: "3rem",
  },
}));

const Estimator = () => {
  //* DECLARED VARIABLES
  const classes = useStyles();

  return (
    <>
      <PageHeadingCard
        text={"Estimate PR"}
        image={
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        }
      />
      <Box>Estimator</Box>
    </>
  );
};

export default Estimator;
