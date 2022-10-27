import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { fetchClimbs } from "../actions/climbs";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";
import AllClimbs from "../utils/AllClimbs";
import { paginate } from "../utils/paginate";
import PaginationComponent from "../components/common/Pagination/PaginationComponent";
import Filter from "../components/Filter/Filter";
import ClimbsPerPageSelect from "../components/CardNoSelect/ClimbsPerPageSelect";
import RandomClimbFinder from "../components/randomClimbFinder/RandomClimbGenerator";
import FilterDrawer from "../components/Filter/FilterDrawer";
import PageHeadingCard from "../components/common/PageHeader/PageHeadingCard";
import HomeIcon from "../assets/home.svg";
import FormBackDrop from '../components/Form/FormBackDrop';

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
    gap: "4rem",
    padding: "1rem",
  },
}));
// ##############

export default function Explore() {
  //* DECLARED VARIABLES
  const classes = useStyles();
  const dispatch = useDispatch();

  //* API Calls
  useEffect(() => {
    dispatch(fetchClimbs());
  }, [dispatch]);

  //* STATES
  const reducerQueries = useSelector((state) => state);
  const { filterReducer, climbsReducer, userReducer, formReducer } =
    reducerQueries;
  const { formStatus } = formReducer;
  const [currentPage, setCurrentPage] = useState(1);
  const [climbsPerPage, setClimbsPerPage] = useState(6);
  const { userData } = userReducer;
  
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
    <Box sx={{ position: "relative" }}>
      {formStatus && <FormBackDrop />}
      {userData.id && <PageHeadingCard text={"Home"} image={HomeIcon} />}
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
          <RandomClimbFinder />
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
    </Box>
  );
}
