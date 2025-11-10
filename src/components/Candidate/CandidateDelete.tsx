import { useCandidateStore } from "@/stores/candidateStore";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { Button } from "../common/Button";
import BaseDialog from "../Dialog/BaseDialog";

interface CandidateDeleteProps {
  candidateId: number;
}

export const CandidateDelete = ({ candidateId }: CandidateDeleteProps) => {
  const [open, setOpen] = useState(false);
  const removeCandidate = useCandidateStore((state) => state.deleteCandidate);

  const handleDelete = () => {
    removeCandidate(candidateId);
    setOpen(false);
  };

  return (
    <BaseDialog
      open={open}
      onOpenChange={setOpen}
      title="Delete candidate"
      description="Are you sure you want to delete this candidate? This action cannot be undone."
      trigger={
        <button className="text-red-700" onClick={() => setOpen(true)} aria-label="Delete" type="button">
          <Trash2Icon size={20} />
        </button>
      }
    >
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="danger" onClick={handleDelete}>
          Delete
          <Trash2Icon size={20} />
        </Button>
        <Button variant="secondary" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </BaseDialog>
  );
};
