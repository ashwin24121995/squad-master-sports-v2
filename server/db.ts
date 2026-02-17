// ─── File-based database layer ─────────────────────────────────────────────
// All data is stored in JSON files via fileStore.ts
// This file re-exports the fileStore functions for backward compatibility.

export {
  getUserById,
  getUserByEmail,
  createUser,
  updateUserSignIn,
  getTeams,
  getTeamsByUser,
  createTeam,
  getContestEntries,
  getContestEntriesByUser,
  getContestEntriesByContest,
  createContestEntry,
  getContactMessages,
  createContactMessage,
} from "./fileStore";
