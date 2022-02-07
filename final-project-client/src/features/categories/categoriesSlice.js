import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  status: "idle",
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = state.categories.concat(action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const selectAllCategories = (state) => state.categories.categories;

const fetchCategories = createAsyncThunk(
  "/categories/fetchCategories",
  async () => {
    const response = await axios.get(`http://localhost:3001/categories`);
    return response.data;
  }
);

export default categoriesSlice.reducer;
export { selectAllCategories, fetchCategories };
