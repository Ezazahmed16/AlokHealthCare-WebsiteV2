import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Doctor } from "@/hooks/useDoctors";

interface DoctorCardProps {
  doctor: Doctor;
  isAvailableToday?: boolean;
}

export function DoctorCard({ doctor, isAvailableToday }: DoctorCardProps) {
  return (
    <Card className="group overflow-hidden border border-border/50 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-card">
      <Link to={`/doctors/${doctor.id}`}>
        <div className="aspect-[4/3] overflow-hidden bg-muted relative">
          {doctor.image_url ? (
            <img
              src={doctor.image_url}
              alt={doctor.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.querySelector('.fallback')?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-full h-full flex items-center justify-center bg-gradient-subtle ${doctor.image_url ? 'hidden' : ''} fallback`}>
            <span className="text-6xl font-bold text-secondary/20">
              {doctor.name.charAt(0)}
            </span>
          </div>
          {isAvailableToday !== undefined && (
            <Badge 
              variant={isAvailableToday ? "default" : "secondary"}
              className={`absolute top-2 right-2 text-xs ${
                isAvailableToday 
                  ? "bg-green-500 hover:bg-green-600 text-white" 
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isAvailableToday ? "আজ উপলব্ধ" : "আজ ছুটি"}
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4 space-y-3">
        <Link to={`/doctors/${doctor.id}`}>
          <h3 className="text-lg font-bold text-secondary hover:text-secondary/80 transition-colors line-clamp-1 text-center">
            {doctor.name}
          </h3>
        </Link>

        <div className="space-y-1.5 text-sm text-muted-foreground text-center">
          <p>
            <span className="font-medium">বিশেষত্ব:</span> {doctor.specialization}
          </p>
          <p>
            <span className="font-medium">যোগ্যতা:</span> {doctor.qualification}
          </p>
          <div className="flex items-center justify-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span>অবস্থান: {doctor.branch_name}</span>
          </div>
        </div>

        {/* Fixed: Centered the button using flex container */}
        <div className="block justify-center pt-2 ms-10">
          <Link 
            to={`/doctors/${doctor.id}`}
            className="inline-flex items-center gap-1 text-secondary hover:text-secondary/80 font-medium text-sm transition-colors group/link"
          >
            বিস্তারিত দেখুন
            <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}