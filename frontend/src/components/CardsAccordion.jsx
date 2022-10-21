import React, { useState, useEffect } from "react";
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
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getClimbCoordinates } from "../actions/actions";
import HotelSearchForm from "./HotelSearchForm";

export default function CardsAccordion({ currentClimb }) {
  // * VARIABLES
  // const climbAddress = `${currentClimb.location}, ${currentClimb.country}`
  const climbAddress = "Waldstrasse 46, 33813 Oerlinghausen, Germany";
  // * STATES
  const reducerQueries = useSelector((state) => state);
  const { climbsReducer } = reducerQueries;
  const climbs = climbsReducer.climbs;
  const [expanded, setExpanded] = useState(false);
  const [climbCoordinates, setClimbCoordinates] = useState({})

  // * EVENT HANDLERS
  const relatedClimbs = climbs.filter(
    (climb) =>
      climb.country === currentClimb.country && climb.slug !== currentClimb.slug
  );

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleGeoCode = async () => {
    const response = await getClimbCoordinates(climbAddress);
    const coordinates = {
      lat: response.lat,
      long: response.lon,
    };
   setClimbCoordinates(coordinates)
  };

  useEffect(()=>{
    handleGeoCode()
  }, [climbAddress])

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
            Similar Climbs
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
                  <Card sx={{ width: 250 }}>
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
            <Typography variant="h6"> No related climbs found </Typography>
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
          <HotelSearchForm climbCoordinates={climbCoordinates} />
          {/* {relatedClimbs.length > 0 ? (
            relatedClimbs.map((similarClimb) => {
              return (
                <Link
                  key={similarClimb.slug}
                  to={`/explore/${similarClimb.slug}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card sx={{ width: 250 }}>
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
            <Typography variant="h5"> No related climbs found </Typography>
          )} */}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
        sx={{ maxWidth: "100%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="h5" sx={{ width: "33%", flexShrink: 0 }}>
            Flight Options
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
                  <Card sx={{ width: 250 }}>
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
            <Typography variant="h5"> No related climbs found </Typography>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
        sx={{ maxWidth: "100%" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant="h5" sx={{ width: "33%", flexShrink: 0 }}>
            Events Nearby
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
                  <Card sx={{ width: 250 }}>
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
            <Typography variant="h5"> No related climbs found </Typography>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
