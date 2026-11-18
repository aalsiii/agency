import prisma from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Star, Plus } from "lucide-react";
import AdminTestimonialsClient from "./AdminTestimonialsClient";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <AdminTestimonialsClient initialTestimonials={testimonials} />;
}
