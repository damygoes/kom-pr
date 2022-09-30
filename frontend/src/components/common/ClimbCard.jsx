import * as React from "react";
import { Link } from "react-router-dom";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GiPathDistance, GiMountainRoad } from "react-icons/gi";
import { FaMaxcdn } from "react-icons/fa";
import { TbTypography } from "react-icons/tb";

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
    maxGradient,
    elevation,
    images,
    slug,
  } = data;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, cursor: "pointer" }}>
      <Link
        to={`/explore/${slug}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardHeader title={name} subheader={country} />
        <CardMedia component="img" height="294" image={images[0]} alt="" />
        <CardContent>
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
      </Link>
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
