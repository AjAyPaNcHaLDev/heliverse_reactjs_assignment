import { createSlice, createAsyncThunk, original } from "@reduxjs/toolkit";
const initialState = {
  teams: [],
};

const teamSlice = createSlice({
  name: "teamSlice",
  initialState,
  reducers: {
    createTeam: (state, action) => {
      const teamName = action.payload;
      if (teamName == "") return;
      const isExistingTeam = state.teams.some(
        (team) => team.teamName === teamName
      );

      if (!isExistingTeam) {
        state.teams.push({ teamName, teamMembers: [] });
      }
    },
    addMember: (state, action) => {
      const { selectedTeam, id } = action.payload;
      const teamIndex = state.teams.findIndex(
        (team) => team.teamName === selectedTeam
      );

      if (teamIndex !== -1) {
        const team = state.teams[teamIndex];
        if (!team.teamMembers.includes(id)) {
          team.teamMembers.push(id);
        }
      }
    },
  },
});

export const { createTeam, addMember } = teamSlice.actions;
export default teamSlice.reducer;
