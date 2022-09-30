import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  ButtonGroup,
  CardActionArea,
  CardActions,
} from "@mui/material";
import Masonry from "@mui/lab/Masonry";
import { GiPathDistance, GiMountainRoad } from "react-icons/gi";
import { FaMaxcdn } from "react-icons/fa";
import { TbTypography } from "react-icons/tb";
import ClimbCard from "../components/common/ClimbCard";

const useStyles = makeStyles(() => ({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "2rem",
    marginTop: "3rem",
    marginBottom: "4rem",
    // border: "1px solid green",
  },
  relatedClimbsWrapper: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "1rem"
  },
}));

const ClimbDetails = () => {
  const classes = useStyles();
  const reducerQueries = useSelector((state) => state);
  const { climbsReducer } = reducerQueries;
  const { slug } = useParams();

  const selectedClimb = climbsReducer.climbs.filter(
    (climb) => climb.slug === slug
  );

  // console.log(selectedClimb);

  return (
    <Container>
      {selectedClimb.length > 0 ? (
        selectedClimb.map((climb) => {
          const relatedClimbs = climbsReducer.climbs.filter(
            (relatedClimb) =>
              relatedClimb.country === climb.country &&
              relatedClimb.slug !== climb.slug
          );
          return (
            <div className={classes.pageContainer} key={climb.slug}>
              <Card sx={{ maxWidth: "100%" }}>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h2"
                    component="div"
                    color="primary"
                  >
                    {climb.name}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="p"
                    color="secondary"
                  >
                    {`${climb.location},${climb.country}`}
                  </Typography>
                </CardContent>
                <CardActionArea sx={{ p: 2 }}>
                  <Masonry
                    columns={3}
                    spacing={2}
                    sx={{ marginBottom: "1rem" }}
                  >
                    {climb.images.map((image) => (
                      <img src={image} alt="" key={image} />
                    ))}
                  </Masonry>
                  <CardContent>
                    <ButtonGroup
                      variant="text"
                      size="large"
                      aria-label="text button group"
                      color="secondary"
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <Button startIcon={<GiPathDistance />}>
                        {`${climb.distance}km`}
                      </Button>
                      <Button startIcon={<TbTypography />}>
                        {`${climb.avgGradient}%`}
                      </Button>
                      <Button startIcon={<FaMaxcdn />}>
                        {`${climb.maxGradient}%`}
                      </Button>
                      <Button startIcon={<GiMountainRoad />}>
                        {`${climb.elevation}m`}
                      </Button>
                    </ButtonGroup>
                  </CardContent>

                  <CardContent>
                    <Typography variant="body1" color="text.secondary">
                      {climb.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="medium" color="secondary">
                    Visit
                  </Button>
                </CardActions>
              </Card>
              <Box className={classes.relatedClimbsWrapper}>
                <Typography
                  variant="h3"
                  fontSize={"2rem"}
                  component="p"
                  color="secondary"
                  sx={{marginBottom: "3rem", marginTop: "2rem"}}
                >
                  Related Climbs
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    gap: "2rem",
                  }}
                >
                  {relatedClimbs.map((relatedClimb) => {
                    return (
                      <ClimbCard key={relatedClimb.slug} data={relatedClimb} />
                    );
                  })}
                </Box>
              </Box>
            </div>
          );
        })
      ) : (
        <div> No Climb Found </div>
      )}
    </Container>
  );
};

export default ClimbDetails;
