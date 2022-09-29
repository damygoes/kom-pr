import React, { useState } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";
import AllClimbs from "../utils/AllClimbs";
import { paginate } from "../utils/paginate";
import PaginationComponent from "../components/common/PaginationComponent";
import Filter from "../components/Filter";
import ClimbsPerPageSelect from "../components/ClimbsPerPageSelect";

import { climbs } from "../Dummy"; // Fetch from Backend API

// ##############

const useStyles = makeStyles(() => ({
  pageRow: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "2rem",
    marginTop: "3rem",
    marginBottom: "4rem",
    border: "1px solid green",
  },
  pageCol: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "70%",
    gap: "2rem",
  },
  climbsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: "2rem",
    marginBottom: "3rem",
  },
}));

export default function Explore() {
  const filterOptions = useSelector((state) => state);
  const { filterReducer } = filterOptions;
  // STATES
  const [currentPage, setCurrentPage] = useState(1);
  const [climbsPerPage, setClimbsPerPage] = useState(6);

  // EVENT HANDLERS
  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };
  const handleClimbsPerPage = (number) => {
    setClimbsPerPage(number);
  };

  // DECLARED VARIABLES
  const classes = useStyles();

  let filteredClimbs = _.orderBy(
    climbs,
    [filterReducer.filterQuery],
    [filterReducer.filterDirection]
  );

  let paginatedClimbs = paginate(filteredClimbs, currentPage, climbsPerPage);

  return (
    <div className={classes.pageRow}>
      <Box sx={{ width: "30%", marginTop: "4rem" }}>
        <Filter />
      </Box>
      <div className={classes.pageCol}>
        <Box sx={{ alignSelf: "end", marginTop: "1rem" }}>
          <ClimbsPerPageSelect handleClimbsPerPage={handleClimbsPerPage} />
        </Box>
        <Box className={classes.climbsContainer}>
          <AllClimbs climbs={paginatedClimbs} />
        </Box>
        <Box sx={{ alignSelf: "end", marginBottom: "1rem" }}>
          <PaginationComponent
            totalNumberOfClimbs={climbs.length}
            climbsPerPage={climbsPerPage}
            onPageChange={handlePageChange}
          />
        </Box>
      </div>
    </div>
  );
}
