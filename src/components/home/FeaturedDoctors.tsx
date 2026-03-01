import { useMemo } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { MdArrowRightAlt } from "react-icons/md";
import { useDoctors, Doctor } from "@/hooks/useDoctors";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* --- Arrow Button Component --- */
interface ArrowProps {
  onClick?: () => void;
  direction: "prev" | "next";
  className?: string;
}

const ArrowButton = ({ onClick, direction, className }: ArrowProps) => {
  if (className?.includes("slick-disabled")) return null;

  const isNext = direction === "next";
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={isNext ? "Next doctor" : "Previous doctor"}
      className={`absolute top-1/2 -translate-y-1/2 z-30 text-[#00AEEF] hover:text-[#005A92] 
        text-xl sm:text-2xl bg-white/90 shadow-lg p-1.5 sm:p-2 rounded-full transition-all
        ${isNext ? "right-2 lg:right-[-24px] xl:right-[-40px]" : "left-2 lg:left-[-24px] xl:left-[-40px]"}`}
    >
      {isNext ? (
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="sm:w-6 sm:h-6">
          <path d="M11.8799 26.5599L20.5732 17.8666C21.5999 16.8399 21.5999 15.1599 20.5732 14.1333L11.8799 5.43994" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" className="sm:w-6 sm:h-6">
          <path d="M20.12 26.5599L11.4267 17.8666C10.4 16.8399 10.4 15.1599 11.4267 14.1333L20.12 5.43994" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
};

/* --- Doctor Card Component --- */
const DoctorCard = ({ doctor }: { doctor: Doctor }) => (
  <div className="px-2 sm:px-3 pb-6">
    <div className="bg-white shadow-md rounded-2xl overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300">
      <figure className="h-48 sm:h-56 md:h-64 lg:h-72 w-full bg-gray-100 overflow-hidden flex-shrink-0">
        <img
          src={doctor.image_url || "https://placehold.co/400x500?text=No+Image"}
          alt={doctor.name}
          className="h-full w-full object-cover object-top"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/400x500?text=No+Image";
          }}
        />
      </figure>
      <div className="flex flex-col flex-grow p-4 sm:p-5 text-center">
        <div className="flex-grow">
          <h2 className="text-base sm:text-lg font-bold mb-2 line-clamp-2">{doctor.name}</h2>
          <div className="space-y-1 text-xs sm:text-sm text-gray-600">
            <p><strong>বিশেষত্ব:</strong> {doctor.specialization || "General"}</p>
            <p><strong>যোগ্যতা:</strong> {doctor.qualification || "N/A"}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Link
            to={`/doctors/${doctor.id}`}
            className="inline-flex items-center gap-2 border-2 border-[#00AEEF] rounded-full py-2 px-4 sm:px-6 text-xs sm:text-sm hover:bg-[#00AEEF] hover:text-white transition-all"
          >
            বিস্তারিত দেখুন <MdArrowRightAlt size={18} className="flex-shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export function FeaturedDoctors() {
  const { data: doctors, isLoading } = useDoctors();
  const sliderData = doctors ?? [];
  const doctorCount = sliderData.length;

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: doctorCount > 1,
      speed: 500,
      slidesToShow: Math.min(3, doctorCount),
      slidesToScroll: 1,
      nextArrow: <ArrowButton direction="next" />,
      prevArrow: <ArrowButton direction="prev" />,
      adaptiveHeight: true,
      responsive: [
        { breakpoint: 1280, settings: { slidesToShow: Math.min(3, doctorCount) } },
        { breakpoint: 1024, settings: { slidesToShow: Math.min(2, doctorCount) } },
        {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
          },
        },
      ],
    }),
    [doctorCount]
  );

  if (isLoading) {
    return (
      <section className="py-10 bg-[#F3F3F3]">
        <div className="container mx-auto px-4 py-20 text-center text-gray-500">Loading Doctors...</div>
      </section>
    );
  }

  if (doctorCount === 0) return null;

  return (
    <section className="py-8 sm:py-10 bg-[#F3F3F3] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#005A92] text-center py-6 sm:py-10 px-2">
          বিশেষজ্ঞ ডাক্তারদের সাথে সুস্বাস্থ্যের পথে এক ধাপ এগিয়ে
        </h2>

        <div className="featured-doctors-slider relative max-w-full mx-auto">
          <Slider {...settings}>
            {sliderData.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
