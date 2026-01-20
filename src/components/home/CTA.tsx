import { Link } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HOSPITAL_CONFIG } from "@/lib/constants";
import { generateWhatsAppLink } from "@/lib/whatsapp";

export function CTA() {
  const whatsappLink = generateWhatsAppLink("a doctor", HOSPITAL_CONFIG.mainWhatsAppNumber);

  return (
    <section className="py-16 lg:py-24 bg-gradient-hero">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Book Your Appointment?
          </h2>
          <p className="text-lg text-white/80">
            Connect with our expert doctors instantly via WhatsApp or call us directly.
            Your health is our priority.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="bg-whatsapp hover:bg-whatsapp-hover" asChild>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" />
                Book via WhatsApp
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href={`tel:${HOSPITAL_CONFIG.phone}`}>
                <Phone className="h-5 w-5" />
                Call: {HOSPITAL_CONFIG.phone}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
