import {
  Heart,
  Brain,
  Bone,
  Baby,
  Eye,
  Stethoscope,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Heart,
    title: "Cardiology",
    description: "Expert heart care with advanced diagnostics and treatment options.",
  },
  {
    icon: Brain,
    title: "Neurology",
    description: "Comprehensive care for brain and nervous system conditions.",
  },
  {
    icon: Bone,
    title: "Orthopedics",
    description: "Specialized treatment for bone, joint, and muscle disorders.",
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description: "Compassionate healthcare for infants, children, and adolescents.",
  },
  {
    icon: Eye,
    title: "Ophthalmology",
    description: "Complete eye care from routine exams to complex surgeries.",
  },
  {
    icon: Stethoscope,
    title: "General Medicine",
    description: "Comprehensive primary care for all your health needs.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-16 lg:py-24 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Our Services</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            We offer a wide range of medical services to meet your healthcare needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
          {services.map((service) => (
            <Card
              key={service.title}
              className="group border-border/50 hover:border-primary/30 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
