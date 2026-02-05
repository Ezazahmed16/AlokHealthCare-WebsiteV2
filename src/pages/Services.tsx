import { Layout } from "@/components/layout/Layout";
import testIcon4 from "/public/test_icon4.png";
import testIcon2 from "/public/test_icon2.png";
import testIcon1 from "/public/test_icon1.png";
import testIcon3 from "/public/test_icon3.png";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Clock, FileText } from "lucide-react";

// Test categories with icons
const categories = [
  { id: "blood", label: "রক্ত পরীক্ষা", icon: testIcon4, bgColor: "bg-red-100", iconColor: "text-red-500" },
  { id: "imaging", label: "এক্স-রে ও ইমেজিং", icon: testIcon1, bgColor: "bg-blue-100", iconColor: "text-blue-500" },
  { id: "cardio", label: "হৃদরোগ পরীক্ষা", icon: testIcon2, bgColor: "bg-pink-100", iconColor: "text-pink-500" },
  { id: "infection", label: "সংক্রমণ ও ভাইরাস পরীক্ষা", icon: testIcon3, bgColor: "bg-amber-100", iconColor: "text-amber-500" },
];

// Test data organized by category
const testsData = {
  blood: [
    { name: "CBC", price: "৫০০ টাকা", preparation: "খালি পেটে প্রয়োজন নেই", reportTime: "২৪ ঘণ্টা" },
    { name: "Lipid Profile", price: "১০০০ টাকা", preparation: "৮-১২ ঘণ্টা খালি পেটে থাকুন", reportTime: "২৪ ঘণ্টা" },
    { name: "Fasting Blood Sugar (FBS)", price: "৩০০ টাকা", preparation: "৮ ঘণ্টা খালি পেটে থাকুন", reportTime: "১২ ঘণ্টা" },
    { name: "HbA1c (Diabetes Test)", price: "৭০০ টাকা", preparation: "খালি পেটে প্রয়োজন নেই", reportTime: "২৪ ঘণ্টা" },
    { name: "Thyroid Profile (T3, T4, TSH)", price: "১২০০ টাকা", preparation: "সকাল বেলা পরীক্ষা করা ভালো", reportTime: "২৪-৪৮ ঘণ্টা" },
  ],
  imaging: [
    { name: "X-ray (Chest PA View)", price: "৫০০ টাকা", preparation: "বিশেষ প্রস্তুতি নেই", reportTime: "৩০ মিনিট" },
    { name: "Ultrasound (Abdomen & Pelvis)", price: "১২০০ টাকা", preparation: "৪ ঘণ্টা পানি ছাড়া থাকুন", reportTime: "১ ঘণ্টা" },
    { name: "Echocardiogram (ECHO)", price: "২৫০০ টাকা", preparation: "খালি পেটে প্রয়োজন নেই", reportTime: "২৪ ঘণ্টা" },
    { name: "CT Scan (Brain)", price: "৪০০০ টাকা", preparation: "ডাক্তার নির্দেশ মতো প্রস্তুত হন", reportTime: "২৪ ঘণ্টা" },
    { name: "MRI (Lumbar Spine)", price: "৭০০০ টাকা", preparation: "ধাতব বস্তু খুলে রাখুন", reportTime: "২৪-৪৮ ঘণ্টা" },
  ],
  cardio: [
    { name: "ECG (Electrocardiogram)", price: "৩০০ টাকা", preparation: "খালি পেটে প্রয়োজন নেই", reportTime: "১৫ মিনিট" },
    { name: "Echocardiography (ECHO)", price: "২৫০০ টাকা", preparation: "খালি পেটে প্রয়োজন নেই", reportTime: "২৪ ঘণ্টা" },
    { name: "TMT (Treadmill Test)", price: "৩০০০ টাকা", preparation: "আরামদায়ক পোশাক পরুন", reportTime: "১ ঘণ্টা" },
    { name: "Holter Monitor (24h ECG)", price: "৪০০০ টাকা", preparation: "ঢিলে আরামদায়ক পোশাক পরুন", reportTime: "২৪-৪৮ ঘণ্টা" },
    { name: "Coronary Angiogram", price: "১৫০০০ টাকা", preparation: "ডাক্তার নির্দেশ মতো প্রস্তুত হন", reportTime: "২৪ ঘণ্টা" },
  ],
  infection: [
    { name: "COVID-19 RT-PCR", price: "২০০০ টাকা", preparation: "৪ ঘণ্টা খাবার না খেয়ে আসুন", reportTime: "২৪-৪৮ ঘণ্টা" },
    { name: "Dengue NS1 Antigen", price: "১০০০ টাকা", preparation: "খালি পেটে প্রয়োজন নেই", reportTime: "২-৪ ঘণ্টা" },
    { name: "Typhoid IgM Test", price: "১২০০ টাকা", preparation: "৪ ঘণ্টা পানি ছাড়া থাকুন", reportTime: "২৪ ঘণ্টা" },
    { name: "Hepatitis B (HBsAg)", price: "৫০০ টাকা", preparation: "খালি পেটে প্রয়োজন নেই", reportTime: "২৪ ঘণ্টা" },
    { name: "HIV 1 & 2 Antibody Test", price: "৮০০ টাকা", preparation: "ডাক্তার নির্দেশ মতো প্রস্তুত হন", reportTime: "২৪-৪৮ ঘণ্টা" },
  ],
};

