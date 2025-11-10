import type { Genders } from "./Genders";

export type Candidate = {
    id: string;
    name: string;
    dateOfBirth: Date;
    gender: Genders;
    email: string;
    address: string;
};
