"use client";


import { MdArrowRightAlt } from "react-icons/md";
// Import the Doctor type from your hooks (adjust path if needed)
import { Doctor } from "@/hooks/useDoctors";

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
        কোনো ডাক্তার খুঁজে পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="card bg-base-100 bg-white shadow-xl custom-bangla-font rounded-xl overflow-hidden"
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
          
          <div className="card-body text-center text-[#001522] mx-auto p-4 mt-2">
            <h2 className="card-title text-xl md:text-xl font-bold mx-auto pb-2">
              {doctor.name}
            </h2>
            <p>
              <span className="font-bold text-xs md:text-sm">বিশেষত্ব: </span>
              {doctor.specialization}
            </p>
            <p>
              <span className="font-bold text-xs md:text-sm">যোগ্যতা: </span>
              {doctor.qualification}
            </p>
            <p>
              <span className="font-bold text-xs md:text-sm">যোগাযোগ: </span>
              {doctor.whatsapp_number || "Call for details"}
            </p>
            {/* If visitingHour exists in your DB, use it, otherwise hardcode or omit */}
            {/* <p>({doctor.visitingHour})</p> */}

            <div className="card-actions justify-center py-4">
              <a href={`/doctors/${doctor.id}`}>
                <button className="border-2 border-[#00AEEF] rounded-full py-2 px-6 flex items-center justify-center hover:bg-[#00AEEF] hover:text-white transition-all duration-300">
                  বিস্তারিত দেখুন{" "}
                  <MdArrowRightAlt className="h-6 w-6 ml-2" />
                </button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorsGrid;