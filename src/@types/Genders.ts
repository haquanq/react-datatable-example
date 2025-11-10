import type { GENDERS } from "../constants/Genders";

export type Genders = (typeof GENDERS)[keyof typeof GENDERS];
