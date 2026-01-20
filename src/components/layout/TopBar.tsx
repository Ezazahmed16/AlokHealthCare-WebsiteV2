import { Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { HOSPITAL_CONFIG } from "@/lib/constants";

export function TopBar() {
  return (
    <div className="bg-[#F3F3F3] py-3">
      <div className="container mx-auto flex justify-between md:justify-around items-center gap-4 px-4">
        
        {/* Left Section: Logo & Tagline */}
        <div className="flex flex-col justify-center">
          {/* Ensure /logo.png exists in your public folder */}
          <img 
            src="/logo.png" 
            alt="Logo" 
            className="w-[74px] md:w-[128px] h-auto object-contain" 
          />
          <p className="custom-bangla-font lg:text-xl md:text-sm text-xs text-[#424344] font-medium mt-1">
            হেলথ কেয়ার এন্ড ডায়াগনস্টিক সলিউশন
          </p>
        </div>

        {/* Middle Section: Contact Info */}
        <div className="flex flex-col md:flex-row justify-center items-end md:items-center gap-2 md:gap-8">
          
          {/* Phone */}
          <a 
            href={`tel:${HOSPITAL_CONFIG.phone}`} 
            className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
          >
            <Phone className="text-[#00AEEF] w-4 h-4 md:w-5 md:h-5" />
            <p className="text-sm md:text-lg custom-bangla-font text-[#424344] font-semibold">
              {HOSPITAL_CONFIG.phone}
            </p>
          </a>

          {/* Email */}
          <a 
            href={`mailto:${HOSPITAL_CONFIG.email}`} 
            className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
          >
            <Mail className="text-[#00AEEF] w-4 h-4 md:w-5 md:h-5" />
            <p className="text-sm md:text-lg text-[#424344]">
              {HOSPITAL_CONFIG.email}
            </p>
          </a>
        </div>

        {/* Right Section: Button (Hidden on Mobile) */}
        <div className="hidden md:flex">
          <Link to="/contact">
            <button className="bg-[#001522] hover:bg-[#0b2533] text-[#F9FAFB] rounded-full px-6 py-3 text-[16px] custom-bangla-font transition-all shadow-md hover:shadow-lg">
              আজই অ্যাপয়েন্টমেন্ট নিন
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}