import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageHeadingCard from "../components/common/PageHeader/PageHeadingCard";
import Settings from "../assets/profile.svg";
import { Button, Paper } from "@mui/material";
import ProfileUpdateForm from "../Form/ProfileUpdateForm";
import UserInfoTags from "../components/userProfile/UserInfoTags";
import Notification from "../components/common/Toasts/Notification";
import { updateUserProfile } from "../actions/auth";
import { setUser } from "../features/userSlice";

const UserProfile = () => {
  // * STATES
  const reducerQueries = useSelector((state) => state);
  const { userData } = reducerQueries.userReducer;
  const dispatch = useDispatch();

  // * DECLARED VARIABLES
  const initialState = {
    ftp: userData.profile.ftp,
    weight: userData.profile.weight,
    wattPerKilo: userData.profile.wattPerKilo,
    bikeWeight: userData.profile.bikeWeight,
    gender: userData.profile.gender,
    location: userData.profile.location,
  };

  // * STATES
  const [toggleForm, setToggleForm] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [notificationData, setNotificationData] = useState({
    message: "",
    status: "",
  });

  // * DECLARED VARIABLES
  const profileFields = {
    Ftp: formData.ftp,
    Weight: formData.weight,
    "Watt per kilo": formData.wattPerKilo,
    "Bike Weight": formData.bikeWeight,
    Gender: formData.gender,
    Location: formData.location,
  };

  // * EVENT HANDLERS
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    return initialState;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateUserProfile(userData.id, formData));
    let newUserData = {
      admin: userData.admin,
      avatar: userData.avatar,
      email: userData.email,
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      token: userData.token,
      profile: {
        ftp: result.profile.ftp,
        weight: result.profile.weight,
        wattPerKilo: result.profile.wattPerKilo,
        bikeWeight: result.profile.bikeWeight,
        gender: result.profile.gender,
        location: result.profile.location,
      },
    };
    await dispatch(setUser(newUserData));
    console.log(result);
    if (result.success) {
      setNotificationData({
        message: result.message,
        status: "success",
      });
      setShowNotification(true);
    } else {
      setNotificationData({
        message: result.message,
        status: "info",
      });
      setShowNotification(true);
    }
    resetForm();
    handleToggleForm();
  };

  const handleToggleForm = () => {
    setToggleForm(!toggleForm);
  };
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div>
      <PageHeadingCard text={"My Profile"} image={Settings} />
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          mt: 8,
          p: 6,
          gap: 3,
          position: "relative",
        }}
        elevation={3}
      >
        <Button
          variant="contained"
          sx={{ alignSelf: "flex-end" }}
          onClick={handleToggleForm}
        >
          Edit Profile
        </Button>
        <UserInfoTags
          title="Name:"
          value={`${userData.firstName} ${userData.lastName}`}
        />
        <UserInfoTags title="Email:" value={`${userData.email}`} />
        {Object.keys(profileFields).map((field) => {
          let unit;
          if (field === "Ftp") {
            unit = "w";
          }
          if (field === "Weight" || field === "Bike Weight") {
            unit = "kg";
          }
          if (field === "Watt per kilo") {
            unit = "w/kg";
          }
          return (
            <UserInfoTags
              key={field}
              title={`${field}:`}
              value={profileFields[field] + `${unit ? unit : ""}`}
            />
          );
        })}
        {toggleForm && (
          <ProfileUpdateForm
            userID={userData.id}
            userAvatar={userData.avatar}
            handleToggleForm={handleToggleForm}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={formData}
          />
        )}
      </Paper>
      <Notification
        notificationData={notificationData}
        showNotification={showNotification}
        closeNotification={handleCloseNotification}
      />
    </div>
  );
};

export default UserProfile;
