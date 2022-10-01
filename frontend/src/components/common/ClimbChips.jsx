import React from 'react';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { GiPathDistance, GiMountainRoad } from "react-icons/gi";
import { FaMaxcdn } from "react-icons/fa";
import { TbTypography } from "react-icons/tb";

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ClimbChips({climb}) {
  const {distance, avgGradient, maxGradient, elevation} = climb;
  const chipData = [
    { key: 0, label: 'Distance', icon: <GiPathDistance/>, value: `${distance}km`  },
    { key: 1, label: 'Avg. Gradient', icon: <TbTypography/>, value: `${avgGradient}%` },
    { key: 2, label: 'Max. Gradient', icon: <FaMaxcdn/>, value: `${maxGradient}%` },
    { key: 3, label: 'Total Elevation', icon: <GiMountainRoad/>, value: `${elevation}m` },
  ];


  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: "fit-content",
        flexWrap: 'wrap',
        listStyle: 'none',
        gap: "2rem",
        p: 0.5,
        m: "auto"
      }}
      component="ul"
    >
      {chipData.map((data) => {
        return (
          <ListItem key={data.key}>
            <Chip
              icon={data.icon}
              label={`${data.label}: ${data.value}`}
            /> 
          </ListItem>
        );
      })}
    </Paper>
  );
}
