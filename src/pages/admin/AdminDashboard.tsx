import { useEffect } from "react";
import { useNavigate, Link, Outlet, useLocation } from "react-router-dom";
import { Users, Calendar, LayoutDashboard, Loader2, ArrowLeft, LogOut, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { HOSPITAL_CONFIG } from "@/lib/constants";
import { toast } from "sonner";

const sidebarLinks = [
  { href: "/admin", label: "ওভারভিউ", labelEn: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/doctors", label: "ডাক্তার", labelEn: "Doctors", icon: Users },
  { href: "/admin/specializations", label: "বিশেষত্ব", labelEn: "Specializations", icon: Tag },
  { href: "/admin/schedules", label: "সময়সূচী", labelEn: "Schedules", icon: Calendar },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, loading, signOut } = useAuth();

  useEffect(() => {
    // Only redirect when loading is complete and user is definitely not an admin
    if (!loading) {
      if (!user) {
        navigate("/auth", { replace: true });
      } else if (!isAdmin) {
        toast.error("অ্যাক্সেস অস্বীকৃত। শুধুমাত্র অ্যাডমিনদের জন্য।");
        navigate("/", { replace: true });
      }
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-secondary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-secondary text-secondary-foreground">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">আ</span>
              </div>
              <span className="font-semibold hidden sm:inline-block">
                {HOSPITAL_CONFIG.name}
              </span>
            </Link>
            <div className="h-5 w-px bg-secondary-foreground/20 hidden sm:block" />
            <h1 className="text-sm font-medium opacity-80 hidden sm:block">অ্যাডমিন ড্যাশবোর্ড</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              className="text-secondary-foreground hover:bg-secondary-foreground/10"
            >
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">সাইটে ফিরুন</span>
              </Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSignOut}
              className="text-secondary-foreground hover:bg-secondary-foreground/10"
            >
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">সাইন আউট</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex w-60 flex-col border-r border-border min-h-[calc(100vh-3.5rem)] bg-card">
          <nav className="flex-1 p-4 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-3">
              ম্যানেজমেন্ট
            </p>
            {sidebarLinks.map((link) => {
              const isActive = link.exact
                ? location.pathname === link.href
                : location.pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
          </nav>
          
          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <div className="px-3 py-2 rounded-lg bg-muted">
              <p className="text-xs font-medium text-foreground truncate">{user.email}</p>
              <p className="text-xs text-muted-foreground">অ্যাডমিনিস্ট্রেটর</p>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-border bg-card p-2 z-50">
          <div className="flex justify-around">
            {sidebarLinks.map((link) => {
              const isActive = link.exact
                ? location.pathname === link.href
                : location.pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-lg text-xs font-medium transition-colors min-w-[60px]",
                    isActive
                      ? "text-secondary bg-secondary/10"
                      : "text-muted-foreground"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 pb-24 md:pb-6">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
