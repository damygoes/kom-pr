import React from "react";
import ClimbCard from "../components/common/ClimbCard";

const AllClimbs = ({ climbs }) => {
  return climbs.map((climb) => <ClimbCard data={climb} key={climb.slug} />);
};

export default AllClimbs;
