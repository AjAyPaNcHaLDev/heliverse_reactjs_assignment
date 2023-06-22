import { createSlice, createAsyncThunk, original } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orignal: [],
  users: [],
  recent20: [],
  currentPage: 0,
  totalUsers: 0,
  domains: [],
  genders: [],
  selecteDomain: "",
  selectedGender: "",
  searchQuary: "",
  available: undefined,
};

export const fetchData = createAsyncThunk("api/users", async () => {
  const { data } = await axios.get(
    "http://localhost:5173/heliverse_mock_data.json"
  );

  return data;
});
const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    applySearchAndFilter: (state) => {
      const { searchQuary, selecteDomain, selectedGender, orignal, available } =
        state;
      let filteredResults = orignal;

      // Search by first_name or last_name
      if (searchQuary !== "") {
        filteredResults = filteredResults.filter((item) => {
          if (
            item.first_name.toLowerCase().includes(searchQuary.toLowerCase()) ||
            item.last_name.toLowerCase().includes(searchQuary.toLowerCase())
          ) {
            return item;
          }
        });
      }

      // Filter by domain
      if (selecteDomain !== "") {
        filteredResults = filteredResults.filter((item) => {
          if (item.domain == selecteDomain) {
            return item;
          }
        });
      }

      // Filter by gender
      if (selectedGender !== "") {
        filteredResults = filteredResults.filter((item) => {
          if (item.gender == selectedGender) {
            return item;
          }
        });
      }
      // Filter by available
      if (available != undefined) {
        filteredResults = filteredResults.filter((item) => {
          if (state.available == item.available) {
            return item;
          }
        });
      }
      state.users = filteredResults;

      state.totalUsers = state.users.length;
      state.recent20 = state.users.slice(0, 20);
    },
    setAvailable: (state, action) => {
      if (action.payload == "true") {
        state.available = true;
      } else if (action.payload == "false") {
        state.available = false;
      } else {
        state.available = undefined;
      }
    },
    setSelectedDomain: (state, action) => {
      state.selecteDomain = action.payload;
    },
    setSelectedGender: (state, action) => {
      state.selectedGender = action.payload;
    },
    setSearchQuary: (state, action) => {
      state.searchQuary = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
      const start = state.currentPage * 20;
      const end = start + 20;
      state.recent20 = state.users.slice(start, end);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      (state.currentPage = 0),
        (state.totalUsers = 0),
        (state.domains = []),
        (state.genders = []),
        (state.selecteDomain = ""),
        (state.selectedGender = ""),
        (state.searchQuary = ""),
        (state.available = ""),
        (state.orignal = action.payload);
      state.users = action.payload;
      state.totalUsers = state.users.length;
      state.domains = [...new Set(state.users.map((item) => item.domain))];
      state.genders = [...new Set(state.users.map((item) => item.gender))];
      state.recent20 = state.users.slice(0, 20);
    });
  },
});
export const {
  setCurrentPage,
  applySearchAndFilter,
  setSelectedDomain,
  setSelectedGender,
  setSearchQuary,
  setAvailable,
} = usersSlice.actions;
export default usersSlice.reducer;
