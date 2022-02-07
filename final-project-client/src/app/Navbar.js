import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <section>
        <h1>Accounting App</h1>
        <div>
          <Link to="/categories">Categories</Link>
        </div>
      </section>
    </nav>
  );
};

export { Navbar };
