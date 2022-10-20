import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PageHeadingCard from "../components/common/PageHeadingCard";
import FormInput from "../components/common/FormInput";
import Notification from "../components/common/Notification";
import ProfileDetail from "../components/common/ProfileDetail";
import { updateUserProfile } from "../actions/actions";
import { updateOldUserProfile } from "../features/userSlice";
import SettingsIcon from "../assets/profile.svg";

const useStyles = makeStyles(() => ({
  pageCol: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "relative",
    gap: "1rem",
    padding: "3rem",
    marginTop: "3rem",
  },
  userForm: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    borderRadius: "8px",
    backgroundColor: "#2d2726",
    color: "#fff",
    padding: "2rem",
  },
}));

const UserProfile = () => {
  //* DECLARED VARIABLES
  const classes = useStyles();
  const dispatch = useDispatch();

  //* STATES
  const reducerQueries = useSelector((state) => state);
  const { user } = reducerQueries.userReducer.userData;
  const { username, email, profile } = user;
  const [showForm, setShowForm] = useState(false);
  const [userProfile, setUserProfile] = useState({
    ftp: "",
    weight: "",
    wattPerKilo: "",
    bikeWeight: "",
    gender: "",
    location: "",
  });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    message: "message",
    status: "info",
  });

  //* EVENT HANDLERS
  const handleProfileForm = () => {
    setShowForm(true);
  };
  const handleCloseProfileForm = () => {
    setShowForm(false);
  };
  const handleCloseNotification = () => {
    setShowNotification(false);
  };
  const resetProfileForm = () => {
    setUserProfile({
      ftp: "",
      weight: "",
      wattPerKilo: "",
      bikeWeight: "",
      gender: "",
      location: "",
    });
  };
  const handleFormInputChange = ({ target: input }) => {
    const account = { ...userProfile };
    account[input.name] = input.value;
    setUserProfile(account);
  };
  const handleUpdateProfile = async (e, userID) => {
    e.preventDefault();
    setShowForm(false);
    resetProfileForm();
    const parsedUserData = {
      ftp: parseInt(userProfile.ftp),
      weight: parseInt(userProfile.weight),
      wattPerKilo: parseFloat(userProfile.wattPerKilo),
      bikeWeight: parseFloat(userProfile.bikeWeight),
      gender: userProfile.gender,
      location: userProfile.location,
    };
    const response = await updateUserProfile(userID, parsedUserData);
    const { success, message, updatedUserProfile } = response;
    const newUserProfile = updatedUserProfile.profile;
    dispatch(updateOldUserProfile(newUserProfile));
    if (success) {
      setShowNotification(true);
      setNotificationData({
        message,
        status: "success",
      });
    } else {
      setShowNotification(true);
      setNotificationData({
        message,
        status: "error",
      });
    }
  };

  return (
    <>
      <PageHeadingCard text={"My Profile"} image={SettingsIcon} />
      <Box className={classes.pageCol}>
        <Button
          sx={{
            alignSelf: "flex-end",
            cursor: "pointer",
            marginBottom: "3rem",
          }}
          size="small"
          variant="contained"
          onClick={handleProfileForm}
        >
          Complete Profile
        </Button>
        <ProfileDetail title="NAME" text={username} />
        <ProfileDetail title="EMAIL ADDRESS" text={email} />
        {Object.keys(profile).map((item) => {
          let unit = "";
          if (item === "ftp") {
            unit = "Watt";
          }
          if (item === "wattPerKilo") {
            unit = "w/kg";
          }
          if (item === "bikeWeight" || item === "weight") {
            unit = "kg";
          }
          return (
            <ProfileDetail
              key={item}
              title={item.toUpperCase()}
              text={profile[item]}
              unit={unit}
            />
          );
        })}

        {/* PROFILE FORM */}
        {showForm && (
          <Box
            component="form"
            className={classes.userForm}
            sx={{
              "& .MuiTextField-root": {
                width: "100%",
              },
            }}
          >
            <CloseIcon
              style={{
                fontSize: "2rem",
                alignSelf: "flex-end",
                cursor: "pointer",
                stroke: "#fff",
              }}
              onClick={handleCloseProfileForm}
            />
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                padding: "2rem",
                gap: "2rem",
                width: "100%",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  gap: "2rem",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <FormInput
                  formType="ftp"
                  label="FTP (in watts)"
                  placeholder="in Watts"
                  variant="standard"
                  value={userProfile.ftp}
                  onChange={handleFormInputChange}
                />
                <FormInput
                  formType="weight"
                  label="Weight (in kg)"
                  placeholder="in kg"
                  variant="standard"
                  value={userProfile.weight}
                  onChange={handleFormInputChange}
                />
                <FormInput
                  formType="wattPerKilo"
                  label="Watt per Kilo (w/kg)"
                  placeholder="w/kg"
                  variant="standard"
                  value={userProfile.wattPerKilo}
                  onChange={handleFormInputChange}
                />
                <FormInput
                  formType="bikeWeight"
                  label="Bike Weight (in kg)"
                  placeholder="in kg"
                  variant="standard"
                  value={userProfile.bikeWeight}
                  onChange={handleFormInputChange}
                />
                <FormInput
                  formType="gender"
                  label="Gender (m/f)"
                  placeholder="m/f"
                  variant="standard"
                  value={userProfile.gender}
                  onChange={handleFormInputChange}
                />
                <FormInput
                  formType="location"
                  label="Location"
                  placeholder="Germany"
                  variant="standard"
                  value={userProfile.location}
                  onChange={handleFormInputChange}
                />

                <Notification
                  showNotification={showNotification}
                  notificationData={notificationData}
                />
              </Box>
              <Button
                variant="contained"
                size="large"
                sx={{ mt: "2rem" }}
                onClick={(e) => handleUpdateProfile(e, user.id)}
              >
                Update
              </Button>
            </Box>
          </Box>
        )}
        <Notification
          showNotification={showNotification}
          notificationData={notificationData}
          closeNotification={handleCloseNotification}
        />
      </Box>
    </>
  );
};

export default UserProfile;
