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
  { 
    id: 1, 
    name: "আফিফ চৌধুরী", 
    text: "আলোক হেলথকেয়ার এন্ড ডায়াগনস্টিক সলিউশন থেকে খুব ভালো সার্ভিস পেয়েছি। স্টাফরা অনেক সহযোগিতাপূর্ণ এবং রিপোর্টও নির্ধারিত সময়ের মধ্যে পেয়েছি। সার্ভিস নিয়ে আমি সম্পূর্ণ সন্তুষ্ট।", 
    boldText: "স্টাফরা অনেক সহযোগিতাপূর্ণ এবং রিপোর্টও নির্ধারিত সময়ের মধ্যে পেয়েছি" 
  },
  { 
    id: 2, 
    name: "সালমা ইসলাম", 
    text: "খুবই নির্ভরযোগ্য একটি ডায়াগনস্টিক সেন্টার। পরিবেশ পরিষ্কার-পরিচ্ছন্ন এবং আধুনিক মেশিন ব্যবহার করা হয়। রোগীদের প্রতি তাদের যত্ন এবং আচরণ সত্যিই প্রশংসনীয়।", 
    boldText: "পরিবেশ পরিষ্কার-পরিচ্ছন্ন এবং আধুনিক মেশিন ব্যবহার করা হয়" 
  },
  { 
    id: 3, 
    name: "রাজিব আহমেদ", 
    text: "আমি এখানে কয়েকটি টেস্ট করিয়েছি এবং অভিজ্ঞতা খুব ভালো ছিল। রিপোর্ট দ্রুত পেয়েছি এবং পুরো প্রক্রিয়াটা খুব সহজ ছিল। ভবিষ্যতেও এখানেই টেস্ট করানোর পরিকল্পনা আছে।", 
    boldText: "রিপোর্ট দ্রুত পেয়েছি এবং পুরো প্রক্রিয়াটা খুব সহজ ছিল" 
  },
  { 
    id: 4, 
    name: "নাজমা বেগম", 
    text: "আলোক হেলথকেয়ারে সার্ভিস খুবই ভালো। স্টাফরা ভদ্র এবং রোগীদের সাথে সুন্দরভাবে কথা বলে। দ্রুত ও সঠিক রিপোর্ট পাওয়ার জন্য এটি একটি ভালো জায়গা।", 
    boldText: "দ্রুত ও সঠিক রিপোর্ট পাওয়ার জন্য এটি একটি ভালো জায়গা" 
  },
  { 
    id: 5, 
    name: "করিম উল্লাহ", 
    text: "ডায়াগনস্টিক সার্ভিসের মান সত্যিই ভালো লেগেছে। সময়মতো রিপোর্ট পাওয়া গেছে এবং পুরো পরিবেশ খুবই স্বাস্থ্যসম্মত। সবার ব্যবহারও খুব ভালো।", 
    boldText: "সময়মতো রিপোর্ট পাওয়া গেছে এবং পুরো পরিবেশ খুবই স্বাস্থ্যসম্মত" 
  },
  { 
    id: 6, 
    name: "সুমাইয়া আক্তার", 
    text: "অনলাইনে রিপোর্ট পাওয়ার সুবিধা থাকায় অনেক সুবিধা হয়েছে। অল্প সময়ের মধ্যেই টেস্ট সম্পন্ন হয়েছে এবং সার্ভিস কোয়ালিটি সন্তোষজনক।", 
    boldText: "অনলাইনে রিপোর্ট পাওয়ার সুবিধা থাকায় অনেক সুবিধা হয়েছে" 
  },
  { 
    id: 7, 
    name: "তানভীর হাসান", 
    text: "প্রথমবার এখানে টেস্ট করিয়েছি এবং অভিজ্ঞতা খুব ভালো ছিল। রিসেপশন থেকে শুরু করে রিপোর্ট ডেলিভারি পর্যন্ত সবকিছুই খুব সুন্দরভাবে পরিচালনা করা হয়।", 
    boldText: "রিসেপশন থেকে শুরু করে রিপোর্ট ডেলিভারি পর্যন্ত সবকিছুই খুব সুন্দর" 
  },
  { 
    id: 8, 
    name: "ফারহানা ইয়াসমিন", 
    text: "সার্ভিস খুব দ্রুত এবং নির্ভরযোগ্য। রোগীদের জন্য পরিষ্কার পরিবেশ এবং ভালো ব্যবস্থাপনা রয়েছে। আলোক হেলথকেয়ার সত্যিই প্রশংসার যোগ্য।", 
    boldText: "রোগীদের জন্য পরিষ্কার পরিবেশ এবং ভালো ব্যবস্থাপনা রয়েছে" 
  },
  { 
    id: 9, 
    name: "আব্দুল মালিক", 
    text: "স্টাফদের আচরণ খুবই আন্তরিক। তারা প্রতিটি বিষয় সুন্দরভাবে বুঝিয়ে দেয় এবং রোগীদের প্রতি অনেক যত্নশীল। সার্ভিস নিয়ে আমি সন্তুষ্ট।", 
    boldText: "তারা প্রতিটি বিষয় সুন্দরভাবে বুঝিয়ে দেয় এবং রোগীদের প্রতি অনেক যত্নশীল" 
  },
  { 
    id: 10, 
    name: "রুবিনা পারভীন", 
    text: "আধুনিক সুবিধা ও দ্রুত রিপোর্টের জন্য এই ডায়াগনস্টিক সেন্টারটি ভালো লেগেছে। ভবিষ্যতে আবারও এখান থেকে সেবা নেব।", 
    boldText: "আধুনিক সুবিধা ও দ্রুত রিপোর্টের জন্য এই সেন্টারটি ভালো লেগেছে" 
  }
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