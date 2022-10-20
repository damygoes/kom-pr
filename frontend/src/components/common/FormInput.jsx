import { Box, TextField } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  textField: {
    '& p':{
      color: "#ff0100",
    },
  },
}));

const FormInput = ({ formType, label, value, placeholder, variant, helperText, onChange }) => {

  const classes = useStyles();

  return (
    <>
      <Box sx={{width: "100%"}}>
        <label htmlFor={formType}>
          {label}
        </label>
        <TextField
          type={formType}
          name={formType}
          id={formType}
          value={value}
          variant={variant}
          onChange={onChange}
          placeholder={placeholder}
          helperText={helperText}
          className={classes.textField}
         
        />
      </Box>
    </>
  );
};

export default FormInput;
