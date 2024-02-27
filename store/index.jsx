import { configureStore } from "@reduxjs/toolkit";
import PlayerDataReducer from "./playerData";

export const store = configureStore({
  reducer: { playerData: PlayerDataReducer },
});
