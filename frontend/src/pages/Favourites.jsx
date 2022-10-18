import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import PageHeadingCard from "../components/common/PageHeadingCard";
import { fetchSavedClimbs } from "../actions/actions";
import FavouriteClimbCard from "../components/FavouriteClimbCard";

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

  climbsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: "2rem",
    marginBottom: "3rem",
  },
  filterColumn: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "4rem",
    padding: "1rem",
    // border: "1px solid pink",
  },
}));

const Favourites = () => {
  //* DECLARED VARIABLES
  const classes = useStyles();

  //   * STATES
  const reducerQueries = useSelector((state) => state);
  const { userData } = reducerQueries.userReducer;
  const { user } = userData;
  const [favClimbs, setFavClimbs] = useState([]);

  const handleFetchFavouriteClimbs = async () => {
    const { savedClimbs } = await fetchSavedClimbs(user);
    setFavClimbs(savedClimbs);
  };

  useEffect(() => {
    handleFetchFavouriteClimbs();
  }, []);

  return (
    <Box className={classes.pageCol}>
      <PageHeadingCard
        text={"My Favourites"}
        image={
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
        }
      />
      <Box className={classes.pageRow}>
        {favClimbs.map((climb) => (
            <FavouriteClimbCard data={climb} key={climb.slug} />
        ))}
      </Box>
    </Box>
  );
};

export default Favourites;
