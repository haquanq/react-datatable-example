import { CandidateManager } from "./components/Candidate/CandidateManager";

export const App = () => {
  return (
    <main className="min-h-screen bg-white pt-20 pb-35">
      <div className="mx-auto flex w-[min(100vw-3rem,69.375rem)] flex-col items-center">
        <div className="flex max-w-160 flex-col gap-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900">React DataTable Example</h1>
          <p className="text-base text-gray-600">
            Click on headers to sort the table, maximum sorting 3 columns at once (compared by recently active column).
          </p>
        </div>
        <CandidateManager />
      </div>
    </main>
  );
};
