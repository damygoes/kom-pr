import React, {useState} from "react";
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
  Paper,
} from "@mui/material";
import {
  setFilterQuery,
  setFilterDirection,
  setCountry,
  resetFilters,
} from "../../features/filterSlice";

const filterItems = {
  "avg. Gradient": "avgGradient",
  country: "country",
  distance: "distance",
  elevation: "elevation",
  "max. Gradient": "maxGradient",
  name: "name",
};

const countries = [
  "Austria",
  "Belgium",
  "Italy",
  "Spain",
  "England"
];

export default function Filter() {
  // * VARIABLES
  const dispatch = useDispatch();

  // * STATES
  const [selectedCountry, setSelectedCountry] = useState("")

  // * EVENT HANDLERS
  const handleCheckBox = (filterValue) => {
    dispatch(setFilterQuery(filterValue));
  };
  const handleSwitch = (switchState) => {
    dispatch(setFilterDirection(switchState));
  };
  const handleSelectCountry = (country) => {
    setSelectedCountry(country)
    dispatch(setCountry(country));
  };
  const handleReset = () => {
    setSelectedCountry("")
    dispatch(resetFilters())
  };

  return (
    <Paper
      sx={{
        display: {
          xs: "flex",
          sm: "flex",
        },
        flexDirection: "column",
        width: "100%",
        p: 2,
      }}
    >
      <FormControl component="fieldset" variant="standard">
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
      <Box sx={{ mt: 4 }}>
        <FormLabel component="legend" sx={{ mb: 2 }}>
          Countries
        </FormLabel>
        <Box
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
                variant={`${selectedCountry === country ? "contained" : "outlined"}`}
                size="small"
                disableElevation
                onClick={() => handleSelectCountry(country)}
              >
                {country}
              </Button>
            );
          })}
        </Box>
      </Box>
      <Box sx={{ mt: 4, width: "100%" }}>
        <Button sx={{width:"100%"}} variant="contained" onClick={handleReset}> Reset Filters </Button>
      </Box>
    </Paper>
  );
}
