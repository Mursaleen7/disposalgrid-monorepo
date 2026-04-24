import { redirect } from "next/navigation";
import { materialsData } from "@/lib/data/materials-content";

// Redirect /materials/[slug] → /dispose-of/[slug]
// This keeps old links working and consolidates to one canonical URL.
export async function generateStaticParams() {
  return Object.keys(materialsData).map((slug) => ({ slug }));
}

export default function MaterialSlugRedirect({
  params,
}: {
  params: { slug: string };
}) {
  redirect(`/dispose-of/${params.slug}`);
}
