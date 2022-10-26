import React, { useState } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@mui/material";

export default function ClimbsPerPageSelect({ handleClimbsPerPage }) {
  // STATES
  const [showClimbsPerPage, setShowClimbsPerPage] = useState("");

  //   DECLARED VARIABLES
  const cardNumbers = [null, 1, 2, 4, 6, 8];

  // EVENT HANDLERS
  const handleSetClimbsPerPage = ({ target }) => {
    setShowClimbsPerPage(target.value);
    handleClimbsPerPage(target.value);
  };

  return (
    <FormControl sx={{ minWidth: 150, marginLeft:"auto" }} size="small">
      <InputLabel
        id="climbs-per-page-select-small"
        sx={{ fontStyle: "italic" }}
      >
        Items Per Page
      </InputLabel>
      <Select
        labelId="climbs-per-page-select"
        id="climbs-per-page-select"
        value={showClimbsPerPage}
        label="climbs-per-page"
        onChange={(e) => handleSetClimbsPerPage(e)}
      >
        {cardNumbers.map((number) => (
          <MenuItem key={number} value={number}>
            {number}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
