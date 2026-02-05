import CommonButton from "@/lib/CommonButton"

const BookAppointment = () => {
    return (
        <div className='bg-[#F3F3F3]'>
            <div className="container mx-auto py-20 px-4"> 
                <div
                    className="hero h-[502px] max-w-6xl mx-auto relative rounded-xl overflow-hidden"
                    style={{
                        backgroundImage: "url('/story_appoinment.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}>
                    
                    {/* Overlay ensures text is readable against the image */}
                    <div className="hero-overlay bg-black/50 absolute inset-0"></div>
                    
                    {/* Centering Logic Applied Here */}
                    <div className="hero-content relative z-10 flex flex-col items-center justify-center text-center h-full w-full">
                        <div className="max-w-2xl custom-bangla-font flex flex-col items-center">
                            <h1 className="mb-5 text-2xl md:text-4xl lg:text-5xl font-bold text-[#F9FAFB]">
                                আজই আপনার অ্যাপয়েন্টমেন্ট নিন
                            </h1>
                            <p className="mb-8 text-sm md:text-lg text-[#F9FAFB] leading-relaxed">
                                আমরা আধুনিক প্রযুক্তি এবং অভিজ্ঞ চিকিৎসকদের সাহায্যে দ্রুত এবং সহজ প্রক্রিয়ায় উন্নত সেবা প্রদান করি,
                                যাতে আপনি দ্রুত এবং সঠিক চিকিৎসা লাভ করতে পারেন।
                            </p>
                            
                            {/* Centering the button container */}
                            <div className="flex justify-center">
                                <CommonButton>
                                    অ্যাপয়েন্টমেন্ট নিন
                                </CommonButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookAppointment