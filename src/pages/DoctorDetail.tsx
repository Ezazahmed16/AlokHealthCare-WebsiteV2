import { useParams, Link } from "react-router-dom";
import { MessageCircle, MapPin, GraduationCap, Briefcase, ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDoctorWithSchedule } from "@/hooks/useDoctors";
import { generateWhatsAppLink } from "@/lib/whatsapp";
import { DAYS_OF_WEEK } from "@/lib/constants";

const DoctorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: doctor, isLoading } = useDoctorWithSchedule(id || "");

  if (isLoading) {
    return (
      <Layout>
        <div className="container py-8 space-y-8">
          <Skeleton className="h-6 w-48" />
          <div className="grid md:grid-cols-3 gap-8">
            <Skeleton className="aspect-square rounded-xl" />
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!doctor) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">ডাক্তার পাওয়া যায়নি</h1>
          <p className="text-muted-foreground mb-6">
            আপনি যে ডাক্তারকে খুঁজছেন তা বিদ্যমান নেই।
          </p>
          <Button asChild>
            <Link to="/doctors">সব ডাক্তার দেখুন</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const whatsappLink = generateWhatsAppLink(doctor.name, doctor.whatsapp_number);

  // Group schedules by working status
  const workingDays = doctor.schedules.filter((s) => !s.is_off_day);

  // Group schedules by time for display
  const scheduleGroups: { days: string[]; time: string }[] = [];
  workingDays.forEach((schedule) => {
    const time = `${schedule.start_time.slice(0, 5)} - ${schedule.end_time.slice(0, 5)}`;
    const existingGroup = scheduleGroups.find((g) => g.time === time);
    if (existingGroup) {
      existingGroup.days.push(DAYS_OF_WEEK[schedule.day_of_week]);
    } else {
      scheduleGroups.push({ days: [DAYS_OF_WEEK[schedule.day_of_week]], time });
    }
  });

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border">
        <div className="container py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">হোমপেজ</Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/doctors" className="hover:text-foreground transition-colors">ডাক্তার</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-secondary font-medium">চিকিৎসক পরিচিতি</span>
          </nav>
        </div>
      </div>

      {/* Doctor Profile Section */}
      <section className="py-8 md:py-12">
        <div className="container">
          <h1 className="text-2xl md:text-3xl font-bold text-secondary text-center mb-8">
            চিকিৎসক পরিচিতি
          </h1>

          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl border border-border shadow-card p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Doctor Image */}
                <div className="w-full md:w-48 shrink-0">
                  <div className="aspect-square rounded-xl overflow-hidden bg-muted shadow-md">
                    {doctor.image_url ? (
                      <img
                        src={doctor.image_url}
                        alt={doctor.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-subtle">
                        <span className="text-6xl font-bold text-primary/20">
                          {doctor.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
                      {doctor.name}
                    </h2>
                    <p className="text-secondary font-medium">
                      বিশেষত্ব: {doctor.specialization}
                    </p>
                  </div>

                  <div className="space-y-2 text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <GraduationCap className="h-5 w-5 mt-0.5 shrink-0 text-secondary" />
                      <div>
                        <span className="font-medium text-foreground">শিক্ষাগত যোগ্যতা:</span>
                        <p>{doctor.qualification}</p>
                      </div>
                    </div>

                    {doctor.bio && (
                      <div className="flex items-start gap-2">
                        <Briefcase className="h-5 w-5 mt-0.5 shrink-0 text-secondary" />
                        <div>
                          <span className="font-medium text-foreground">অভিজ্ঞতা:</span>
                          <p>{doctor.bio}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-secondary" />
                      <div>
                        <span className="font-medium text-foreground">অবস্থান:</span>
                        <p>{doctor.branch_name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Schedule Table */}
              {scheduleGroups.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-bold text-foreground mb-4 text-center">ডাক্তারের সময়সূচী</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse max-w-lg mx-auto">
                      <thead>
                        <tr className="bg-secondary text-white">
                          <th className="text-left py-3 px-4 font-semibold border border-secondary">
                            দিনসমূহ
                          </th>
                          <th className="text-left py-3 px-4 font-semibold border border-secondary">
                            সাপ্তাহিক সময়সূচী
                          </th>
                          <th className="text-left py-3 px-4 font-semibold border border-secondary">
                            সময়
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {scheduleGroups.map((group, index) => (
                          <tr key={index} className="hover:bg-muted/30">
                            <td className="py-3 px-4 border border-border text-foreground">
                              {group.days.join(", ")}
                            </td>
                            <td className="py-3 px-4 border border-border text-muted-foreground">
                              সাপ্তাহিক সময়সূচী
                            </td>
                            <td className="py-3 px-4 border border-border text-muted-foreground">
                              {group.time}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Appointment Button */}
              <div className="mt-8 hidden md:flex justify-center">
                <Button 
                  className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold px-8 py-3 h-auto rounded-full"
                  asChild
                >
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    অ্যাপয়েন্টমেন্ট নিন
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Sticky WhatsApp Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border z-50">
        <Button 
          className="w-full bg-primary hover:bg-primary-dark text-primary-foreground font-semibold py-3 h-auto rounded-full"
          asChild
        >
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            অ্যাপয়েন্টমেন্ট নিন
          </a>
        </Button>
      </div>

      {/* Bottom padding for mobile sticky button */}
      <div className="md:hidden h-20" />
    </Layout>
  );
};

export default DoctorDetail;
