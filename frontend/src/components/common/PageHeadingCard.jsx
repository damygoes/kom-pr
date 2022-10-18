import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material/";

export default function PageHeadingCard({text, image}) {

  return (
    <Card sx={{ display: "flex", height: 350 }}>
      <CardMedia
        component="img"
        sx={{ width: 400 }}
        image={
          image
        }
        alt="#"
      />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "1 0 auto" }}>
        <CardContent >
          <Typography component="div" variant="h3">
            {text}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}

