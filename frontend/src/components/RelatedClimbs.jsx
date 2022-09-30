import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { MobileStepper } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material/";
import SwipeableViews from "react-swipeable-views";
// import { autoPlay } from "react-swipeable-views-utils";
import { Box, Typography, Paper, Button } from "@mui/material";

const RelatedClimbs = ({ slug, country, currentClimb, data }) => {
  const theme = useTheme();
  // console.log(slug, country, currentClimb, data)

  const relatedClimbs = data.filter(
    (climb) =>
      climb.country === currentClimb.country && climb.slug !== currentClimb.slug
  );

  // console.log(relatedClimbs)

//   const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = relatedClimbs.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {relatedClimbs.map((climb, index) => (
            <Link
              key={climb.slug}
              to={`/explore/${climb.slug}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <>
                <Paper
                  square
                  elevation={0}
                  variant="outlined"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    height: 50,
                    pl: 1,
                  }}
                >
                  <Typography variant="h4">{climb.name}</Typography>
                </Paper>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: 455,
                      display: "block",
                      maxWidth: "100%",
                      overflow: "hidden",
                      width: "100%",
                    }}
                    src={climb.images[0]}
                    alt={climb.name}
                  />
                ) : null}
              </>
            </Link>
          ))}
        </SwipeableViews>
        <MobileStepper
          steps={maxSteps}
          variant="dots"
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      </Box>
      {/* <div>
        {relatedClimbs.map((relatedClimb) => {
          return <ClimbCard key={relatedClimb.slug} data={relatedClimb} />;
        })}
      </div> */}
    </>
  );
};

export default RelatedClimbs;
