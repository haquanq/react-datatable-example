import type { Candidate } from "./Candidate";

export type CandidateCreateDto = Omit<Candidate, "id">;
