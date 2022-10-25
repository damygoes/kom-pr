import React from "react";
import { Box, Typography } from "@mui/material";

const UserInfoTags = ({ title, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 6,
      }}
    >
      <Typography variant="h5"> {title} </Typography>
      <Typography variant="h5" fontStyle="italic">
        {value}
      </Typography>
    </Box>
  );
};

export default UserInfoTags;
