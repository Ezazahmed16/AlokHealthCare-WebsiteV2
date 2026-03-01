import { useState, useEffect, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* --- Types --- */
interface TestimonialData {
  id: number;
  name: string;
  text: string;
  boldText: string;
}

interface ArrowProps {
  onClick?: () => void;
  direction: "prev" | "next";
  className?: string;
}

/* --- Arrow Button Component --- */
const ArrowButton = ({ onClick, direction, className }: ArrowProps) => {
  if (className?.includes("slick-disabled")) return null;

  const isNext = direction === "next";
  return (
    <button
      onClick={onClick}
      type="button"
      aria-label={isNext ? "Next testimonial" : "Previous testimonial"}
      className={`absolute top-1/2 -translate-y-1/2 z-20 text-[#00AEEF] hover:text-[#005A92] 
        focus:outline-none transition-colors duration-300 hidden sm:block
        ${isNext ? "right-2 lg:right-[-20px] xl:right-[-30px]" : "left-2 lg:left-[-20px] xl:left-[-30px]"}`}
    >
      {isNext ? (
        <svg width="40" height="40" viewBox="0 0 56 56" fill="none" className="drop-shadow-lg sm:w-12 sm:h-12 xl:w-14 xl:h-14">
          <path d="M28 51.3334C15.1134 51.3334 4.6667 40.8867 4.6667 28.0001C4.6667 15.1134 15.1134 4.66675 28 4.66675C40.8867 4.66675 51.3334 15.1134 51.3334 28.0001C51.3334 40.8867 40.8867 51.3334 28 51.3334Z" stroke="#001522" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M25.06 36.2365L33.2733 27.9998L25.06 19.7632" stroke="#001522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="40" height="40" viewBox="0 0 56 56" fill="none" className="drop-shadow-lg sm:w-12 sm:h-12 xl:w-14 xl:h-14">
          <path d="M28 51.3334C40.8867 51.3334 51.3333 40.8867 51.3333 28.0001C51.3333 15.1134 40.8867 4.66675 28 4.66675C15.1134 4.66675 4.66667 15.1134 4.66667 28.0001C4.66667 40.8867 15.1134 51.3334 28 51.3334Z" stroke="#001522" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M30.94 36.2365L22.7266 27.9998L30.94 19.7632" stroke="#001522" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
};

/* --- Data: 11 Testimonials --- */
const testimonialsData: TestimonialData[] = [
  { id: 1, name: "আফিফ চৌধুরী", text: "এখানকার পরিষেবা আমার প্রত্যাশার থেকেও ভালো ছিল। ডাক্তারদের অভিজ্ঞতা, সঠিক রোগ নির্ণয় এবং চিকিৎসায় আধুনিক পদ্ধতি আমার সুস্থতার পথ সহজ করে তুলেছে। আমি সবার কাছে আলোক হেলথ কেয়ার সুপারিশ করবো।", boldText: "সঠিক রোগ নির্ণয় এবং চিকিৎসায় আধুনিক পদ্ধতি" },
  { id: 2, name: "সালমা ইসলাম", text: "পরিষেবার মান অসাধারণ! আমি দ্রুত স্বাস্থ্য পরীক্ষা করিয়েছি এবং রিপোর্ট যথাযথ সময়ে হাতে পেয়েছি। ডাক্তারদের আন্তরিকতা সত্যিই প্রশংসনীয়।", boldText: "ডাক্তারদের আন্তরিকতা সত্যিই প্রশংসনীয়" },
  { id: 3, name: "রাজিব আহমেদ", text: "আমি আলোক হেলথ কেয়ার থেকে সম্পূর্ণ সন্তুষ্ট। আধুনিক প্রযুক্তির ব্যবহার এবং দক্ষ চিকিৎসকদের পরামর্শ সত্যিই বিশ্বস্ত।", boldText: "আধুনিক প্রযুক্তির ব্যবহার এবং দক্ষ চিকিৎসকদের পরামর্শ" },
  { id: 4, name: "নাজমা বেগম", text: "নার্স এবং স্টাফদের ব্যবহার আমাকে মুগ্ধ করেছে। তারা সবসময় হাসিমুখে সেবা দেন এবং রোগীদের খুব যত্ন নেন। পরিষ্কার-পরিচ্ছন্ন পরিবেশ মন ভালো করে দেয়।", boldText: "নার্স এবং স্টাফদের ব্যবহার আমাকে মুগ্ধ করেছে" },
  { id: 5, name: "করিম উল্লাহ", text: "বাচ্চাদের চিকিৎসার জন্য এত সুন্দর পরিবেশ আমি আগে দেখিনি। আমার ছেলের চিকিৎসায় ডাক্তাররা খুব ধৈর্য সহকারে সময় দিয়েছেন।", boldText: "ডাক্তাররা খুব ধৈর্য সহকারে সময় দিয়েছেন" },
  { id: 6, name: "সুমাইয়া আক্তার", text: "রাত ৩টার সময় ইমার্জেন্সি বিভাগে এসেছিলাম। এত দ্রুত এবং পেশাদার সেবা পাবো ভাবিনি। জরুরি মুহূর্তে তাদের তৎপরতা জীবন বাঁচাতে পারে।", boldText: "দ্রুত এবং পেশাদার সেবা" },
  { id: 7, name: "তানভীর হাসান", text: "অপারেশনের পর এত দ্রুত সুস্থ হয়ে উঠব ভাবিনি। পোস্ট-অপারেটিভ কেয়ার খুবই ভালো ছিল। ফলোআপ চেকআপের সিস্টেমটাও খুব গোছানো।", boldText: "পোস্ট-অপারেটিভ কেয়ার খুবই ভালো ছিল" },
  { id: 8, name: "ফারহানা ইয়াসমিন", text: "হাসপাতালের পরিচ্ছন্নতা এবং হাইজিন মেইনটেইনেন্স আন্তর্জাতিক মানের। কোথাও কোনো ময়লা বা দুর্গন্ধ নেই, যা একজন রোগীর জন্য খুব স্বস্তিদায়ক।", boldText: "পরিচ্ছন্নতা এবং হাইজিন মেইনটেইনেন্স আন্তর্জাতিক মানের" },
  { id: 9, name: "আব্দুল মালিক", text: "অন্যান্য প্রাইভেট হাসপাতালের তুলনায় এখানে খরচ অনুযায়ী সেবার মান অনেক ভালো। অপ্রয়োজনীয় টেস্ট দিয়ে হয়রানি করা হয় না।", boldText: "খরচ অনুযায়ী সেবার মান অনেক ভালো" },
  { id: 10, name: "রুবিনা পারভীন", text: "একই ছাদের নিচে ফার্মেসি, প্যাথলজি এবং ডাক্তার দেখানোর সুবিধা থাকায় খুব উপকার হয়েছে। বয়স্ক রোগীদের জন্য এটা দারুণ ব্যবস্থা।", boldText: "একই ছাদের নিচে ফার্মেসি, প্যাথলজি এবং ডাক্তার" },
  { id: 11, name: "ইমরান খান", text: "অনলাইন অ্যাপয়েন্টমেন্ট সিস্টেমটা খুব সহজ। ঘরে বসেই সিরিয়াল দিয়েছিলাম, তাই হাসপাতালে গিয়ে বেশিক্ষণ অপেক্ষা করতে হয়নি।", boldText: "অনলাইন অ্যাপয়েন্টমেন্ট সিস্টেমটা খুব সহজ" },
];

/* --- Helper: highlight bold text --- */
const renderText = (fullText: string, highlight: string) => {
  if (!highlight) return fullText;
  const parts = fullText.split(highlight);
  if (parts.length < 2) return fullText;
  return (
    <>
      {parts[0]}
      <span className="font-bold text-[#001522]">{highlight}</span>
      {parts[1]}
    </>
  );
};

/* --- Testimonial Card --- */
const TestimonialCard = ({ name, text, boldText }: TestimonialData) => (
  <div className="py-6 sm:py-8 md:py-12 px-2 sm:px-3 md:px-4">
    <article
      className="bg-white shadow-lg rounded-xl pt-12 sm:pt-14 md:pt-16 pb-6 sm:pb-8 px-4 sm:px-5 md:px-6 relative min-h-[280px] sm:min-h-[320px] md:min-h-[350px] flex flex-col justify-between transition-shadow duration-300 hover:shadow-xl"
      aria-label={`Testimonial from ${name}`}
    >
      {/* Decorative Quote Icon */}
      <div className="absolute -top-10 sm:-top-12 md:-top-14 left-1/2 -translate-x-1/2 z-20" aria-hidden="true">
        <svg viewBox="0 0 152 152" fill="none" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[100px] lg:h-[100px] xl:w-[120px] xl:h-[120px]">
          <circle cx="76" cy="76" r="74" fill="#F3F3F3" stroke="#00AEEF" strokeWidth="4" />
          <circle cx="76" cy="76" r="62" fill="#001522" />
          <path d="M64.27 74.8899H50.2C50.44 60.8799 53.2 58.5699 61.81 53.4699C62.8 52.8699 63.13 51.6099 62.53 50.5899C61.96 49.5999 60.67 49.2699 59.68 49.2699C49.54 55.8699 46 59.5299 46 76.9599V93.1299C46 98.2599 50.17 102.4 55.27 102.4H64.27C69.55 102.4 73.54 98.4099 73.54 93.1299V84.1299C73.54 78.8799 69.55 74.8899 64.27 74.8899Z" fill="#00AEEF" />
          <path d="M96.73 74.8899H82.66C82.9 60.8799 85.66 58.5699 94.27 53.4699C95.26 52.8699 95.59 51.6099 94.99 50.5899C94.39 49.5999 93.13 49.2699 92.11 49.2699C81.97 55.8699 78.43 59.5299 78.43 76.9899V93.1599C78.43 98.2899 82.6 102.43 87.7 102.43H96.7C101.98 102.43 105.97 98.4399 105.97 93.1599V84.1599C106 78.8799 102.01 74.8899 96.73 74.8899Z" fill="#00AEEF" />
        </svg>
      </div>

      <blockquote className="text-gray-600 text-center text-xs sm:text-sm md:text-[15px] font-medium leading-6 sm:leading-7 flex-grow mt-4 sm:mt-5 md:mt-6">
        "{renderText(text, boldText)}"
      </blockquote>

      <div className="mt-4 sm:mt-6 border-t border-gray-100 pt-3 sm:pt-4">
        <footer className="text-center text-[#001522] font-bold text-base sm:text-lg">
          --- {name} ---
        </footer>
        <div className="flex justify-center mt-1.5 sm:mt-2 text-yellow-400 text-xs sm:text-sm gap-0.5 sm:gap-1" aria-label="5-star rating">
          {[...Array(5)].map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>
    </article>
  </div>
);

/* --- Main Component --- */
export const Testimonials = () => {
  const [navKey, setNavKey] = useState(0);

  // Force slider to re-initialize after mount so real phones get correct dimensions
  useEffect(() => {
    const timer = setTimeout(() => setNavKey((prev) => prev + 1), 100);
    return () => clearTimeout(timer);
  }, []);

  const settings = useMemo(
    () => ({
      className: "testimonial-slider",
      centerMode: true,
      infinite: true,
      centerPadding: "8px",
      dots: true,
      slidesToShow: 3,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 4000,
      touchThreshold: 10,
      useTransform: true,
      nextArrow: <ArrowButton direction="next" />,
      prevArrow: <ArrowButton direction="prev" />,
      responsive: [
        { breakpoint: 1280, settings: { slidesToShow: 3, centerPadding: "12px" } },
        { breakpoint: 1024, settings: { slidesToShow: 2, centerPadding: "16px" } },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            centerPadding: "12px",
            arrows: false,
            centerMode: false,
          },
        },
      ],
    }),
    []
  );

  return (
    <section className="py-10 sm:py-12 md:py-16 bg-[#EBEBEB] overflow-hidden" aria-labelledby="testimonials-heading">
      <div className="container mx-auto relative px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 id="testimonials-heading" className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#005A92] custom-bangla-font px-2">
            আপনার মতামত আমাদের প্রেরণা
          </h2>
        </div>

        <div className="testimonials-slider max-w-full mx-auto">
          <Slider key={navKey} {...settings}>
            {testimonialsData.map((item) => (
              <TestimonialCard key={item.id} {...item} />
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
