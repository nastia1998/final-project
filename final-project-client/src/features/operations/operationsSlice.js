import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const operationsAdapter = createEntityAdapter({
  selectId: (operation) => operation.id,
});

const fetchOperations = createAsyncThunk(
  "operations/fetchOperations",
  async () => {
    const response = await axios.get(`http://localhost:3001/operations`);
    return response.data;
  }
);

const updateOperation = createAsyncThunk(
  "operations/updateOperation",
  async ({ id, categoryId, date, sum }) => {
    console.log({ id, categoryId: categoryId, date, sum });
    await axios.patch(`http://localhost:3001/operations/${id}`, {
      categoryId,
      date,
      sum,
    });
    return {
      id,
      changes: {
        category_id: categoryId,
        operation_date: date,
        operation_sum: sum,
      },
    };
  }
);

const operationsSlice = createSlice({
  name: "operations",
  initialState: operationsAdapter.getInitialState({
    status: "idle",
    error: false,
  }),
  reducers: {},
  extraReducers: {
    [fetchOperations.pending](state) {
      state.status = "loading";
    },
    [fetchOperations.fulfilled](state, { payload }) {
      state.status = "succeeded";
      operationsAdapter.setAll(state, payload);
    },
    [fetchOperations.rejected](state, action) {
      state.status = "failed";
      state.error = action.error.message;
    },
    [updateOperation.pending](state) {
      state.status = "loading";
    },
    [updateOperation.fulfilled](state, { payload }) {
      state.status = "succeeded";
      console.log({ payload });
      operationsAdapter.updateOne(state, {
        id: payload.id,
        changes: payload.changes,
      });
    },
    [updateOperation.rejected](state, action) {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export { fetchOperations, updateOperation };

export const operationsSelectors = operationsAdapter.getSelectors(
  (state) => state.operations
);

export default operationsSlice.reducer;
