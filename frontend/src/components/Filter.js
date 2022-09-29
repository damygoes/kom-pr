import React from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

let filterItems = {
  "avg. Gradient": "avgGradient",
  country: "country",
  distance: "distance",
  elevation: "elevation",
  "max. Gradient": "maxGradient",
  name: "name",
};

export default function Filter({ handleFilter }) {
  return (
    <ToggleButtonGroup
      orientation="vertical"
      value={""}
      exclusive
      fullWidth
      onChange={(e) => handleFilter(e)}
    >
      <ToggleButton
        value={""}
        // disabled={true}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>Filter </div>
        {/* <Box>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox size="small" />}
              label="Descending"
            />
          </FormGroup>
        </Box> */}
      </ToggleButton>
      {Object.keys(filterItems).map((key) => {
        return (
          <ToggleButton
            key={key}
            value={filterItems[key]}
            aria-label="filter-list"
          >
            {key}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
}
