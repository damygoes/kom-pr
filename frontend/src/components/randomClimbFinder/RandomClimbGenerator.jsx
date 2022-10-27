import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Backdrop,
  Typography,
  Card,
  CardActions,
  CardContent,
  CardMedia,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchRandomClimb } from "../../actions/climbs";
import { setFormStatus } from "../../features/loginFormSlice";

const RandomClimbFinder = () => {
  // * DECLARED VARIABLES
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // * STATES
  const [open, setOpen] = useState(false);
  const reducerQueries = useSelector((state) => state);
  const { userReducer, randomClimbReducer } = reducerQueries;
  const { randomClimb } = randomClimbReducer;
  const { userData } = userReducer;


  // * EVENT HANDLERS
  const handleRandomClimb = () => {
    dispatch(fetchRandomClimb());
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleNavigateToCardDetails = (climbSlug) => {
    userData.id ? navigate(`/explore/${climbSlug}`) : handleFormBackdrop();
  };
  const handleFormBackdrop = () => {
    dispatch(setFormStatus(true));
    handleClose();
  };

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Find a random
          </Typography>
          <Typography
            variant="h5"
            component="div"
            sx={{ textTransform: "uppercase" }}
          >
            climb
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleRandomClimb}>
            Generate
          </Button>
        </CardActions>
      </Card>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        {randomClimb.map((climb) => {
          return (
            <Box
              key={climb.slug}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                minWidth: "60%",
                minHeight: "70%",
                margin: "auto",
              }}
            >
              <CloseIcon
                fontSize="medium"
                sx={{ alignSelf: "flex-end", cursor: "pointer" }}
                onClick={handleClose}
              />
              <Card sx={{ maxWidth: "100%", maxHeight: "100%" }}>
                <CardMedia
                  component="img"
                  alt={climb.name}
                  height="500"
                  image={climb.images[0]}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {climb.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${climb.location}, ${climb.country}`}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={handleRandomClimb}>
                    Retry
                  </Button>
                  <Link
                    to={userData.id !== "" ? `/explore/${climb.slug}` : ""}
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="small" onClick={()=>handleNavigateToCardDetails(climb.slug)} >Explore</Button>
                  </Link>
                </CardActions>
              </Card>
            </Box>
          );
        })}
      </Backdrop>
    </>
  );
};

export default RandomClimbFinder;
