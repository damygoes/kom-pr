import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Typography,
} from "@mui/material";

export default function HotelCard({ hotel }) {
    const {name, distance} = hotel;

  return (
    <Card sx={{ width: 345, height: 300 }}>
      <CardMedia
        component="img"
        alt={name}
        height="140"
        image={"https://images.unsplash.com/photo-1605825831039-8b6b4199b04a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aG90ZWx8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {`${distance.value} ${distance.unit}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
