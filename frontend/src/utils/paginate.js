import _ from "lodash";

export function paginate(itemsArray, pageNumber, climbsPerPage) {
  const startIndex = (pageNumber - 1) * climbsPerPage;
  return _(itemsArray).slice(startIndex).take(climbsPerPage).value();
}
