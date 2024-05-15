import { createSlice } from "@reduxjs/toolkit";

const initialPlayerData = { playerData: { name: "", score: 0 }, record: [] };

const playerDataSlice = createSlice({
  name: "playerData",
  initialState: initialPlayerData,
  reducers: {
    updateName(state, action) {
      state.playerData.name = action.payload;
    },

    updateScore(state, action) {
      state.playerData.score = action.payload;
    },

    updateRecord(state, action) {
      state.record = action.payload;
    },
  },
});

export const playerDataActions = playerDataSlice.actions;

export default playerDataSlice.reducer;
