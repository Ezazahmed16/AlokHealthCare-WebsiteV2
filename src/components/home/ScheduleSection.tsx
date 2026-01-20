import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useTodaysDoctors } from "@/hooks/useDoctors";
import { DAYS_OF_WEEK } from "@/lib/constants"; // Ensure this exists, or use the fallback below

// Fallback constant if not imported
const WEEK_DAYS = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];

export function ScheduleSection() {
  const todayIndex = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  
  // 1. Fetch Real Data based on selected day
  const { data: doctors, isLoading } = useTodaysDoctors(selectedDay);

  // 2. Tab Logic (Today & Tomorrow)
  const tabs = useMemo(() => {
    const tomorrowIndex = (todayIndex + 1) % 7;
    // Use imported DAYS_OF_WEEK or fallback WEEK_DAYS
    const dayNames = typeof DAYS_OF_WEEK !== "undefined" ? DAYS_OF_WEEK : WEEK_DAYS;
    
    return [
      { day: todayIndex, label: dayNames[todayIndex], display: "আজ (Today)" },
      { day: tomorrowIndex, label: dayNames[tomorrowIndex], display: "আগামীকাল (Tomorrow)" },
    ];
  }, [todayIndex]);

  // 3. Time Formatter Helper
  const formatTime = (time: string) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const h = parseInt(hours, 10);
    const period = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    return `${hour12}:${minutes} ${period}`;
  };

  // Get current day name for the Blue Header
  const currentDayName = (typeof DAYS_OF_WEEK !== "undefined" ? DAYS_OF_WEEK : WEEK_DAYS)[selectedDay];

  return (
    <section className="min-h-[80vh] py-16 bg-[#F3F3F3] relative" aria-labelledby="schedule-heading">
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center gap-4 mb-10">
          <h2
            id="schedule-heading"
            className="text-xl sm:text-2xl md:text-4xl font-bold text-[#005A92] custom-bangla-font text-center"
          >
            আপনার প্রয়োজন অনুযায়ী চিকিৎসক সেবা, প্রতিদিন
          </h2>
          
          {/* Day Selection Tabs */}
          <div className="flex gap-4 mt-4">
            {tabs.map((tab) => (
              <button
                key={tab.day}
                onClick={() => setSelectedDay(tab.day)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 custom-bangla-font ${
                  selectedDay === tab.day
                    ? "bg-[#00AEEF] text-white shadow-lg scale-105"
                    : "bg-white text-[#005A92] border border-[#00AEEF] hover:bg-[#E0F7FF]"
                }`}
              >
                {tab.display}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Table Container */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl mx-auto border border-gray-200">
          
          {/* Blue Header with Dynamic Day Name */}
          <div className="bg-[#00AEEF] text-white text-center py-4 text-xl md:text-2xl font-semibold custom-bangla-font">
            {currentDayName}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#EBEBEB] text-[#001522] text-lg custom-bangla-font">
                  <th className="border border-gray-300 px-6 py-4 text-left w-2/3">
                    <span className="text-base md:text-lg font-bold">ডাক্তার</span>
                  </th>
                  <th className="border border-gray-300 px-6 py-4 text-left w-1/3">
                    <span className="text-base md:text-lg font-bold">সময়</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Loading State */}
                {isLoading && (
                  <tr>
                    <td colSpan={2} className="p-8 text-center text-gray-500">
                      Loading schedule...
                    </td>
                  </tr>
                )}

                {/* Data Rows */}
                {!isLoading && doctors && doctors.length > 0 && doctors.map((doctor) => (
                  <tr key={doctor.id} className="text-base md:text-lg custom-bangla-font text-[#424344] hover:bg-gray-50 transition-colors">
                    <td className="border border-gray-300 px-6 py-4">
                      <Link to={`/doctors/${doctor.id}`} className="hover:text-[#00AEEF] transition-colors flex flex-col md:flex-row gap-1">
                        <span className="font-semibold">{doctor.name}</span>
                        <span className="text-sm md:text-base text-gray-500 md:self-center">
                          ({doctor.specialization})
                        </span>
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-6 py-4 font-medium">
                      {formatTime(doctor.start_time)} - {formatTime(doctor.end_time)}
                    </td>
                  </tr>
                ))}

                {/* Empty State */}
                {!isLoading && (!doctors || doctors.length === 0) && (
                  <tr>
                    <td colSpan={2} className="p-8 text-center text-red-500 font-medium custom-bangla-font">
                      এই দিনে কোন ডাক্তার উপলব্ধ নেই (No doctors available today)
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 z-0 hidden lg:block opacity-80 pointer-events-none">
        <img
          src="/hero_sch_bg.png" 
          alt="Stethoscope"
          className="w-64 h-auto mix-blend-multiply" 
        />
      </div>
    </section>
  );
}