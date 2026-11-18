import { Suspense } from "react";
import StartProjectClient from "./StartProjectClient";

export const metadata = {
  title: "Start a Project | NextCurrent Media",
  description: "Initiate your digital growth sprint. Tell us about your project requirements, budget, and timeline.",
};

export default function StartProjectPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-36 text-center font-mono text-xs text-muted">loading project intake...</div>}>
      <StartProjectClient />
    </Suspense>
  );
}
