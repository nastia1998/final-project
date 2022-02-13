import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";

import "../index.css";

const Navbar = () => {
  return (
    <AppBar position="static" color="secondary">
      <Toolbar sx={{ mr: 2 }}>
        <Typography
          varian="h6"
          noWrap
          component="div"
          sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
        >
          <img src="../../public/logo.png" alt="LOGO" />
        </Typography>
        <NavLink
          to="/categories"
          className={(navData) =>
            navData.isActive ? "ActivePageLink" : "PageLink"
          }
        >
          <Typography sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            Categories
          </Typography>
        </NavLink>
        <NavLink
          to="/operations"
          className={(navData) =>
            navData.isActive ? "ActivePageLink" : "PageLink"
          }
        >
          <Typography sx={{ mr: 2, display: { xs: "none", md: "flex" } }}>
            Operations
          </Typography>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
};

export { Navbar };
