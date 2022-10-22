import React from "react";
import { useNavigate } from "react-router-dom";
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
import BedroomParentIcon from "@mui/icons-material/BedroomParent";

export default function HotelCard({ data }) {
  // * VARIABLES
  const navigate = useNavigate();
  const {
    name,
    optimizedThumbUrls,
    ratePlan,
    roomsLeft,
    starRating,
    address,
    urls,
  } = data;

  // * EVENT HANDLERS
  const handleNavigation = () => {};

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
            {`${address.streetAddress}, ${address.postalCode} ${address.locality}, ${address.countryName}`}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
            <Chip
              icon={<SellIcon />}
              label={ratePlan.price.current}
              variant="outlined"
              size="small"
            />
            <Chip
              icon={<BedroomParentIcon />}
              label={`${roomsLeft} available`}
              variant="outlined"
              size="small"
            />
            <Rating
              name="read-only"
              value={starRating}
              precision={0.5}
              size="small"
              readOnly
            />
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// flex: "1 0 auto"
