import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import DoctorGrid from "@/components/doctors/DoctorsGrid";
import { useDoctors, useDoctorsAvailabilityToday, useDoctorsByDay } from "@/hooks/useDoctors";
import { useDebounce } from "@/hooks/useDebounce";
import { useSpecializations } from "@/hooks/useSpecializations";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const days = [
  { value: 0, label: "রবিবার" },
  { value: 1, label: "সোমবার" },
  { value: 2, label: "মঙ্গলবার" },
  { value: 3, label: "বুধবার" },
  { value: 4, label: "বৃহস্পতিবার" },
  { value: 5, label: "শুক্রবার" },
  { value: 6, label: "শনিবার" },
];

const Doctors = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Combine text filters
  const combinedSearch = [
    debouncedSearch,
    selectedSpecialty,
  ].filter(Boolean).join(" ");

  const { data: allDoctors, isLoading } = useDoctors(combinedSearch);
  const { data: specializations } = useSpecializations();
  
  // Filter by selected day availability
  const { data: availableDoctorIds } = useDoctorsAvailabilityToday();
  const { data: dayFilteredIds } = useDoctorsByDay(selectedDay);
  
  const doctors = selectedDay !== null && dayFilteredIds
    ? allDoctors?.filter(doc => dayFilteredIds.has(doc.id))
    : allDoctors;

  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
    }
  }, [initialSearch]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty(null);
    setSelectedDay(null);
    setSearchParams({}); // Clear URL params too
  };

  const hasActiveFilters = searchQuery || selectedSpecialty || selectedDay !== null;

  return (
    <Layout>
      {/* Hero Section with Search */}
      <section className="relative overflow-hidden h-full">
        {/* Background Image */}
        <div 
          className="absolute inset-2 bg-cover bg-center h-full w-full"
          style={{ 
            backgroundImage: "url('/doctors_bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-secondary" />
        
        <div className="container relative z-10 py-12 md:py-20">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-8">
            পছন্দের ডাক্তার খুঁজুন সহজেই!
          </h1>

          {/* Filter Section */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Input with Filters */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="ডাক্তারের নাম দিয়ে খুঁজুন"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-12 pl-4 pr-10 bg-white border border-border text-foreground placeholder:text-muted-foreground rounded-md focus:ring-2 focus:ring-primary"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Specialty Dropdown */}
              <div className="relative min-w-[180px]">
                <select
                  value={selectedSpecialty || ""}
                  onChange={(e) => setSelectedSpecialty(e.target.value || null)}
                  className="w-full h-12 px-4 bg-white border border-border text-foreground rounded-md cursor-pointer focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">বিভাগ/বিশেষত্ব</option>
                  {specializations?.map((spec) => (
                    <option key={spec.id} value={spec.name_bn || spec.name}>
                      {spec.name_bn || spec.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Day Dropdown */}
              <div className="relative min-w-[140px]">
                <select
                  value={selectedDay !== null ? selectedDay : ""}
                  onChange={(e) => setSelectedDay(e.target.value !== "" ? parseInt(e.target.value) : null)}
                  className="w-full h-12 px-4 bg-white border border-border text-foreground rounded-md cursor-pointer focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="">দিন</option>
                  {days.map((day) => (
                    <option key={day.value} value={day.value}>{day.label}</option>
                  ))}
                </select>
              </div>

              {/* Search Button */}
              <Button className="h-12 px-8 bg-primary hover:bg-primary-dark text-primary-foreground font-semibold rounded-md gap-2">
                <Search className="h-5 w-5" />
                খুঁজুন
              </Button>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-white/80 text-sm">ফিল্টার:</span>
                {searchQuery && (
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 text-white hover:bg-white/30 cursor-pointer"
                    onClick={() => setSearchQuery("")}
                  >
                    "{searchQuery}" <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                {selectedSpecialty && (
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 text-white hover:bg-white/30 cursor-pointer"
                    onClick={() => setSelectedSpecialty(null)}
                  >
                    {selectedSpecialty} <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                {selectedDay !== null && (
                  <Badge 
                    variant="secondary" 
                    className="bg-white/20 text-white hover:bg-white/30 cursor-pointer"
                    onClick={() => setSelectedDay(null)}
                  >
                    {days.find(d => d.value === selectedDay)?.label} <X className="h-3 w-3 ml-1" />
                  </Badge>
                )}
                <button 
                  onClick={clearFilters}
                  className="text-white/80 hover:text-white text-sm underline ml-2"
                >
                  সব মুছুন
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Doctor Grid */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="mb-6">
            <p className="text-muted-foreground">
              {isLoading
                ? "ডাক্তার লোড হচ্ছে..."
                : `${doctors?.length || 0} জন ডাক্তার পাওয়া গেছে`}
            </p>
          </div>
          <DoctorGrid doctors={doctors || []} isLoading={isLoading} />
        </div>
      </section>
    </Layout>
  );
};

export default Doctors;