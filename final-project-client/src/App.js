import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./app/Navbar";
import { CategoriesList } from "./features/categories/CategoriesList";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="/" />
          <Route exact path="/categories" element={<CategoriesList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
