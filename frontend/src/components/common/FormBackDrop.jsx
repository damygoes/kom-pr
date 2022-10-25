import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
// import LoginPage from "./LoginPage";
import { setFormStatus } from "../../features/loginFormSlice";
import Auth from "../../Auth/Auth";

export default function FormBackDrop() {
  const dispatch = useDispatch();

  // * STATES
  const reducerQueries = useSelector((state) => state);
  const { formStatus } = reducerQueries.formReducer;

  //   * EVENT HANDLERS
  const handleCloseBackdrop = () => {
    dispatch(setFormStatus(false));
  };

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={formStatus}
      >
        {/* <LoginPage onClose={handleCloseBackdrop} /> */}
        <Auth onClose={handleCloseBackdrop} />
      </Backdrop>
    </div>
  );
}
