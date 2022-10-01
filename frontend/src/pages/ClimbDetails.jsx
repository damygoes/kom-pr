import React from "react";
import { useNavigate } from "react-router-dom";
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
  CardActionArea,
  CardActions,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RelatedClimbs from "../components/RelatedClimbs";
import ClimbChips from "../components/common/ClimbChips";
import ImagesMasonry from "../components/common/ImagesMasonry";

const useStyles = makeStyles(() => ({
  page: {
    marginTop: "3rem"
  },
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
    padding: "1rem",
  },
}));

const ClimbDetails = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const reducerQueries = useSelector((state) => state);
  const { climbsReducer } = reducerQueries;
  const { slug } = useParams();

  const selectedClimb = climbsReducer.climbs.filter(
    (climb) => climb.slug === slug
  );

  return (
    <Container className={classes.page} >
      <Button variant="outlined" startIcon={<ArrowBackIcon/>} onClick={()=>navigate(-1)} >
        Back
      </Button>
      {selectedClimb.length > 0 ? (
        selectedClimb.map((climb) => {
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
                  <ImagesMasonry images={climb.images} />
                  <CardContent>
                    <ClimbChips climb={climb} />
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
                <RelatedClimbs
                  slug={slug}
                  country={climb.country}
                  currentClimb={climb}
                  data={climbsReducer.climbs}
                />
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
