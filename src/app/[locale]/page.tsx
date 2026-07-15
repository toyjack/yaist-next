import SearchPanel from "@/components/SearchPanel";
import TermsDisplay from "@/components/TermsDisplay";
import ResultsGrid from "@/components/ResultsGrid";

export default function HomePage() {
  return (
    <>
      <SearchPanel />
      <div className="flex-1 min-w-0 p-6">
        <TermsDisplay />
        <ResultsGrid />
      </div>
    </>
  );
}
