import React from "react";
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

export default function FavouriteClimbCard({ data }) {
  // * VARIABLES
  const navigate = useNavigate();
  const { name, country, images, location, slug } = data;

  // * EVENT HANDLERS
  const handleNavigation = (cardSlug) => {
    navigate(`/explore/${slug}`);
  };
  const handleDeleteFavClimb = () => {};

  return (
    <Card sx={{ display: "flex", height: 150, cursor: "pointer" }}>
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
            onClick={() => handleDeleteFavClimb()}
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
