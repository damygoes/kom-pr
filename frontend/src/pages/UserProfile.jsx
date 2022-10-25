import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageHeadingCard from "../components/common/PageHeadingCard";
import Settings from "../assets/profile.svg";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import ProfileUpdateForm from "../Form/ProfileUpdateForm";
import UserInfoTags from "../components/userProfile/UserInfoTags";

const initialState = {
  ftp: "",
  weight: "",
  wattPerKilo: "",
  bikeWeight: "",
  gender: "",
  location: "",
};

const UserProfile = () => {
  const reducerQueries = useSelector((state) => state);
  const { userData } = reducerQueries.userReducer;

  // const dispatch = useDispatch();

  // * STATES
  const [errorText, setErrorText] = useState("");
  const [toggleForm, setToggleForm] = useState(false);

  const profileFields = {
    Ftp: userData.profile.ftp,
    Weight: userData.profile.weight,
    "Watt per kilo": userData.profile.wattPerKilo,
    "Bike Weight": userData.profile.bikeWeight,
    Gender: userData.profile.gender,
    Location: userData.profile.location,
  };

  const handleToggleForm = () => {
    setToggleForm(!toggleForm);
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
          p: 2,
          gap: 4,
          position: "relative",
        }}
        elevation={3}
      >
        <Button
          variant="contained"
          sx={{ alignSelf: "flex-end" }}
          onClick={handleToggleForm}
        >
          {" "}
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
            handleToggleForm={handleToggleForm}
          />
        )}
      </Paper>
    </div>
  );
};

export default UserProfile;
