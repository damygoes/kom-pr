import React from "react";
import { TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Input = ({
  name,
  half,
  label,
  type,
  handleChange,
  autoFocus,
  handleShowPassword,
}) => {

  const handlePasswordVisibility = () => {
    return name === "password" ? {
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={handleShowPassword}>
            {type === "password" ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </InputAdornment>
      ),
    } : null
  }


  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          handlePasswordVisibility()
        }
      />
    </Grid>
  );
};

export default Input;
