import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { Loader2, Lock, Mail, ArrowLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { HOSPITAL_CONFIG } from "@/lib/constants";

const signInSchema = z.object({
  email: z.string().trim().email("সঠিক ইমেইল ঠিকানা দিন").max(255, "ইমেইল খুব বড়"),
  password: z.string().min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"),
});

const Auth = () => {
  const navigate = useNavigate();
  const { user, isAdmin, signIn, loading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signInErrors, setSignInErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate("/admin", { replace: true });
    }
  }, [user, isAdmin, loading, navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignInErrors({});

    const result = signInSchema.safeParse(signInData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0] as string] = err.message;
        }
      });
      setSignInErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const { error } = await signIn(signInData.email.trim(), signInData.password);
    setIsSubmitting(false);

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        toast.error("ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
      } else {
        toast.error(error.message);
      }
    } else {
      toast.success("সফলভাবে লগইন হয়েছে!");
      navigate("/admin", { replace: true });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
          <p className="text-muted-foreground text-sm">লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-secondary via-secondary/90 to-teal-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" />
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-secondary-foreground">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">হোম পেজে ফিরুন</span>
            </Link>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <Heart className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{HOSPITAL_CONFIG.name}</h1>
                <p className="text-secondary-foreground/70 text-sm">অ্যাডমিন পোর্টাল</p>
              </div>
            </div>
            
            <div className="space-y-4 max-w-md">
              <h2 className="text-3xl font-bold leading-tight">
                আপনার হেলথকেয়ার ম্যানেজমেন্ট সিস্টেমে স্বাগতম
              </h2>
              <p className="text-secondary-foreground/70 leading-relaxed">
                ডাক্তার ম্যানেজমেন্ট, সময়সূচী নিয়ন্ত্রণ এবং রোগীদের সেবা প্রদানের জন্য একটি সম্পূর্ণ প্ল্যাটফর্ম।
              </p>
            </div>
          </div>
          
          <div className="text-sm text-secondary-foreground/50">
            © {new Date().getFullYear()} {HOSPITAL_CONFIG.name}. সর্বস্বত্ব সংরক্ষিত।
          </div>
        </div>
        
        {/* Decorative circles */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-primary/10" />
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-teal-light/10" />
      </div>
      
      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Header */}
          <div className="lg:hidden text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">হোম পেজে ফিরুন</span>
            </Link>
            <div className="flex justify-center">
              <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <Heart className="h-7 w-7 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-foreground">{HOSPITAL_CONFIG.name}</h1>
          </div>
          
          {/* Form Header */}
          <div className="text-center lg:text-left space-y-2">
            <h2 className="text-2xl font-bold text-foreground">অ্যাডমিন লগইন</h2>
            <p className="text-muted-foreground">
              ড্যাশবোর্ডে প্রবেশ করতে আপনার তথ্য দিন
            </p>
          </div>
          
          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                ইমেইল ঠিকানা
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={signInData.email}
                  onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                  className="h-12 pl-11 bg-muted/50 border-border focus:bg-background transition-colors"
                  autoComplete="email"
                />
              </div>
              {signInErrors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                  {signInErrors.email}
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                পাসওয়ার্ড
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={signInData.password}
                  onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                  className="h-12 pl-11 bg-muted/50 border-border focus:bg-background transition-colors"
                  autoComplete="current-password"
                />
              </div>
              {signInErrors.password && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-destructive" />
                  {signInErrors.password}
                </p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 text-base font-semibold bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  লগইন হচ্ছে...
                </>
              ) : (
                "ড্যাশবোর্ডে প্রবেশ করুন"
              )}
            </Button>
          </form>
          
          {/* Footer Info */}
          <div className="pt-6 border-t border-border">
            <div className="bg-muted/50 rounded-xl p-4 text-center">
              <p className="text-sm text-muted-foreground">
                🔒 শুধুমাত্র অনুমোদিত অ্যাডমিনদের জন্য।
                <br />
                সাহায্যের জন্য IT বিভাগে যোগাযোগ করুন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
