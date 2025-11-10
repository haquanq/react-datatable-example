import type { Candidate } from "./Candidate";

export type CandidateUpdateDto = Omit<Candidate, "id">;
