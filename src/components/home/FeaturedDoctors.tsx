import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowRightAlt } from "react-icons/md";
import { useDoctors, Doctor } from "@/hooks/useDoctors";

export function FeaturedDoctors() {
  const { data: doctors, isLoading } = useDoctors();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    slidesToScroll: 1,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => setSelectedIndex(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  if (isLoading) return null;
  const sliderData = doctors ?? [];
  if (sliderData.length === 0) return null;

  return (
    <section style={{ padding: "40px 0", background: "#F3F3F3", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
        <h1 style={{
          textAlign: "center", padding: "40px 0",
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          fontWeight: 700, color: "#005A92",
        }}>
          বিশেষজ্ঞ ডাক্তারদের সাথে সুস্বাস্থ্যের পথে এক ধাপ এগিয়ে
        </h1>

        {/* Embla viewport */}
        <div style={{ position: "relative" }}>

          {/* Prev button — hidden on mobile */}
          <button
            onClick={scrollPrev}
            className="embla-arrow embla-arrow-prev"
            type="button"
            aria-label="Previous"
          >
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <path d="M20.12 26.56L11.43 17.87C10.4 16.84 10.4 15.16 11.43 14.13L20.12 5.44"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Next button — hidden on mobile */}
          <button
            onClick={scrollNext}
            className="embla-arrow embla-arrow-next"
            type="button"
            aria-label="Next"
          >
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <path d="M11.88 26.56L20.57 17.87C21.6 16.84 21.6 15.16 20.57 14.13L11.88 5.44"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* ✅ Embla viewport — overflow hidden is here */}
          <div className="embla-viewport" ref={emblaRef}>
            <div className="embla-container">
              {sliderData.map((doctor: Doctor, index: number) => (
                <div
                  key={doctor.id}
                  className={`embla-slide ${index === selectedIndex ? "embla-slide--active" : ""}`}
                >
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 20 }}>
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
}

function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div style={{
      background: "white",
      borderRadius: 16,
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      overflow: "hidden",
      margin: "12px 8px",
    }}>
      <div style={{ height: 240, overflow: "hidden", background: "#f3f4f6" }}>
        <img
          src={doctor.image_url || "https://placehold.co/400x500?text=No+Image"}
          alt={doctor.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://placehold.co/400x500?text=No+Image";
          }}
        />
      </div>
      <div style={{ padding: "16px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#1a202c", marginBottom: 8 }}>
          {doctor.name}
        </h2>
        <div style={{ fontSize: "0.8rem", color: "#4a5568", lineHeight: 1.6, marginBottom: 12 }}>
          <p style={{ margin: 0 }}><strong>বিশেষত্ব:</strong> {doctor.specialization || "General"}</p>
          <p style={{ margin: 0 }}><strong>যোগ্যতা:</strong> {doctor.qualification || "N/A"}</p>
        </div>
        <Link
          to={`/doctors/${doctor.id}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            border: "2px solid #00AEEF", borderRadius: 999,
            padding: "7px 18px", fontSize: "0.8rem",
            color: "#00AEEF", textDecoration: "none",
          }}
        >
          বিস্তারিত দেখুন <MdArrowRightAlt size={16} />
        </Link>
      </div>
    </div>
  );
}