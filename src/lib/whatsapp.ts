import { HOSPITAL_CONFIG } from "./constants";

export function generateWhatsAppLink(
  doctorName: string,
  whatsappNumber?: string | null
): string {
  const number = whatsappNumber || HOSPITAL_CONFIG.mainWhatsAppNumber;
  // Remove any non-digit characters from the number
  const cleanNumber = number.replace(/\D/g, "");
  
  const message = `Hello, I would like to book an appointment with ${doctorName}`;
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
