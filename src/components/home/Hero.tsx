import CommonButton from "@/lib/CommonButton";

export function Hero() {
  return (
    <section>
      <div
        className="hero min-h-[270px] md:min-h-screen image-full"
        style={{
          backgroundImage: `
            linear-gradient(0deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)),
            linear-gradient(0deg, rgba(0, 174, 239, 0.2), rgba(0, 174, 239, 0.2)),
            linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 28.14%),
            linear-gradient(180deg, rgba(0, 0, 0, 0) 74.31%, rgba(0, 0, 0, 0.3) 100%),
            url('/image.png')
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        <div className="hero-content text-center">
          <div className="container mx-auto py-20 flex flex-col items-start justify-center">
            
            <h1
              className="custom-bangla-font text-2xl md:text-6xl text-[#F9FAFB] text-start font-bold"
              style={{ textShadow: "0px 0px 20px rgba(0, 0, 0, 0.25)" }}
            >
              <span>সুস্থ জীবনের শুরু এখানে,</span>
              <span className="block my-1">আলোক হেলথ কেয়ার</span>
              <span>এন্ড ডায়াগনস্টিক সলিউশন</span>
            </h1>

            <p className="my-4 text-[#F9FAFB] text-sm md:text-lg max-w-3xl text-start">
              আধুনিক স্বাস্থ্যসেবা কেন্দ্র, যেখানে নির্ভুল ডায়াগনস্টিক টেস্ট,
              উন্নত চিকিৎসা পরামর্শ এবং মানসম্পন্ন স্বাস্থ্যসেবা প্রদান করা হয়।
              দক্ষ চিকিৎসক ও অভিজ্ঞ ল্যাব টেকনিশিয়ানদের মাধ্যমে সর্বাধুনিক
              প্রযুক্তি ব্যবহার করে আমরা রোগ নির্ণয় ও চিকিৎসা নিশ্চিত করি।
              আমাদের সেবার মধ্যে রয়েছে ব্লাড টেস্ট, আল্ট্রাসোনোগ্রাফি,
              এক্স-রে, স্বাস্থ্য পরীক্ষা প্যাকেজ এবং বিশেষজ্ঞ চিকিৎসকের
              পরামর্শ। সাশ্রয়ী মূল্যে দ্রুত ও নির্ভরযোগ্য স্বাস্থ্যসেবা পেতে
              আলোক হেলথকেয়ার অ্যান্ড ডায়াগনস্টিক সল্যুশন আপনার নির্ভরযোগ্য
              ঠিকানা।
            </p>
            <CommonButton>সেবা সম্পর্কে জানুন</CommonButton>
          </div>
        </div>
      </div>
    </section>
  );
}