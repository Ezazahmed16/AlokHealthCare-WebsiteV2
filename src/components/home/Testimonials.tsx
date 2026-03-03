import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useState, useRef } from "react";

interface TestimonialData {
  id: number;
  name: string;
  text: string;
  boldText: string;
}

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

const renderText = (fullText: string, highlight: string) => {
  if (!highlight) return fullText;
  const parts = fullText.split(highlight);
  if (parts.length < 2) return fullText;
  return (
    <>
      {parts[0]}
      <span style={{ fontWeight: 700, color: "#001522" }}>{highlight}</span>
      {parts[1]}
    </>
  );
};

const TestimonialCard = ({ name, text, boldText }: TestimonialData) => (
  <div style={{ paddingTop: 48, paddingBottom: 16, paddingLeft: 8, paddingRight: 8, height: "100%" }}>
    <article style={{
      background: "white",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      borderRadius: 12,
      paddingTop: 52,
      paddingBottom: 24,
      paddingLeft: 20,
      paddingRight: 20,
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      minHeight: 280,
    }}>
      {/* Quote icon */}
      <div style={{
        position: "absolute",
        top: -40,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 20,
      }}>
        <svg viewBox="0 0 152 152" fill="none" width="80" height="80">
          <circle cx="76" cy="76" r="74" fill="#F3F3F3" stroke="#00AEEF" strokeWidth="4" />
          <circle cx="76" cy="76" r="62" fill="#001522" />
          <path d="M64.27 74.8899H50.2C50.44 60.8799 53.2 58.5699 61.81 53.4699C62.8 52.8699 63.13 51.6099 62.53 50.5899C61.96 49.5999 60.67 49.2699 59.68 49.2699C49.54 55.8699 46 59.5299 46 76.9599V93.1299C46 98.2599 50.17 102.4 55.27 102.4H64.27C69.55 102.4 73.54 98.4099 73.54 93.1299V84.1299C73.54 78.8799 69.55 74.8899 64.27 74.8899Z" fill="#00AEEF" />
          <path d="M96.73 74.8899H82.66C82.9 60.8799 85.66 58.5699 94.27 53.4699C95.26 52.8699 95.59 51.6099 94.99 50.5899C94.39 49.5999 93.13 49.2699 92.11 49.2699C81.97 55.8699 78.43 59.5299 78.43 76.9899V93.1599C78.43 98.2899 82.6 102.43 87.7 102.43H96.7C101.98 102.43 105.97 98.4399 105.97 93.1599V84.1599C106 78.8799 102.01 74.8899 96.73 74.8899Z" fill="#00AEEF" />
        </svg>
      </div>

      <blockquote style={{
        color: "#4a5568",
        textAlign: "center",
        fontSize: "0.85rem",
        lineHeight: 1.7,
        flexGrow: 1,
        marginTop: 8,
        marginBottom: 0,
      }}>
        "{renderText(text, boldText)}"
      </blockquote>

      <div style={{ marginTop: 16, borderTop: "1px solid #f0f0f0", paddingTop: 12, textAlign: "center" }}>
        <p style={{ fontWeight: 700, color: "#001522", fontSize: "1rem", margin: 0 }}>
          --- {name} ---
        </p>
        <div style={{ color: "#FBBF24", marginTop: 4, fontSize: "0.9rem", letterSpacing: 2 }}>
          ★★★★★
        </div>
      </div>
    </article>
  </div>
);

export const Testimonials = () => {
  const autoplayRef = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", slidesToScroll: 1 },
    [autoplayRef.current]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section style={{ padding: "40px 0 60px", background: "#EBEBEB", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: 48,
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          fontWeight: 700,
          color: "#005A92",
        }}>
          আপনার মতামত আমাদের প্রেরণা
        </h2>

        {/* Slider wrapper — position relative for arrows */}
        <div style={{ position: "relative" }}>

          {/* ✅ Prev arrow — desktop only via CSS */}
          <button
            onClick={scrollPrev}
            type="button"
            aria-label="Previous testimonial"
            className="testimonial-arrow testimonial-arrow-prev"
          >
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <path d="M20.12 26.56L11.43 17.87C10.4 16.84 10.4 15.16 11.43 14.13L20.12 5.44"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* ✅ Next arrow — desktop only via CSS */}
          <button
            onClick={scrollNext}
            type="button"
            aria-label="Next testimonial"
            className="testimonial-arrow testimonial-arrow-next"
          >
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <path d="M11.88 26.56L20.57 17.87C21.6 16.84 21.6 15.16 20.57 14.13L11.88 5.44"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Embla viewport */}
          <div className="testimonial-viewport" ref={emblaRef}>
            <div className="testimonial-container">
              {testimonialsData.map((item, index) => (
                <div
                  key={item.id}
                  className={`testimonial-slide ${index === selectedIndex ? "testimonial-slide--active" : ""}`}
                >
                  <TestimonialCard {...item} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }}>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                style={{
                  width: index === selectedIndex ? 24 : 8,
                  height: 8,
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  background: index === selectedIndex ? "#00AEEF" : "#CBD5E0",
                  padding: 0,
                }}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};