import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { fetchClimbs } from "../actions/actions";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";
import AllClimbs from "../utils/AllClimbs";
import { paginate } from "../utils/paginate";
import PaginationComponent from "../components/common/PaginationComponent";
import Filter from "../components/Filter";
import ClimbsPerPageSelect from "../components/ClimbsPerPageSelect";
import { setClimbs } from "../features/climbsSlice";
import RandomClimbGenerator from "../components/common/RandomClimbGenerator";



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
  filterColumn: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "30%", 
    gap: "4rem",
    padding: "1rem",
    marginTop: "4rem",
  }
}));
// ##############




export default function Explore() {

  const dispatch = useDispatch()

  // API Calls
  const fetchAllClimbs = useCallback(async()=>{
    let response = await fetchClimbs()
    dispatch(setClimbs(response))
  }, [dispatch])   

  useEffect(()=>{
    fetchAllClimbs() 
  },[fetchAllClimbs])

  // STATES
  const reducerQueries = useSelector((state) => state);
  const { filterReducer, climbsReducer } = reducerQueries;
  const [currentPage, setCurrentPage] = useState(1);
  const [climbsPerPage, setClimbsPerPage] = useState(6);
  // const [isLoading, setIsLoading] = useState(true);

  // EVENT HANDLERS
  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };
  const handleClimbsPerPage = (number) => {
    setClimbsPerPage(number);
  };

  // DECLARED VARIABLES
  const classes = useStyles();

  let filteredClimbs = () => {
    if (filterReducer.country) {
      return climbsReducer.climbs.filter((climb) => climb.country === filterReducer.country);
    }
    return climbsReducer.climbs;
  };

  let sortedClimbs = _.orderBy(
    filteredClimbs(),
    [filterReducer.filterQuery],
    [filterReducer.filterDirection]
  );

  let paginatedClimbs = paginate(sortedClimbs, currentPage, climbsPerPage);

  return (
    <Box className={classes.pageRow}>
      <Box className={classes.filterColumn}>
        <Filter />
        <RandomClimbGenerator/>
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
            totalNumberOfClimbs={sortedClimbs.length}
            climbsPerPage={climbsPerPage}
            onPageChange={handlePageChange}
          />
        </Box>
      </div>
    </Box>
  );
}
