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
  "/operations/fetchOperations",
  async () => {
    const response = await axios.get(`http://localhost:3001/operations`);
    return response.data;
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
  },
});

export { fetchOperations };

export const operationsSelectors = operationsAdapter.getSelectors(
  (state) => state.operations
);

export default operationsSlice.reducer;
