"use client";

import { MdArrowRightAlt } from "react-icons/md";
import { Doctor } from "@/hooks/useDoctors";
import { Link } from "react-router-dom";

interface GridProps {
  doctors: Doctor[];
  isLoading: boolean;
}

const DoctorsGrid = ({ doctors, isLoading }: GridProps) => {
  if (isLoading) {
    return <div className="py-20 text-center text-lg">ডাক্তার লোড হচ্ছে...</div>;
  }

  if (!doctors || doctors.length === 0) {
    return (
      <div className="py-20 text-center text-lg text-red-500">
        কোনো ডাক্তার খুঁজে পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="card bg-white shadow-xl custom-bangla-font rounded-xl overflow-hidden border border-gray-100"
        >
          <figure className="h-64 md:h-80 w-full bg-gray-100 relative">
            <img
              src={doctor.image_url || "https://placehold.co/400x500?text=No+Image"}
              alt={doctor.name}
              className="h-full w-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/400x500?text=No+Image";
              }}
            />
          </figure>
          
          {/* Added items-center here to force vertical alignment to the center */}
          <div className="card-body flex flex-col items-center text-center text-[#001522] p-6">
            <h2 className="card-title text-xl font-bold mb-2">
              {doctor.name}
            </h2>
            
            <div className="space-y-1 mb-4">
                <p className="text-sm md:text-base">
                  <span className="font-bold">বিশেষত্ব: </span>
                  {doctor.specialization}
                </p>
                <p className="text-sm md:text-base">
                  <span className="font-bold">যোগ্যতা: </span>
                  {doctor.qualification}
                </p>
                <p className="text-sm md:text-base">
                  <span className="font-bold">যোগাযোগ: </span>
                  {doctor.whatsapp_number || "Call for details"}
                </p>
            </div>

            {/* card-actions with full width centering */}
            <div className="card-actions w-full justify-center mt-auto">
              <Link to={`/doctors/${doctor.id}`} className="w-full flex justify-center">
                <button className="w-fit border-2 border-[#00AEEF] text-[#00AEEF] rounded-full py-2 px-8 flex items-center justify-center hover:bg-[#00AEEF] hover:text-white transition-all duration-300 font-semibold">
                  বিস্তারিত দেখুন
                  <MdArrowRightAlt className="h-6 w-6 ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorsGrid;