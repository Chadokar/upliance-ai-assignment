import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  history: number[];
}

const initialState: CounterState = {
  history: [],
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    updateCounterHistory: (state, action: PayloadAction<number>) => {
      state.history.push(action.payload);
    },
  },
});

export const { updateCounterHistory } = counterSlice.actions;
export default counterSlice.reducer;
