import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { MdArrowRightAlt } from "react-icons/md";
// Import the specific hook and the Type definition from your file
import { useDoctors, Doctor } from "@/hooks/useDoctors"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* --- 1. Arrow Button Component --- */
interface ArrowProps {
  onClick?: () => void;
  direction: "prev" | "next";
  className?: string;
}

const ArrowButton = ({ onClick, direction, className }: ArrowProps) => {
  const isNext = direction === "next";
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={isNext ? "Next doctor" : "Previous doctor"}
      className={`absolute ${
        isNext ? "right-[-10px] md:right-[-40px]" : "left-[-10px] md:left-[-40px]"
      } top-1/2 transform -translate-y-1/2 z-30 text-[#00AEEF] hover:text-[#005A92] text-2xl focus:outline-none focus:ring-2 focus:ring-[#00AEEF] rounded-full bg-white/90 shadow-lg p-1 md:p-2 ${
        className?.includes("slick-disabled") ? "opacity-50 cursor-not-allowed hidden" : ""
      }`}
    >
      {isNext ? (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.8799 26.5599L20.5732 17.8666C21.5999 16.8399 21.5999 15.1599 20.5732 14.1333L11.8799 5.43994" stroke="#001522" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.12 26.5599L11.4267 17.8666C10.4 16.8399 10.4 15.1599 11.4267 14.1333L20.12 5.43994" stroke="#001522" strokeWidth="2.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
};

export function FeaturedDoctors() {
  const { data: doctors, isLoading } = useDoctors();

  const sliderData = doctors || [];
  const doctorCount = sliderData.length;

  const settings = {
    className: "hero-doctor-slider",
    centerMode: false,
    infinite: doctorCount > 3, // Prevents blank screen if few doctors
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <ArrowButton direction="next" />,
    prevArrow: <ArrowButton direction="prev" />,
    responsive: [
      { 
        breakpoint: 1024, 
        settings: { 
          slidesToShow: 2, 
          infinite: doctorCount > 2 
        } 
      },
      { 
        breakpoint: 640, 
        settings: { 
          slidesToShow: 1, 
          infinite: doctorCount > 1 
        } 
      },
    ],
  };

  if (isLoading) {
    return <div className="py-20 text-center text-gray-500">Loading Doctors...</div>;
  }

  // Optional: Hide section if no data
  if (doctorCount === 0) return null;

  return (
    <section className="py-10 bg-[#F3F3F3]">
      <div className="container mx-auto relative px-4">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#005A92] custom-bangla-font text-center py-10">
          বিশেষজ্ঞ ডাক্তারদের সাথে সুস্বাস্থ্যের পথে এক ধাপ এগিয়ে
        </h1>

        <div className="mx-4 md:mx-10 pb-8">
          <Slider {...settings}>
            {sliderData.map((doctor: Doctor) => (
              <div key={doctor.id} className="p-3">
                <div className="card bg-white shadow-xl custom-bangla-font rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-2xl transition-shadow duration-300">
                  
                  {/* Image Section */}
                  <figure className="h-64 md:h-80 w-full bg-gray-100 overflow-hidden relative">
                    <img
                      // Use correct database field: image_url
                      src={doctor.image_url || "https://placehold.co/400x500?text=No+Image"} 
                      alt={doctor.name}
                      className="h-full w-full object-cover object-top hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/400x500?text=No+Image";
                      }}
                    />
                  </figure>

                  {/* Details Section */}
                  <div className="card-body text-center text-[#001522] p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-3">{doctor.name}</h2>
                      
                      <div className="space-y-2 text-sm md:text-base opacity-90">
                        <p className="flex justify-center gap-1">
                          <span className="font-bold">বিশেষত্ব: </span>
                          {/* Use correct database field: specialization */}
                          <span>{doctor.specialization || "General"}</span>
                        </p>

                        <p className="flex justify-center gap-1">
                          <span className="font-bold">যোগ্যতা: </span>
                          {/* Mapped 'Qualification' since 'Experience' is missing */}
                          <span>{doctor.qualification || "N/A"}</span>
                        </p>
                        
                        <p className="flex justify-center gap-1">
                          <span className="font-bold">শাখা: </span>
                          {/* Mapped 'Branch' since 'Schedule' is missing in this hook */}
                          <span>{doctor.branch_name || "Main Branch"}</span>
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-center">
                      <Link 
                        to={`/doctors/${doctor.id}`}
                        className="border-2 border-[#00AEEF] text-[#001522] rounded-full py-2 px-6 flex items-center gap-2 hover:bg-[#00AEEF] hover:text-white transition-all duration-300 font-medium"
                      >
                        বিস্তারিত দেখুন 
                        <MdArrowRightAlt size={24} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="py-4 flex justify-center">
          <Link to="/doctors">
            <button className="bg-[#FFD700] hover:bg-[#F0C800] text-black font-bold py-3 px-8 rounded-full shadow-md transition-transform active:scale-95 custom-bangla-font">
              সমস্ত বিশেষজ্ঞ দেখুন
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}