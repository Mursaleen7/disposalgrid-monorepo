import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Your Facility — Coming Soon | DisposalGrid",
  description: "We're building a way for facility operators to list and manage their disposal locations on DisposalGrid.",
};

export default function AddFacilityPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-white px-6 py-20 lg:py-32">
      <div className="w-full max-w-[640px] text-center flex flex-col items-center">

        <span className="uber-overline text-uber-gray-500 mb-5 inline-block">
          COMING SOON
        </span>

        <h1 className="text-[48px] md:text-[64px] font-bold text-uber-black tracking-[-1.5px] leading-[1.05] mb-6">
          Facility listings are on the way
        </h1>

        <p className="text-[18px] text-uber-gray-500 mb-10 max-w-[500px] leading-[1.6]">
          We're building a self-serve portal for facility operators to list, verify, and manage their disposal locations on DisposalGrid.
        </p>

        {/* Feature preview */}
        <div className="w-full max-w-[500px] mb-12 text-left bg-uber-gray-50 border border-uber-gray-100 rounded-uber-lg p-6 space-y-4">
          <span className="text-[14px] font-bold text-uber-black tracking-[-0.3px] block mb-2">What's coming</span>
          {[
            "List your facility with accepted materials",
            "Manage hours, contact info, and service areas",
            "Get discovered by people searching near you",
            "Verified badge for EPA-registered facilities",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-uber-green shrink-0 mt-0.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-[15px] text-uber-black">{item}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
          <Link
            href="/"
            className="inline-flex items-center justify-center h-12 px-8 bg-uber-black text-white text-[15px] font-medium rounded-uber-pill hover:bg-uber-gray-800 transition-colors duration-uber-fast w-full sm:w-auto"
          >
            Go to homepage
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center h-12 px-8 bg-uber-gray-100 text-uber-black text-[15px] font-medium rounded-uber-pill hover:bg-uber-gray-200 transition-colors duration-uber-fast w-full sm:w-auto"
          >
            Search facilities
          </Link>
        </div>

      </div>
    </div>
  );
}
