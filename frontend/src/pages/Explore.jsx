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
import FilterDrawer from "../components/FilterDrawer";
import PageHeadingCard from "../components/common/PageHeadingCard";

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
    // border: "1px solid green",
  },
  pageCol: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "2rem",
    // border: "1px solid blue",
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
    gap: "4rem",
    padding: "1rem",
    // border: "1px solid pink",
  },
}));
// ##############

export default function Explore() {
  //* DECLARED VARIABLES
  const classes = useStyles();
  const dispatch = useDispatch();

  //* API Calls
  const fetchAllClimbs = useCallback(async () => {
    let response = await fetchClimbs();
    dispatch(setClimbs(response));
  }, [dispatch]);

  useEffect(() => {
    fetchAllClimbs();
  }, [fetchAllClimbs]);

  //* STATES
  const reducerQueries = useSelector((state) => state);
  const { filterReducer, climbsReducer, userReducer } = reducerQueries;
  const [currentPage, setCurrentPage] = useState(1);
  const [climbsPerPage, setClimbsPerPage] = useState(6);
  const { success, user } = userReducer.userData;

  //* EVENT HANDLERS
  const handlePageChange = (e, page) => {
    setCurrentPage(page);
  };
  const handleClimbsPerPage = (number) => {
    setClimbsPerPage(number);
  };

  let filteredClimbs = () => {
    if (filterReducer.country) {
      return climbsReducer.climbs.filter(
        (climb) => climb.country === filterReducer.country
      );
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
    <>
      {success && (
        <PageHeadingCard
          text={"Home"}
          image={
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
          }
        />
      )}
      <Box
        className={classes.pageRow}
        sx={{
          flexDirection: {
            xs: "column-reverse",
            sm: "row",
          },
        }}
      >
        <Box
          className={classes.filterColumn}
          sx={{
            mt: {
              xs: 0,
              sm: 4,
            },
            minWidth: {
              xs: "100%",
              sm: "30%",
            },
          }}
        >
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <Filter />
          </Box>
          <RandomClimbGenerator />
        </Box>
        <Box className={classes.pageCol} sx={{ maxWidth: { xs: "100%" } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
            }}
          >
            <FilterDrawer />
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
        </Box>
      </Box>
    </>
  );
}
