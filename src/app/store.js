import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./Slice/usersSlice";
import teamSlice from "./Slice/teamSlice";
const store = configureStore({
  reducer: {
    usersSlice,
    teamSlice,
  },
});
export default store;
