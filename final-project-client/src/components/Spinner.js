import React from "react";
import { CircularProgress } from "@mui/material";

const Spinner = ({ text = "", size = "5em" }) => {
  const header = text ? (
    <h4>
      <CircularProgress />
    </h4>
  ) : null;
  return (
    <div className="spinner">
      {header}
      <div className="loader" style={{ height: size, width: size }} />
    </div>
  );
};

export { Spinner };
