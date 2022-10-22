import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import LoginPage from "./LoginPage";
import { showForms } from "../../features/loginFormSlice";

export default function FormBackDrop() {
  const dispatach = useDispatch();

  // * STATES
  const reducerQueries = useSelector((state) => state);
  const { formStatus } = reducerQueries.formReducer;

  //   * EVENT HANDLERS
  const handleCloseBackdrop = () => {
    dispatach(showForms(false));
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={formStatus}
      >
        <LoginPage onClose={handleCloseBackdrop} />
      </Backdrop>
    </div>
  );
}
