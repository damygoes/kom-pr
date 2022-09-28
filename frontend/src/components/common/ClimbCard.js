import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { Collapse, Button, ButtonGroup } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GiPathDistance, GiMountainRoad } from "react-icons/gi";
import { FaMountain } from "react-icons/fa";

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
  const {
    name,
    description,
    country,
    distance,
    avgGradient,
    elevation,
    image,
  } = data;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
      <CardHeader title={name} subheader={country} />
      <CardMedia component="img" height="294" image={image} alt="" />
      <CardContent>
        <ButtonGroup
          variant="text"
          aria-label="text button group"
          color="secondary"
        >
          <Button startIcon={<GiPathDistance />}> {`${distance}km`} </Button>
          <Button startIcon={<FaMountain />}> {`${avgGradient}%`} </Button>
          <Button startIcon={<GiMountainRoad />}> {`${elevation}m`} </Button>
        </ButtonGroup>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
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
    </Card>
  );
}
