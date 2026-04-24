import Link from "next/link";
import { Metadata } from "next";
import { SearchBar } from "@/components";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-6 py-20 lg:py-32">
      <div className="w-full max-w-[640px] text-center flex flex-col items-center">
        <span className="uber-overline text-uber-gray-500 mb-5 inline-block">
          404 ERROR
        </span>
        <h1 className="text-[48px] md:text-[64px] font-bold text-uber-black tracking-[-1.5px] leading-[1.05] mb-6">
          We can't find that page
        </h1>
        <p className="text-[18px] text-uber-gray-500 mb-10 max-w-[500px] leading-[1.6]">
          The disposal location, guide, or page you're looking for might have been removed, or the link is incorrect.
        </p>

        <div className="w-full max-w-[500px] mb-12 text-left bg-white p-2 border border-uber-gray-100 rounded-uber-lg shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
          <div className="mb-3 px-2 pt-2">
            <span className="text-[14px] font-bold text-uber-black tracking-[-0.3px]">Try searching instead</span>
          </div>
          <SearchBar variant="large" />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 bg-uber-black text-white text-[15px] font-medium rounded-uber-pill hover:bg-uber-gray-800 transition-colors duration-uber-fast w-full sm:w-auto"
          >
            Go to homepage
          </Link>
          <Link
            href="/materials"
            className="inline-flex items-center justify-center h-12 px-8 bg-uber-gray-100 text-uber-black text-[15px] font-medium rounded-uber-pill hover:bg-uber-gray-200 transition-colors duration-uber-fast w-full sm:w-auto"
          >
            Browse materials
          </Link>
        </div>
      </div>
    </div>
  );
}
