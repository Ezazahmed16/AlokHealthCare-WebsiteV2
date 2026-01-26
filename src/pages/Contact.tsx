import { Layout } from "@/components/layout/Layout";
import ContactForm from "@/components/contact/ContactForm.tsx";
import ContactDetails from "@/components/contact/ContactDetails.tsx";

const Contact = () => {

  return (
    <Layout>
      <div className='min-h-screen bg-[#F3F3F3] py-20'>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 justify-center items-start">

            <ContactForm />
            <ContactDetails />

        </div>
      </div>
    </Layout>
  );
};

export default Contact;
