import React, { useState } from "react";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Stack,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material/";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { getNearbyHotels } from "../../actions/hotels";
import { setHotels } from "../../features/hotelsSlice";


// * VARIABLES
const guests = [1, 2, 3, 4, 5];
const currencyOptions = ["AUD", "CAD", "CHF", "EUR", "GBP", "USD"];
const sortOrder = {
  Bestseller: "BEST_SELLER",
  Price: "PRICE",
};
const localeOptions = {
  DE: "de_DE",
  US: "en_US",
};

const useStyles = makeStyles(() => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
  },
}));

export default function HotelSearchForm({ climbCoordinates, showHotelCards }) {
  //* DECLARED VARIABLES
  const classes = useStyles();
  const dispatch = useDispatch();

  // * STATES
  const [checkInValue, setCheckInValue] = useState(dayjs(""));
  const [checkOutValue, setCheckOutValue] = useState(dayjs(""));
  const [currency, setCurrency] = useState("");
  const [locale, setLocale] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [guestNumber, setGuestNumber] = useState(1);
  const [showSearchForm, setShowSearchForm] = useState(true);

  //   * EVENT HANDLERS
  const handleCheckInDate = (newValue) => {
    setCheckInValue(newValue);
  };
  const handleCheckOutDate = (newValue) => {
    setCheckOutValue(newValue);
  };
  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
  };
  const handleGuestChange = (newGuestNumber) => {
    setGuestNumber(newGuestNumber);
  };
  const handleFilterChange = (newFilterValue) => {
    setFilterValue(newFilterValue);
  };
  const handleLocaleChange = (newLocale) => {
    setLocale(newLocale);
  };
  const resetForm = () => {
    setCheckInValue(dayjs("2022-10-21"));
    setCheckOutValue(dayjs("2022-10-21"));
    setCurrency("");
    setGuestNumber(1);
    setFilterValue("");
    setLocale("");
  };
  const handleHotelSearch = async () => {
    const formData = {
      checkin_date: checkInValue.$d
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-"),
      checkout_date: checkOutValue.$d
        .toLocaleDateString()
        .split("/")
        .reverse()
        .join("-"),
      currency: currency,
      adults_number: guestNumber,
      sort_order: filterValue,
      locale: locale,
    };
    const { searchResults } = await getNearbyHotels(climbCoordinates, formData);
    const results = searchResults.results;
    dispatch(
      setHotels({
        results,
      })
    );
    resetForm();
    setShowSearchForm(false);
    showHotelCards();
  };

  return (
    <>
      {showSearchForm && (
        <Box className={classes.formContainer}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3} direction="row">
              <DesktopDatePicker
                label="Check-In"
                inputFormat="YYYY/MM/DD"
                value={checkInValue}
                onChange={handleCheckInDate}
                renderInput={(params) => <TextField {...params} />}
              />
              <DesktopDatePicker
                label="Check-Out"
                inputFormat="YYYY/MM/DD"
                value={checkOutValue}
                onChange={handleCheckOutDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="currency-label">Currency</InputLabel>
              <Select
                labelId="currency-label"
                id="currency-select"
                value={currency}
                label="Currency"
                onChange={(e) => handleCurrencyChange(e.target.value)}
              >
                {currencyOptions.map((currencyItem) => {
                  return (
                    <MenuItem key={currencyItem} value={currencyItem}>
                      {currencyItem}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="no-of-guests">No. of Guests</InputLabel>
              <Select
                labelId="no-of-guests"
                id="no-of-guests-select"
                value={guestNumber}
                label="No. of Guests"
                onChange={(e) => handleGuestChange(e.target.value)}
              >
                {guests.map((guest) => {
                  return (
                    <MenuItem key={guest} value={guest}>
                      {guest}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="sort-by">Sort By</InputLabel>
              <Select
                labelId="sort-by"
                id="sort-by-select"
                label="Sort By"
                value={filterValue}
                onChange={(e) => handleFilterChange(e.target.value)}
              >
                {Object.keys(sortOrder).map((item) => {
                  return (
                    <MenuItem key={item} value={sortOrder[item]}>
                      {" "}
                      {item}{" "}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="locale">Region</InputLabel>
              <Select
                labelId="locale"
                id="locale-select"
                label="Region"
                value={locale}
                onChange={(e) => handleLocaleChange(e.target.value)}
              >
                {Object.keys(localeOptions).map((country) => {
                  return (
                    <MenuItem key={country} value={localeOptions[country]}>
                      {" "}
                      {country}{" "}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
          <Button variant="contained" onClick={handleHotelSearch}>
            search
          </Button>
        </Box>
      )}
    </>
  );
}
