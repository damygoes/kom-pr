import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import PageHeadingCard from "../components/common/PageHeadingCard";
import { fetchSavedClimbs } from "../actions/actions";
import FavouriteClimbCard from "../components/FavouriteClimbCard";
import SavedIcon from "../assets/favourite.svg";

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
      <PageHeadingCard text={"My Favourites"} image={SavedIcon} />
      <Box className={classes.pageRow}>
        {favClimbs.map((climb) => (
          <FavouriteClimbCard
            data={climb}
            key={climb.slug}
            onDeleteAction={handleFetchFavouriteClimbs}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Favourites;
