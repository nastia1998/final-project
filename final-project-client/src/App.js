import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./app/Navbar";
import { CategoriesList } from "./features/categories/CategoriesList";

import "./App.css";
import { AddCategoryForm } from "./features/categories/AddCategoryForm";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" />
          <Route
            exact
            path="/categories"
            element={
              <React.Fragment>
                <CategoriesList />
                <AddCategoryForm />
              </React.Fragment>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
