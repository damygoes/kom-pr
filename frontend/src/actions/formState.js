import { setFormStatus } from "../features/loginFormSlice";

export const showForm = () => async (dispatch) => {
  try {
    dispatch(setFormStatus(true));
  } catch (error) {
    console.log(error);
  }
};
