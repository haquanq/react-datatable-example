import type { Candidate } from "@/@types/Candidate";
import type { CandidateUpdateDto } from "@/@types/CandidateUpdateDto";
import { GENDERS } from "@/constants/Genders";
import { useCandidateStore } from "@/stores/candidateStore";
import { EditIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../common/Button";
import { BaseDialog } from "../Dialog";
import { DateField, FormControl, SelectField, TextField } from "../Form";

interface CandidateUpdateProps {
  candidate: Candidate;
}

export const CandidateUpdate = ({ candidate }: CandidateUpdateProps) => {
  const [open, setOpen] = useState(false);
  const updateCandidate = useCandidateStore((state) => state.updateCandidate);

  const onSubmit = (data: CandidateUpdateDto) => {
    updateCandidate(data, candidate.id);
    setOpen(false);
  };

  return (
    <BaseDialog
      open={open}
      onOpenChange={setOpen}
      title="Update candidate"
      trigger={
        <button type="button" onClick={() => setOpen(true)}>
          <EditIcon size={20} />
        </button>
      }
    >
      <FormControl<CandidateUpdateDto> className="w-100 pt-4" onSubmit={onSubmit} defaultValues={candidate}>
        <>
          <TextField
            label="Name"
            name="name"
            autoComplete="name"
            rules={{
              required: "Name is required",
              minLength: { value: 1, message: "Name must be between 1 and 100 characters" },
              maxLength: { value: 100, message: "Name must be between 1 and 100 characters" },
            }}
          />
          <div className="grid grid-cols-2 gap-3">
            <SelectField
              name="gender"
              label="Gender"
              rules={{ required: "Gender is required" }}
              items={Object.values(GENDERS)}
              defaultValue={GENDERS.MALE}
            />
            <DateField
              label="Date of birth"
              name="dateOfBirth"
              value={candidate.dateOfBirth}
              rules={{
                required: "Date of birth is required",
                validate: {
                  notInFuture: (value) => new Date(value) <= new Date() || "Date of birth cannot be in the future",
                  notTooOld: (value) =>
                    new Date().getFullYear() - new Date(value).getFullYear() <= 100 || "Age cannot be more than 100",
                },
              }}
            />
          </div>
          <TextField
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />
          <TextField
            label="Address"
            name="address"
            autoComplete="street-address"
            rules={{
              maxLength: { value: 200, message: "Address cannot be longer than 200 characters" },
            }}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button type="submit">
              Update
              <EditIcon size={20} />
            </Button>
            <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </div>
        </>
      </FormControl>
    </BaseDialog>
  );
};
