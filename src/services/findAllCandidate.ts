import type { Candidate } from "@/@types/Candidate";
import { GENDERS } from "@/constants/Genders";
import { faker } from "@faker-js/faker";

export const findAllCandidate = (): Candidate[] => {
    const gender = faker.helpers.arrayElement(Object.values(GENDERS));

    return Array.from(
        { length: 10 },
        (_, index) =>
            ({
                id: index,
                name: faker.person.fullName({ sex: gender }),
                dateOfBirth: faker.date.birthdate({ min: 18, max: 60, mode: "age" }),
                gender,
                email: faker.internet.email(),
                address: faker.location.streetAddress(),
            }) satisfies Candidate,
    );
};
