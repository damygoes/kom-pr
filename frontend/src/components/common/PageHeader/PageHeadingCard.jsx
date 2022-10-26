import React from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material/";

export default function PageHeadingCard({ text, image }) {
  return (
    <Box component="main" width="100%">
      <Card sx={{ display: "flex", height: 350 }}>
        <Box
          display={{ xs: "none", md: "flex" }}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 400 }}
            image={image}
            alt="#"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: "1",
          }}
        >
          <CardContent>
            <Typography component="div" variant="h3">
              {text}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}
