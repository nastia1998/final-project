import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "../features/categories/categoriesSlice";
import operationsSlice from "../features/operations/operationsSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    operations: operationsSlice,
  },
});
