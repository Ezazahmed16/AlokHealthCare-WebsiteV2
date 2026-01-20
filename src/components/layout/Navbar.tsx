import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  // Nav Links matching your design text
  const navLinks = [
    { href: "/", label: "হোম" },
    { href: "/ourstorys", label: "আমাদের গল্প" },
    { href: "/doctors", label: "ডাক্তারের সময়সূচী" },
    { href: "/services", label: "পরীক্ষার খরচ ও বিস্তারিত" },
    { href: "/contact", label: "যোগাযোগ করুন" },
  ];

  return (
    <nav className="bg-[#00AEEF] text-[#F9FAFB] custom-bangla-font sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          
          <div className="md:hidden">
            <Link to="/contact">
              <button className="bg-[#001522] text-[#F9FAFB] rounded-full px-4 py-2 text-[12px] custom-bangla-font">
                আজই অ্যাপয়েন্টমেন্ট নিন.
              </button>
            </Link>
          </div>

          <div className="hidden lg:flex w-full justify-center">
            <ul className="flex gap-8 text-lg font-medium">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className={cn(
                      "hover:text-[#FFDE24] transition-colors pb-1 border-b-2 border-transparent hover:border-[#FFDE24]",
                      location.pathname === link.href && "text-[#FFDE24] border-[#FFDE24]"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Auth/Admin Buttons (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 absolute right-4 top-1/2 -translate-y-1/2">
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin" className="flex items-center text-white hover:text-[#FFDE24]">
                    <Shield className="h-4 w-4 mr-1" />
                    অ্যাডমিন
                  </Link>
                )}
                <button 
                  onClick={handleSignOut}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-1 rounded-full text-sm transition"
                >
                  সাইন আউট
                </button>
              </>
            ) : (
              <Link to="/auth">
                <button className="bg-[#001522] hover:bg-black text-white px-6 py-2 rounded-full font-bold transition shadow-lg">
                  লগইন
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button (Right Side) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-8 w-8 text-white" />
              ) : (
                // Custom Hamburger Icon from your design
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="20" fill="#FFDE24" />
                  <path d="M13 18C11.9 18 11 18.9 11 20C11 21.1 11.9 22 13 22C14.1 22 15 21.1 15 20C15 18.9 14.1 18 13 18Z" stroke="#001522" strokeWidth="1.5" />
                  <path d="M27 18C25.9 18 25 18.9 25 20C25 21.1 25.9 22 27 22C28.1 22 29 21.1 29 20C29 18.9 28.1 18 27 18Z" stroke="#001522" strokeWidth="1.5" />
                  <path d="M20 18C18.9 18 18 18.9 18 20C18 21.1 18.9 22 20 22C21.1 22 22 21.1 22 20C22 18.9 21.1 18 20 18Z" stroke="#001522" strokeWidth="1.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#00AEEF] border-t border-white/20 animate-slide-in absolute w-full shadow-xl">
          <ul className="flex flex-col p-4 space-y-2 text-white">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-white/10 last:border-none">
                <Link
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 px-2 text-lg hover:bg-white/10 rounded transition"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            
            {/* Mobile Auth Actions */}
            <li className="pt-4 flex flex-col gap-3">
              {user ? (
                <>
                  {isAdmin && (
                    <Link 
                      to="/admin" 
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center bg-white/20 py-2 rounded text-white"
                    >
                      <Shield className="h-4 w-4 mr-2" /> অ্যাডমিন ড্যাশবোর্ড
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    className="w-full bg-red-500/80 py-2 rounded text-white font-bold"
                  >
                    সাইন আউট
                  </button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <button className="w-full bg-[#001522] py-3 rounded text-white font-bold">
                    লগইন করুন
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}