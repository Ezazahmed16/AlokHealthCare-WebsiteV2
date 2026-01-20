import { Users, Calendar, MapPin, Activity, TrendingUp, Stethoscope } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useDoctors } from "@/hooks/useDoctors";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AdminOverview = () => {
  const { data: doctors, isLoading } = useDoctors();

  // Calculate stats
  const totalDoctors = doctors?.length || 0;
  const uniqueBranches = new Set(doctors?.map((d) => d.branch_name) || []).size;
  const uniqueSpecializations = new Set(doctors?.map((d) => d.specialization) || []).size;
  const doctorsWithWhatsApp = doctors?.filter((d) => d.whatsapp_number).length || 0;

  const stats = [
    {
      title: "মোট ডাক্তার",
      value: totalDoctors,
      icon: Users,
      description: "নিবন্ধিত ডাক্তার",
      bgColor: "bg-secondary/10",
      iconColor: "text-secondary",
    },
    {
      title: "শাখা সমূহ",
      value: uniqueBranches,
      icon: MapPin,
      description: "ক্লিনিক লোকেশন",
      bgColor: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      title: "বিশেষত্ব",
      value: uniqueSpecializations,
      icon: Stethoscope,
      description: "মেডিকেল বিভাগ",
      bgColor: "bg-cta/10",
      iconColor: "text-cta",
    },
    {
      title: "হোয়াটস্যাপ রেডি",
      value: doctorsWithWhatsApp,
      icon: Activity,
      description: "বুকিং সক্রিয়",
      bgColor: "bg-whatsapp/10",
      iconColor: "text-whatsapp",
    },
  ];

  // Recent doctors (last 5)
  const recentDoctors = doctors?.slice(-5).reverse() || [];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">ড্যাশবোর্ড ওভারভিউ</h2>
        <p className="text-muted-foreground">
          আপনার হাসপাতালের ডাক্তার এবং সময়সূচী এক নজরে দেখুন।
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {isLoading ? "..." : stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Quick Actions */}
        <Card className="border border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-secondary">
              <TrendingUp className="h-5 w-5" />
              দ্রুত অ্যাকশন
            </CardTitle>
            <CardDescription>সাধারণ কাজ যা আপনি করতে পারেন</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button asChild variant="teal" className="justify-start h-auto py-3">
              <Link to="/admin/doctors">
                <Users className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">ডাক্তার ম্যানেজ করুন</div>
                  <div className="text-xs opacity-80">ডাক্তার প্রোফাইল যোগ, সম্পাদনা বা মুছুন</div>
                </div>
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start h-auto py-3">
              <Link to="/admin/schedules">
                <Calendar className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">সময়সূচী সম্পাদনা করুন</div>
                  <div className="text-xs opacity-80">পরামর্শের সময় আপডেট করুন</div>
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Doctors */}
        <Card className="border border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-secondary">
              <Users className="h-5 w-5" />
              সাম্প্রতিক ডাক্তার
            </CardTitle>
            <CardDescription>টিমে সর্বশেষ সংযোজন</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-muted-foreground text-sm">লোড হচ্ছে...</p>
            ) : recentDoctors.length === 0 ? (
              <div className="text-center py-6">
                <Users className="h-10 w-10 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">এখনও কোনো ডাক্তার যোগ করা হয়নি</p>
                <Button asChild variant="link" size="sm" className="mt-2 text-secondary">
                  <Link to="/admin/doctors">প্রথম ডাক্তার যোগ করুন</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      {doctor.image_url ? (
                        <img
                          src={doctor.image_url}
                          alt={doctor.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <Users className="h-5 w-5 text-secondary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doctor.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {doctor.specialization} • {doctor.branch_name}
                      </p>
                    </div>
                    {doctor.whatsapp_number && (
                      <div className="h-2 w-2 rounded-full bg-whatsapp" title="হোয়াটস্যাপ সক্রিয়" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
