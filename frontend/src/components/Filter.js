import React from "react";
import { useDispatch } from "react-redux";
import {
  Box,
  FormLabel,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Switch,
  Button,
} from "@mui/material";
import {
  setFilterQuery,
  setFilterDirection,
  setCountry,
  // resetFilters,
} from "../features/filterSlice";

const filterItems = {
  "avg. Gradient": "avgGradient",
  country: "country",
  distance: "distance",
  elevation: "elevation",
  "max. Gradient": "maxGradient",
  name: "name",
};

const countries = [
  "Belgium",
  "Colombia",
  "Cyprus",
  "England",
  "France",
  "Hawaii",
  "Italy",
  "Scotland",
  "Spain",
  "UK",
  "Wales",
];

export default function Filter() {
  const dispatch = useDispatch();

  const handleCheckBox = (filterValue) => {
    dispatch(setFilterQuery(filterValue));
  };
  const handleSwitch = (switchState) => {
    dispatch(setFilterDirection(switchState));
  };
  const handleSelectCountry = (country) => {
    dispatch(setCountry(country));
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "1rem",
          }}
        >
          <FormLabel component="legend">Filters</FormLabel>
          <FormControlLabel
            control={
              <Switch
                size="small"
                onChange={(e) => handleSwitch(e.target.checked)}
              />
            }
            label="Descending"
          />
        </div>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
        >
          {Object.keys(filterItems).map((filter) => {
            return (
              <FormControlLabel
                key={filter}
                value={filterItems[filter]}
                control={
                  <Radio
                    size="small"
                    onChange={(e) => handleCheckBox(e.target.value)}
                  />
                }
                label={filter}
                sx={{ textTransform: "capitalize" }}
              />
            );
          })}
        </RadioGroup>
      </FormControl>
      <Box>
        <FormLabel sx={{ m: 3 }} component="legend">
          Countries
        </FormLabel>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%",
            gap: "0.5rem",
          }}
        >
          {countries.map((country) => {
            return (
              <Button
                key={country}
                variant="contained"
                size="small"
                disableElevation
                onClick={() => handleSelectCountry(country)}
              >
                {country}
              </Button>
            );
          })}
        </div>
      </Box>
    </Box>
  );
}
