import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
} from "@mui/material";
import { MdOutlineDelete } from "react-icons/md";
import { deleteLikedClimb } from "../../actions/climbs";


export default function FavouriteClimbCard({ data, onDeleteAction, handleNotificationCard }) {
  // * VARIABLES
  const navigate = useNavigate();
  const { name, country, images, location, slug, _id } = data;
  const dispatch = useDispatch()
  

    //   * STATES
    const reducerQueries = useSelector((state) => state);
    const { userData } = reducerQueries.userReducer;
 

  // * EVENT HANDLERS
  const handleNavigation = (cardSlug) => {
    navigate(`/explore/${cardSlug}`);
  };
  const handleDeleteFavClimb = async (climbID) => {
    const data = {
      climbID: climbID,
      userID: userData.id
    }
    const response = await dispatch(deleteLikedClimb(data))
    if (response.acknowledged && response.deletedCount === 1) {
      handleNotificationCard(true)
      onDeleteAction()
    }
    
  };

  return (
    <Card sx={{ display: "flex", maxWidth: 400, height: 200, cursor: "pointer" }}>
      <Box sx={{ display: "flex", flexDirection: "column", width: 500 }}>
        <CardContent sx={{ flex: "1 0 auto" }} onClick={()=>handleNavigation(slug)}>
          <Typography component="div" variant="h5">
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {`${location}, ${country}`}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={() => handleDeleteFavClimb(_id)}
          >
            <MdOutlineDelete />
          </IconButton>
        </CardActions>
      </Box>
      <CardMedia
        component="img"
        image={images[0]}
        alt={name}
        onClick={() => handleNavigation(slug)}
      />
    </Card>
  );
}
