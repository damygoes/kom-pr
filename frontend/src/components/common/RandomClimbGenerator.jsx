import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
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
import { fetchRandomClimb } from "../../actions/actions";

const RandomClimbGenerator = () => {
  // * STATES
  const [open, setOpen] = useState(false);
  const [randomClimb, setRandomClimb] = useState([]);
  const reducerQueries = useSelector((state) => state);
  const { userData } = reducerQueries.userReducer;
  const { user } = userData;


  // * EVENT HANDLERS
  const handleRandomClimb = async () => {
    let response = await fetchRandomClimb(user);
    setRandomClimb(response);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    if (user.id !== "") {
      handleRandomClimb();
      setOpen(true);
    } else {
      alert("Please Log In");
    }
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
          <Button size="small" onClick={handleToggle}>
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
                    to={`/explore/${climb.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="small">Explore</Button>
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

export default RandomClimbGenerator;
