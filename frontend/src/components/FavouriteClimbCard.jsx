import React from "react";
import { useSelector } from 'react-redux';
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
import { deleteOneSavedClimb } from '../actions/actions';

export default function FavouriteClimbCard({ data, onDeleteAction }) {
  // * VARIABLES
  const navigate = useNavigate();
  const { name, country, images, location, slug, _id } = data;
  

    //   * STATES
    const reducerQueries = useSelector((state) => state);
    const { userData } = reducerQueries.userReducer;
    const { user } = userData;
 

  // * EVENT HANDLERS
  const handleNavigation = (cardSlug) => {
    navigate(`/explore/${cardSlug}`);
  };
  const handleDeleteFavClimb = async (climbID) => {
    const response = await deleteOneSavedClimb(climbID, user)
    if (response.acknowledged && response.deletedCount === 1) {
      onDeleteAction()
    }
    
  };

  return (
    <Card sx={{ display: "flex", maxWidth: 400, height: 150, cursor: "pointer" }}>
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
        sx={{}}
        image={images[0]}
        alt={name}
        onClick={() => handleNavigation(slug)}
      />
    </Card>
  );
}
