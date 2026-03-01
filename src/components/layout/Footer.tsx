import { HOSPITAL_CONFIG } from "@/lib/constants";
import { Link } from "react-router-dom";
import { FaFacebook, FaWhatsapp, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  // WhatsApp link generation logic
  const whatsappNumber = HOSPITAL_CONFIG.phone.replace(/[^0-9]/g, '');
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const facebookLink = "https://www.facebook.com/alok.healthcare.diagnostic.pirojpur/";

  return (
    <footer className="bg-[#001522] text-white pt-12 pb-6 custom-bangla-font">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-start">
          
          {/* Left Section: Logo & About */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <img
              src="/logo.png"
              alt="Alok Health Care Logo"
              className="w-[150px] md:w-[180px] h-auto object-contain"
            />
            <p className="text-[#F9FAFB] leading-relaxed text-center md:text-start max-w-[320px]">
              আলোক হেলথ কেয়ার হল একটি আধুনিক চিকিৎসা প্রতিষ্ঠান যা সর্বোচ্চ মানের স্বাস্থ্যসেবা নিশ্চিত করতে প্রতিজ্ঞাবদ্ধ। আপনার সুস্থতার জন্য আমরা আছি পাশে।
            </p>
            
            {/* Social Icons - Shown on Desktop */}
            <div className="hidden md:flex items-center gap-4 pt-4">
              <a 
                href={facebookLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#00AEEF1A] p-2.5 rounded-lg text-[#00AEEF] hover:bg-[#00AEEF] hover:text-white transition-all"
              >
                <FaFacebook size={22} />
              </a>
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#00AEEF1A] p-2.5 rounded-lg text-[#00AEEF] hover:bg-[#25D366] hover:text-white transition-all"
              >
                <FaWhatsapp size={22} />
              </a>
              {/* <a href="#" className="bg-[#00AEEF1A] p-2.5 rounded-lg text-[#00AEEF] hover:bg-[#00AEEF] hover:text-white transition-all">
                <FaInstagram size={22} />
              </a> */}
            </div>
          </div>

          {/* Middle Section: Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="hidden md:block text-transparent mb-6 pointer-events-none">Links</h3>
            <ul className="space-y-4 text-center md:text-start text-[16px]">
              <li><Link to="/" className="hover:text-[#00AEEF] transition-colors">হোম</Link></li>
              <li><Link to="/ourstorys" className="hover:text-[#00AEEF] transition-colors">আমাদের গল্প</Link></li>
              <li><Link to="/doctors" className="hover:text-[#00AEEF] transition-colors">ডাক্তারের সময়সূচী</Link></li>
              <li><Link to="/services" className="hover:text-[#00AEEF] transition-colors">পরামর্শ নিন</Link></li>
              <li><Link to="/contact" className="hover:text-[#00AEEF] transition-colors">যোগাযোগ করুন</Link></li>
            </ul>
          </div>

          {/* Right Section: Contact Info & CTA */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <div className="space-y-5 w-full">
              {/* Address */}
              <div className="flex items-start justify-center md:justify-start gap-3">
                <div className="text-[#00AEEF] mt-1 shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <p className="text-sm md:text-base text-center md:text-start max-w-[250px]">
                  {HOSPITAL_CONFIG.address}
                </p>
              </div>
              {/* Phone */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="text-[#00AEEF] shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </div>
                <p className="text-sm md:text-base font-sans">{HOSPITAL_CONFIG.phone}</p>
              </div>
              {/* Email */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <div className="text-[#00AEEF] shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <p className="text-sm md:text-base font-sans">{HOSPITAL_CONFIG.email}</p>
              </div>
            </div>

            {/* CTA Button */}
            <button className="bg-[#FFDE24] text-[#001522] font-bold px-8 py-3.5 rounded-full hover:bg-yellow-400 transition-all shadow-lg text-sm md:text-base active:scale-95">
              সরাসরি যোগাযোগ করুন
            </button>

            {/* Social Icons - Shown on Mobile */}
            <div className="flex md:hidden items-center gap-8 pt-6">
              <a 
                href={facebookLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#00AEEF] transition-all transform active:scale-110"
              >
                <FaFacebook size={30} />
              </a>
              <a 
                href={whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#25D366] transition-all transform active:scale-110"
              >
                <FaWhatsapp size={30} />
              </a>
              {/* <a href="#" className="text-white hover:text-[#00AEEF] transition-all">
                <FaInstagram size={30} />
              </a> */}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section */}
        <div className="mt-16 pt-6 border-t border-[#005A9266]">
          <p className="text-center text-[#F9FAFB] text-[10px] md:text-sm tracking-wide">
            ২০২৫ আলোক হেলথ কেয়ার। আপনার স্বাস্থ্যই আমাদের অগ্রাধিকার। সকল অধিকার সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};