// Test table component
const TestTable = ({ categoryId, categoryLabel }: { categoryId: string; categoryLabel: string }) => {
  const tests = testsData[categoryId as keyof typeof testsData];

  return (
    <div className="mb-12">
      <h2 className="text-xl md:text-2xl font-bold text-secondary text-center mb-6">
        {categoryLabel}
      </h2>
      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-bold text-foreground min-w-[180px]">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    পরীক্ষার নাম
                  </div>
                </TableHead>
                <TableHead className="font-bold text-foreground">মূল্য (টাকা)</TableHead>
                <TableHead className="font-bold text-foreground min-w-[200px]">প্রস্তুতি</TableHead>
                <TableHead className="font-bold text-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    রিপোর্ট সময়
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((test, index) => (
                <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium text-foreground">{test.name}</TableCell>
                  <TableCell className="text-muted-foreground">{test.price}</TableCell>
                  <TableCell className="text-muted-foreground">{test.preparation}</TableCell>
                  <TableCell className="text-muted-foreground">{test.reportTime}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-secondary overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90 min-h-full w-full"
          style={{
            backgroundImage: "url('/test_banner.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b" />

        <div className="container relative z-10 py-12 md:py-20 text-[###F9FAFB]">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 mx-auto text-center">
            নির্ভুল ও সাশ্রয়ী স্বাস্থ্য পরীক্ষা করুন!
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            আধুনিক প্রযুক্তি ও অভিজ্ঞ টেকনিশিয়ানদের মাধ্যমে দ্রুত ও নির্ভরযোগ্য রিপোর্ট পান
          </p>
        </div>
      </section>

      {/* Category Icons Section */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {categories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:shadow-md transition-all"
              >
                <div className={`h-18 w-18 rounded-xl ${cat.bgColor} flex items-center justify-center overflow-hidden p-2`}>
                  <img
                    src={cat.icon}
                    alt={cat.label}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-sm font-medium text-foreground text-center">{cat.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* All Test Tables */}
      <section className="py-24 md:py-16">
        <div className="container">
          <div id="blood">
            <TestTable categoryId="blood" categoryLabel="রক্ত পরীক্ষা" />
          </div>
          <div id="imaging">
            <TestTable categoryId="imaging" categoryLabel="এক্স-রে ও ইমেজিং" />
          </div>
          <div id="cardio">
            <TestTable categoryId="cardio" categoryLabel="হৃদরোগ পরীক্ষা" />
          </div>
          <div id="infection">
            <TestTable categoryId="infection" categoryLabel="সংক্রমণ ও ভাইরাস পরীক্ষা" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
