import { useState, useEffect } from "react";
import { Loader2, Clock, Save, Calendar, Users, CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useDoctors,
  useDoctorWithSchedule,
  useUpsertSchedules,
} from "@/hooks/useDoctors";
import { DAYS_OF_WEEK, DAYS_OF_WEEK_EN } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { generateWhatsAppLink } from "@/lib/whatsapp";

type ScheduleFormItem = {
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_off_day: boolean;
};

const defaultSchedule: ScheduleFormItem[] = DAYS_OF_WEEK.map((_, index) => ({
  day_of_week: index,
  start_time: "09:00",
  end_time: "17:00",
  is_off_day: index === 0, // Sunday off by default
}));

const AdminSchedules = () => {
  const { data: doctors, isLoading: doctorsLoading } = useDoctors();
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");
  const { data: doctorWithSchedule, isLoading: scheduleLoading } =
    useDoctorWithSchedule(selectedDoctorId);
  const upsertSchedules = useUpsertSchedules();

  const [scheduleForm, setScheduleForm] = useState<ScheduleFormItem[]>(defaultSchedule);

  // Update form when doctor schedules load
  useEffect(() => {
    if (doctorWithSchedule?.schedules && doctorWithSchedule.schedules.length > 0) {
      const newForm = defaultSchedule.map((day) => {
        const existing = doctorWithSchedule.schedules.find(
          (s) => s.day_of_week === day.day_of_week
        );
        if (existing) {
          return {
            day_of_week: existing.day_of_week,
            start_time: existing.start_time.slice(0, 5),
            end_time: existing.end_time.slice(0, 5),
            is_off_day: existing.is_off_day ?? false,
          };
        }
        return day;
      });
      setScheduleForm(newForm);
    } else if (selectedDoctorId) {
      setScheduleForm(defaultSchedule);
    }
  }, [doctorWithSchedule, selectedDoctorId]);

  const handleDoctorChange = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
  };

  const handleScheduleChange = (
    dayIndex: number,
    field: keyof ScheduleFormItem,
    value: string | boolean
  ) => {
    setScheduleForm((prev) =>
      prev.map((item) =>
        item.day_of_week === dayIndex ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSave = async () => {
    if (!selectedDoctorId) return;

    const schedulesToSave = scheduleForm.map((s) => ({
      doctor_id: selectedDoctorId,
      day_of_week: s.day_of_week,
      start_time: s.start_time,
      end_time: s.end_time,
      is_off_day: s.is_off_day,
    }));

    await upsertSchedules.mutateAsync({
      doctorId: selectedDoctorId,
      schedules: schedulesToSave,
    });
  };

  const selectedDoctor = doctors?.find((d) => d.id === selectedDoctorId);
  const workingDays = scheduleForm.filter((s) => !s.is_off_day).length;

  // Check availability status
  const hasWhatsApp = selectedDoctor?.whatsapp_number ? true : false;
  const hasSchedule = doctorWithSchedule?.schedules && doctorWithSchedule.schedules.length > 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">সময়সূচী ম্যানেজমেন্ট</h2>
        <p className="text-muted-foreground">
          ডাক্তারদের পরামর্শের সময় এবং উপলব্ধতা পরিচালনা করুন
        </p>
      </div>

      {/* Doctor Selection Card */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-secondary">
            <Users className="h-5 w-5" />
            ডাক্তার নির্বাচন করুন
          </CardTitle>
          <CardDescription>সময়সূচী দেখতে বা সম্পাদনা করতে একজন ডাক্তার নির্বাচন করুন</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
            <div className="w-full sm:max-w-sm space-y-2">
              <Label htmlFor="doctor-select">ডাক্তার</Label>
              <Select value={selectedDoctorId} onValueChange={handleDoctorChange}>
                <SelectTrigger id="doctor-select">
                  <SelectValue placeholder="সময়সূচী সম্পাদনা করতে ডাক্তার নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {doctorsLoading ? (
                    <SelectItem value="loading" disabled>
                      লোড হচ্ছে...
                    </SelectItem>
                  ) : doctors?.length === 0 ? (
                    <SelectItem value="empty" disabled>
                      কোনো ডাক্তার পাওয়া যায়নি
                    </SelectItem>
                  ) : (
                    doctors?.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id}>
                        {doctor.name} - {doctor.specialization}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            
            {selectedDoctor && (
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="bg-secondary/10 text-secondary border-0">
                  {selectedDoctor.branch_name}
                </Badge>
                <Badge variant="outline" className="text-primary">
                  {workingDays} কার্যদিবস
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Availability Test Card */}
      {selectedDoctorId && selectedDoctor && (
        <Card className="border border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-secondary">
              <CheckCircle2 className="h-5 w-5" />
              উপলব্ধতা পরীক্ষা
            </CardTitle>
            <CardDescription>
              ডাক্তার বুকিংয়ের জন্য প্রস্তুত কিনা তা পরীক্ষা করুন
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* WhatsApp Status */}
              <div className={cn(
                "p-4 rounded-lg border",
                hasWhatsApp ? "bg-whatsapp/5 border-whatsapp/20" : "bg-destructive/5 border-destructive/20"
              )}>
                <div className="flex items-center gap-3">
                  {hasWhatsApp ? (
                    <CheckCircle2 className="h-6 w-6 text-whatsapp" />
                  ) : (
                    <XCircle className="h-6 w-6 text-destructive" />
                  )}
                  <div>
                    <p className="font-medium">হোয়াটস্যাপ নম্বর</p>
                    <p className="text-sm text-muted-foreground">
                      {hasWhatsApp ? selectedDoctor.whatsapp_number : "সেট করা হয়নি"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Schedule Status */}
              <div className={cn(
                "p-4 rounded-lg border",
                hasSchedule ? "bg-secondary/5 border-secondary/20" : "bg-primary/5 border-primary/20"
              )}>
                <div className="flex items-center gap-3">
                  {hasSchedule ? (
                    <CheckCircle2 className="h-6 w-6 text-secondary" />
                  ) : (
                    <Clock className="h-6 w-6 text-primary" />
                  )}
                  <div>
                    <p className="font-medium">সময়সূচী</p>
                    <p className="text-sm text-muted-foreground">
                      {hasSchedule ? `${workingDays} দিন সেট করা হয়েছে` : "এখনও সেট করা হয়নি"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Test Booking */}
              <div className="p-4 rounded-lg border bg-muted/50">
                <div className="flex items-center gap-3">
                  <ExternalLink className="h-6 w-6 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="font-medium">বুকিং পরীক্ষা করুন</p>
                    <p className="text-sm text-muted-foreground">
                      হোয়াটস্যাপ লিংক পরীক্ষা করুন
                    </p>
                  </div>
                </div>
                {hasWhatsApp && (
                  <Button
                    variant="whatsapp"
                    size="sm"
                    className="w-full mt-3"
                    asChild
                  >
                    <a
                      href={generateWhatsAppLink(selectedDoctor.name, selectedDoctor.whatsapp_number)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      হোয়াটস্যাপে টেস্ট করুন
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Schedule Editor */}
      {selectedDoctorId && (
        <Card className="border border-border/50 shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg text-secondary">
                <Calendar className="h-5 w-5" />
                সাপ্তাহিক সময়সূচী
              </CardTitle>
              <CardDescription>
                সপ্তাহের প্রতিটি দিনের জন্য কাজের সময় নির্ধারণ করুন
              </CardDescription>
            </div>
            <Button 
              onClick={handleSave} 
              disabled={upsertSchedules.isPending}
              variant="teal"
              className="w-full sm:w-auto"
            >
              {upsertSchedules.isPending ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              সময়সূচী সংরক্ষণ করুন
            </Button>
          </CardHeader>
          <CardContent>
            {scheduleLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-secondary" />
              </div>
            ) : (
              <div className="space-y-3">
                {scheduleForm.map((schedule) => (
                  <div
                    key={schedule.day_of_week}
                    className={cn(
                      "flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl transition-colors",
                      schedule.is_off_day 
                        ? "bg-muted/50" 
                        : "bg-secondary/5 border border-secondary/20"
                    )}
                  >
                    {/* Day Name */}
                    <div className="w-full md:w-28 flex items-center justify-between md:block">
                      <div>
                        <span className={cn(
                          "font-semibold block",
                          schedule.is_off_day ? "text-muted-foreground" : "text-foreground"
                        )}>
                          {DAYS_OF_WEEK[schedule.day_of_week]}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {DAYS_OF_WEEK_EN[schedule.day_of_week]}
                        </span>
                      </div>
                      
                      {/* Mobile Toggle */}
                      <div className="flex items-center gap-2 md:hidden">
                        <Switch
                          checked={!schedule.is_off_day}
                          onCheckedChange={(checked) =>
                            handleScheduleChange(schedule.day_of_week, "is_off_day", !checked)
                          }
                        />
                        <span className="text-sm text-muted-foreground">
                          {schedule.is_off_day ? "বন্ধ" : "চালু"}
                        </span>
                      </div>
                    </div>

                    {/* Desktop Toggle */}
                    <div className="hidden md:flex items-center gap-2 w-24">
                      <Switch
                        checked={!schedule.is_off_day}
                        onCheckedChange={(checked) =>
                          handleScheduleChange(schedule.day_of_week, "is_off_day", !checked)
                        }
                      />
                      <Label className="text-sm text-muted-foreground">
                        {schedule.is_off_day ? "বন্ধ" : "কার্যকর"}
                      </Label>
                    </div>

                    {/* Time Inputs */}
                    {!schedule.is_off_day && (
                      <div className="flex items-center gap-3 flex-1">
                        <div className="flex-1 space-y-1">
                          <Label className="text-xs text-muted-foreground">শুরুর সময়</Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="time"
                              value={schedule.start_time}
                              onChange={(e) =>
                                handleScheduleChange(
                                  schedule.day_of_week,
                                  "start_time",
                                  e.target.value
                                )
                              }
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <span className="mt-6 text-muted-foreground">→</span>
                        <div className="flex-1 space-y-1">
                          <Label className="text-xs text-muted-foreground">শেষের সময়</Label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              type="time"
                              value={schedule.end_time}
                              onChange={(e) =>
                                handleScheduleChange(
                                  schedule.day_of_week,
                                  "end_time",
                                  e.target.value
                                )
                              }
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Off Day Badge */}
                    {schedule.is_off_day && (
                      <div className="flex-1 flex items-center">
                        <Badge variant="secondary" className="bg-muted text-muted-foreground">
                          ছুটির দিন
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!selectedDoctorId && (
        <Card className="border border-border/50 shadow-sm">
          <CardContent className="py-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-1">একজন ডাক্তার নির্বাচন করুন</h3>
            <p className="text-muted-foreground text-sm">
              তাদের সময়সূচী পরিচালনা করতে উপরের ড্রপডাউন থেকে একজন ডাক্তার নির্বাচন করুন
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminSchedules;
