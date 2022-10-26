import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HotelCard from '../../Hotels/HotelCard';
import HotelSearchForm from '../../Hotels/HotelSearchForm';

export default function CardsAccordion({ currentClimb }) {
  // * VARIABLES
  const {coordinates} = currentClimb;

  // * STATES
  const reducerQueries = useSelector((state) => state);
  const { climbsReducer, hotelsReducer } = reducerQueries;
  const climbs = climbsReducer.climbs;
  const { hotels } = hotelsReducer;
  const [expanded, setExpanded] = useState(false);
  const [showHotelCards, setShowHotelCards] = useState(false);

  // * EVENT HANDLERS
  const relatedClimbs = climbs.filter(
    (climb) =>
      climb.country === currentClimb.country && climb.slug !== currentClimb.slug
  );

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleShowHotelCards = () => {
    setShowHotelCards(true);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        sx={{ maxWidth: "100%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="h5" sx={{ width: "33%", flexShrink: 0 }}>
            Other Climbs in {currentClimb.country}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            gap: "1rem",
            maxWidth: "100%",
            overflowX: "scroll",
          }}
        >
          {relatedClimbs.length > 0 ? (
            relatedClimbs.map((similarClimb) => {
              return (
                <Link
                  key={similarClimb.slug}
                  to={`/explore/${similarClimb.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card sx={{ width: 250, height: 300 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image={similarClimb.images[0]}
                        alt={similarClimb.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {similarClimb.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {`${similarClimb.location}, ${similarClimb.country}`}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              );
            })
          ) : (
            <Typography variant="h6"> {`No other climbs found in ${currentClimb.country}`}  </Typography>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{ maxWidth: "100%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="h5" sx={{ width: "33%", flexShrink: 0 }}>
            Nearby Hotels
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            display: "flex",
            gap: "1rem",
            maxWidth: "100%",
            overflowX: "scroll",
          }}
        >
          <HotelSearchForm
            climbCoordinates={coordinates}
            showHotelCards={handleShowHotelCards}
          />
          {showHotelCards &&
            (hotels.results.length > 0 ? (
              hotels.results.map((hotel) => {
                return (
                  <Box sx={{ width: 300 }} key={hotel.id}>
                    <HotelCard key={hotel.id} data={hotel} />
                  </Box>
                );
              })
            ) : (
              <Skeleton variant="rectangular" width={210} height={118} />
            ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
