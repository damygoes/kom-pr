import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@mui/material";
import PageHeadingCard from "../components/common/PageHeader/PageHeadingCard";
import EstimateIcon from "../assets/estimate.svg";

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
      <PageHeadingCard text={"Estimate PR"} image={EstimateIcon} />
      <Box>Estimator</Box>
    </>
  );
};

export default Estimator;
