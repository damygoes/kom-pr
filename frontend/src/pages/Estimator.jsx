import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@mui/material";
import PageHeadingCard from "../components/common/PageHeader/PageHeadingCard";
import EstimateIcon from "../assets/estimate.svg";
import ComingSoonLogo from "../assets/comingSoon.svg"

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
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: "2rem",
    padding: "3rem",
    marginTop: "3rem",
  },
}));

const Estimator = () => {
  //* DECLARED VARIABLES
  const classes = useStyles();

  return (
    <Box className={classes.pageCol}>
      <PageHeadingCard text={"Estimate PR"} image={EstimateIcon} />
      <Box className={classes.pageRow}>
        <img src={ComingSoonLogo} alt="logo" style={{height: "32rem"}} />
      </Box>
    </Box>
  );
};

export default Estimator;
