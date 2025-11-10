import type { Candidate } from "@/@types/Candidate";
import type { CandidateCreateDto } from "@/@types/CandidateCreateDto";
import type { CandidateUpdateDto } from "@/@types/CandidateUpdateDto";
import { findAllCandidate } from "@/services/findAllCandidate";
import { create } from "zustand";

let serialCandidateId = 999;

interface CandidateSoreState {
    candidates: Candidate[];
    deleteCandidate: (candidateId: number) => void;
    addCandidate: (candidateCreate: CandidateCreateDto) => void;
    updateCandidate: (candidateUpdate: CandidateUpdateDto, candidateId: number) => void;
}

const useCandidateStore = create<CandidateSoreState>()((set) => ({
    candidates: findAllCandidate(),
    deleteCandidate: (candidateId) => {
        set((state) => ({
            candidates: state.candidates.filter((c) => c.id !== candidateId),
        }));
    },
    addCandidate(candidateCreateDto) {
        set((state) => ({
            candidates: [...state.candidates, { ...candidateCreateDto, id: serialCandidateId++ }],
        }));
    },
    updateCandidate(candidateUpdateDto, candidateId) {
        set((state) => ({
            candidates: state.candidates.map((c) => (c.id === candidateId ? { ...c, ...candidateUpdateDto } : c)),
        }));
    },
}));

export { useCandidateStore, type CandidateSoreState };
