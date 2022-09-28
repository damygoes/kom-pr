import { Pagination } from "@mui/material";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";

const PaginationComponent = ({
  totalNumberOfClimbs,
  climbsPerPage,
  onPageChange,
}) => {
  const pagesCount = Math.ceil(totalNumberOfClimbs / climbsPerPage);

  if (pagesCount === 1) return null;

  return (
    <Stack spacing={2}>
      <Pagination
        color="secondary"
        count={pagesCount}
        onChange={onPageChange}
      />
    </Stack>
  );
};

PaginationComponent.propTypes = {
  totalNumberOfClimbs: PropTypes.number.isRequired,
  climbsPerPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default PaginationComponent;
