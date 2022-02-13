import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const categoriesAdapter = createEntityAdapter({
  selectId: (category) => category.id,
});

const fetchCategories = createAsyncThunk(
  "/categories/fetchCategories",
  async () => {
    const response = await axios.get(`http://localhost:3001/categories`);
    return response.data;
  }
);

const addNewCategory = createAsyncThunk(
  "categories/addCategory",
  async (initialCategory) => {
    const response = await axios.post(
      `http://localhost:3001/categories`,
      initialCategory
    );
    return response.data;
  }
);

const removeCategory = createAsyncThunk(
  "categories/removeCategory",
  async (id) => {
    await axios.delete(`http://localhost:3001/categories/${id}`);
    return id;
  }
);

const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, name }) => {
    await axios.patch(`http://localhost:3001/categories/${id}`, { name });
    console.log();
    return { id, changes: { name } };
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesAdapter.getInitialState({
    status: "idle",
    error: false,
  }),
  reducers: {},
  extraReducers: {
    [fetchCategories.pending](state) {
      state.status = "loading";
    },
    [fetchCategories.fulfilled](state, { payload }) {
      state.status = "succeeded";
      categoriesAdapter.setAll(state, payload);
    },
    [fetchCategories.rejected](state, action) {
      state.status = "failed";
      state.error = action.error.message;
    },
    [addNewCategory.pending](state) {
      state.status = "loading";
    },
    [addNewCategory.fulfilled](state, { payload }) {
      state.status = "succeeded";
      categoriesAdapter.addOne(state, payload);
    },
    [addNewCategory.rejected](state, action) {
      state.status = "failed";
      state.error = action.error.message;
    },
    [removeCategory.pending](state) {
      state.status = "loading";
    },
    [removeCategory.fulfilled](state, { payload: id }) {
      state.status = "succeeded";
      categoriesAdapter.removeOne(state, id);
    },
    [removeCategory.rejected](state) {
      state.status = "failed";
    },
    [updateCategory.pending](state) {
      state.status = "loading";
    },
    [updateCategory.fulfilled](state, { payload }) {
      state.status = "succeeded";
      console.log({ payload });
      categoriesAdapter.updateOne(state, {
        id: payload.id,
        changes: payload.changes,
      });
    },
    [updateCategory.rejected](state, action) {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export { fetchCategories, addNewCategory, removeCategory, updateCategory };

export const categoriesSelectors = categoriesAdapter.getSelectors(
  (state) => state.categories
);

export default categoriesSlice.reducer;
