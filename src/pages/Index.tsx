import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { FeaturedDoctors } from "@/components/home/FeaturedDoctors";
import { Testimonials } from "@/components/home/Testimonials";
import { ScheduleSection } from "@/components/home/ScheduleSection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedDoctors />
      <Testimonials />
      <ScheduleSection />
    </Layout>
  );
};

export default Index;
