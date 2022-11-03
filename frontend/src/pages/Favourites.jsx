import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import PageHeadingCard from "../components/common/PageHeader/PageHeadingCard";
import FavouriteClimbCard from "../components/SavedClimbs/FavouriteClimbCard";
import SavedIcon from "../assets/favourite.svg";
import { fetchLikedClimbs } from "../actions/climbs";
import Notification from "../components/common/Toasts/Notification";


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
  const dispatch = useDispatch();

  //   * STATES
  const reducerQueries = useSelector((state) => state);
  const { userData } = reducerQueries.userReducer;
  const userId = userData.id;
  const [favClimbs, setFavClimbs] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    message: "",
    status: "",
  });

  const handleNotificationCard = (actionStatus) => {
    setShowNotification(true);
    if (actionStatus) {
      setNotificationData({ message: "Climb Deleted", status: "success" });
    } else {
      setNotificationData({
        message: "Oops!, Something went wrong",
        status: "error",
      });
    }
  };

  const handleFetchFavouriteClimbs = async () => {
    const response = await dispatch(fetchLikedClimbs(userId));
    setFavClimbs(response);
  };
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  useEffect(() => {
    handleFetchFavouriteClimbs();
  });

  return (
    <Box className={classes.pageCol}>
      <PageHeadingCard text={"My Favourites"} image={SavedIcon} />
      <Box className={classes.pageRow}>
        {favClimbs.map((climb) => (
          <FavouriteClimbCard
            data={climb}
            key={climb.slug}
            onDeleteAction={handleFetchFavouriteClimbs}
            handleNotificationCard={handleNotificationCard}
          />
        ))}
      </Box>
      <Notification
        notificationData={notificationData}
        showNotification={showNotification}
        closeNotification={handleCloseNotification}
      />
    </Box>
  );
};

export default Favourites;
