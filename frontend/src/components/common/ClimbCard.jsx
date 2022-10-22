import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveOneClimb } from "../../actions/actions";
import { styled } from "@mui/material/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Collapse,
  Button,
  ButtonGroup,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { GiPathDistance, GiMountainRoad } from "react-icons/gi";
import { FaMaxcdn } from "react-icons/fa";
import { TbTypography } from "react-icons/tb";
import Notification from "./Notification";
import { showForms } from "../../features/loginFormSlice";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ClimbCard({ data }) {
  // * VARIABLES
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // * STATES
  const reducerQueries = useSelector((state) => state);
  const { userData } = reducerQueries.userReducer;
  const { success, user } = userData;
  const {
    name,
    description,
    country,
    distance,
    avgGradient,
    maxGradient,
    elevation,
    images,
    slug,
    _id,
  } = data;
  const [expanded, setExpanded] = useState(false);
  const [saveClimb, setSaveClimb] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState({
    message: "",
    status: "",
  });

  // * EVENT HANDLERS
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleCloseNotification = () => {
    setShowNotification(false)
  }
  const handleFormBackdrop = () => {
    dispatch(showForms(true));
  }
  const handleNavigateToCardDetails = () => {
    success ? navigate(`/explore/${slug}`) : handleFormBackdrop();
  };
  const toggleSave = async (climbID, user) => {
    setSaveClimb(!saveClimb);
    const data = {
      user,
      climbID,
    };
    const response = await saveOneClimb(data);
    if (response.success) {
      setNotificationData({
        message: response.message,
        status: "success",
      });
      setShowNotification(true);
    } else {
      setNotificationData({
        message: response.message,
        status: "info",
      });
      setShowNotification(true);
    }
  };

  return (
    <Card sx={{ maxWidth: { xs: 320, md: 345 }, cursor: "pointer" }}>
      <CardHeader
        title={name}
        subheader={country}
        onClick={handleNavigateToCardDetails}
      />
      <CardMedia
        component="img"
        height="294"
        image={images[0]}
        alt={name}
        onClick={handleNavigateToCardDetails}
      />
      <CardContent onClick={handleNavigateToCardDetails}>
        <ButtonGroup
          variant="text"
          size="small"
          aria-label="text button group"
          color="secondary"
        >
          <Button startIcon={<GiPathDistance />}> {`${distance}km`} </Button>
          <Button startIcon={<TbTypography />}> {`${avgGradient}%`} </Button>
          <Button startIcon={<FaMaxcdn />}> {`${maxGradient}%`} </Button>
          <Button startIcon={<GiMountainRoad />}> {`${elevation}m`} </Button>
        </ButtonGroup>
      </CardContent>
      {success && (
        <>
          <CardActions disableSpacing>
            <IconButton
              aria-label="add to favorites"
              onClick={() => toggleSave(_id, user)}
            >
              <FavoriteIcon />
            </IconButton>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{description}</Typography>
            </CardContent>
          </Collapse>
        </>
      )}
      <Notification
        notificationData={notificationData}
        showNotification={showNotification}
        closeNotification={handleCloseNotification}
      />
    </Card>
  );
}
