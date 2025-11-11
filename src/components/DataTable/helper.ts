import { type CommonValue } from "./types";

export const formatCommonValue = (value: CommonValue) => {
    if (value instanceof Date)
        return value
            .toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" })
            .replaceAll("/", "-");
    if (typeof value === "number") return value.toString();
    return value;
};

export const compareTwoCommonValues = (a: CommonValue, b: CommonValue): number => {
    if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
    if (typeof a === "string" && typeof b === "string") return a.localeCompare(b);
    ///@ts-expect-error a or b are not number
    return a - b;
};
