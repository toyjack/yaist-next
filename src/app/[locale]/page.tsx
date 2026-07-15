import SearchPanel from "@/components/SearchPanel";
import TermsDisplay from "@/components/TermsDisplay";
import ResultsGrid from "@/components/ResultsGrid";

export default function HomePage() {
  return (
    <>
      <SearchPanel />
      <div className="flex-1 overflow-y-auto p-4">
        <TermsDisplay />
        <ResultsGrid />
      </div>
    </>
  );
}
