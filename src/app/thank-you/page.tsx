import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2, MessageSquare, ArrowRight, Calendar } from "lucide-react";
import ThankYouClient from "./ThankYouClient";

export const metadata = {
  title: "Inquiry Received | NextCurrent Media",
  description: "Thank you for initiating your project inquiry with NextCurrent Media.",
};

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-36 text-center font-mono text-xs text-muted">loading confirmation...</div>}>
      <ThankYouClient />
    </Suspense>
  );
}
