import React from "react";
// import { useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Chip,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import SellIcon from "@mui/icons-material/Sell";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import BedroomParentIcon from "@mui/icons-material/BedroomParent";

export default function HotelCard({ data }) {
  // * VARIABLES
  // const navigate = useNavigate();
  const { name, optimizedThumbUrls, ratePlan, starRating, address } =
    data;

  // * EVENT HANDLERS
  // const handleNavigation = () => {};

  return (
    <Card sx={{ width: 300, height: 300 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="150"
          image={optimizedThumbUrls.srpDesktop}
          alt={name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            fontSize="large"
          >
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" fontSize="small">
            {address.streetAddress && `${address.streetAddress},`}
            {address.postalCode && `${address.postalCode},`}
            {`${address.locality}, ${address.countryName}`}
          </Typography>
          <Stack
            direction="row"
            spacing={3}
            sx={{ mt: 3 }}
          >
            <Chip
              icon={<SellIcon />}
              label={ratePlan.price.current}
              variant="outlined"
              size="small"
              sx={{p:1}}
            />
            <Chip
              icon={<ThumbUpIcon />}
              label={ <Rating
                name="rating-read-only"
                value={starRating}
                precision={0.5}
                size="small"
                sx={{p:1}}
                readOnly
              />}
              variant="outlined"
              size="small"
            />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}