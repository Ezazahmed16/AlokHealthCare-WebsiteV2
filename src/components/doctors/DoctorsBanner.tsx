"use client";

import React from "react";
import { Search, X } from "lucide-react";

interface BannerProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedSpecialty: string | null;
  setSelectedSpecialty: (val: string | null) => void;
  selectedDay: number | null;
  setSelectedDay: (val: number | null) => void;
  specialties: string[];
  days: { value: number; label: string }[];
  clearFilters: () => void;
}

const DoctorsBanner = ({
  searchQuery,
  setSearchQuery,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedDay,
  setSelectedDay,
  specialties,
  days,
  clearFilters,
}: BannerProps) => {
  return (
    <div
      className="hero min-h-[360px] md:min-h-[450px] relative bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://s3-alpha-sig.figma.com/img/77c6/8e73/5a7e02c59afbe495ffe48681d070ce5d?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ne4V4pgy0EJE7DzBV060CkVGKFqd7iwKsaasLPI2cQUa9YCLyR1r2LArrwTV26aGL5gLnfmN3VHKLdEMl-431WB8XjhNhnTjZGDpnYoPRwWmH0lP~4oWOaFdeYDgn9oR8p7lV4~CDtHcrvosa~1BTy86hvnSiKx188ZudukoUB1e6R26H4dbhULc5wY~oCT~N2q42UuKV0TULytW8S8A3zNDTB2DyM-lfXkOY070DQNWnTfG7jOANAQsT5ppGLz28pg9X57alrsdPqpC1WFHLvIJ2T5h9KnQkHf6DkVRNigWRQ1bdA7barXyK66JbUiThJn96sbo6CLcqXn~ccKQwg__)",
      }}
    >
      {/* Overlay */}
      <div className="hero-overlay bg-[#001522] bg-opacity-60"></div>

      <div className="hero-content text-neutral-content text-center custom-bangla-font flex-col w-full px-4">
        {/* Title */}
        <div className="max-w-5xl mb-8">
          <h1 className="mb-5 text-2xl md:text-4xl lg:text-6xl font-bold text-white">
            পছন্দের ডাক্তার খুঁজুন সহজেই!
          </h1>
        </div>

        {/* Search Inputs Section */}
        <div className="w-full max-w-4xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row gap-3">
            
            {/* 1. Name Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="ডাক্তারের নাম দিয়ে খুঁজুন"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-4 pr-10 bg-white text-[#001522] rounded-md border-none focus:ring-2 focus:ring-[#00AEEF] outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* 2. Specialty Dropdown */}
            <div className="relative md:min-w-[200px]">
              <select
                value={selectedSpecialty || ""}
                onChange={(e) => setSelectedSpecialty(e.target.value || null)}
                className="w-full h-12 px-4 bg-white text-[#001522] rounded-md border-none cursor-pointer focus:ring-2 focus:ring-[#00AEEF] outline-none"
              >
                <option value="">বিভাগ/বিশেষত্ব</option>
                {specialties.map((spec, index) => (
                  <option key={index} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Day Dropdown */}
            <div className="relative md:min-w-[150px]">
              <select
                value={selectedDay !== null ? selectedDay : ""}
                onChange={(e) =>
                  setSelectedDay(e.target.value !== "" ? parseInt(e.target.value) : null)
                }
                className="w-full h-12 px-4 bg-white text-[#001522] rounded-md border-none cursor-pointer focus:ring-2 focus:ring-[#00AEEF] outline-none"
              >
                <option value="">দিন</option>
                {days.map((day) => (
                  <option key={day.value} value={day.value}>
                    {day.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Search Button */}
            <button className="h-12 px-8 bg-[#00AEEF] hover:bg-[#0089bd] text-white font-bold rounded-md gap-2 flex items-center justify-center transition-colors">
              <Search className="h-5 w-5" />
              খুঁজুন
            </button>
          </div>

          {/* Active Filters / Clear Button */}
          {(searchQuery || selectedSpecialty || selectedDay !== null) && (
            <div className="flex justify-center mt-2">
              <button
                onClick={clearFilters}
                className="text-white/80 hover:text-[#00AEEF] text-sm underline transition-colors"
              >
                সব মুছুন (Clear All)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsBanner;