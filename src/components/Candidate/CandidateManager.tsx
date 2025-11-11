import type { Candidate } from "@/@types/Candidate";
import { useCandidateStore } from "@/stores/candidateStore";
import { useId } from "react";
import { DataTable } from "../DataTable";
import { CandidateAdd } from "./CandidateAdd";
import { CandidateDelete } from "./CandidateDelete";
import { CandidateUpdate } from "./CandidateUpdate";

export const CandidateManager = () => {
  const tableLabelId = useId();
  const { candidates } = useCandidateStore();

  return (
    <section className="flex w-full flex-col items-center gap-8 overflow-hidden pt-6">
      <h2 className="sr-only" id={tableLabelId}>
        Fake candidates
      </h2>
      <div className="flex justify-center">
        <CandidateAdd />
      </div>

      <DataTable
        aria-labelledby={tableLabelId}
        data={candidates}
        columnDefinitions={[
          {
            field: "id",
            headerName: "ID",
            filterable: false,
            sortable: false,
          },
          {
            field: "name",
            headerName: "Name",
          },
          {
            field: "dateOfBirth",
            headerName: "Birth",
          },
          {
            field: "gender",
            headerName: "Gender",
            columnClass: "capitalize",
          },
          {
            field: "email",
            headerName: "Email",
          },
          {
            field: "address",
            headerName: "Address",
          },
        ]}
        rowActions={(value) => (
          <>
            <CandidateUpdate candidate={value as Candidate} />
            <CandidateDelete candidate={value as Candidate} />
          </>
        )}
      />
    </section>
  );
};
