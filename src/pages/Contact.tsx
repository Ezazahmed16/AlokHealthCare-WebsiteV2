import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HOSPITAL_CONFIG } from "@/lib/constants";
import { generateWhatsAppLink } from "@/lib/whatsapp";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: HOSPITAL_CONFIG.phone,
    href: `tel:${HOSPITAL_CONFIG.phone}`,
  },
  {
    icon: Mail,
    title: "Email",
    value: HOSPITAL_CONFIG.email,
    href: `mailto:${HOSPITAL_CONFIG.email}`,
  },
  {
    icon: MapPin,
    title: "Address",
    value: HOSPITAL_CONFIG.address,
    href: "#",
  },
  {
    icon: Clock,
    title: "Hours",
    value: "Mon - Sat: 8:00 AM - 9:00 PM",
    href: "#",
  },
];

const Contact = () => {
  const whatsappLink = generateWhatsAppLink("a doctor", HOSPITAL_CONFIG.mainWhatsAppNumber);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero py-12">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            Contact Us
          </h1>
          <p className="text-white/80 mt-4 max-w-2xl mx-auto">
            We're here to help. Reach out to us through any of the following channels.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((item) => (
              <Card key={item.title} className="border-border/50 shadow-card hover:shadow-card-hover transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  {item.href !== "#" ? (
                    <a
                      href={item.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-muted-foreground">{item.value}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="text-center bg-secondary/50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Quick Appointment Booking
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Skip the wait! Book your appointment instantly via WhatsApp. Our team will respond within minutes.
            </p>
            <Button variant="whatsapp" size="xl" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Message Us on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
