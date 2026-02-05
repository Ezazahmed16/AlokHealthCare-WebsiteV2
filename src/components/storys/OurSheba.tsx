const OurSheba = () => {
    return (
        <div className="w-full flex flex-col lg:flex-row bg-[#F3F4F6] min-h-[500px]">
            
            {/* Text Section */}
            <div className="w-full lg:w-2/3 flex flex-col justify-center p-8 lg:p-24 bg-white">
                <h2 className="text-[#005A92] text-2xl md:text-3xl lg:text-5xl font-bold mb-6">
                    আমাদের সেবা ও মান
                </h2>
                <h3 className="text-[#424344] text-base md:text-lg mb-8 max-w-xl leading-relaxed">
                    আমরা বিশ্বাস করি যে প্রতিটি রোগীই বিশেষ এবং তাদের জন্য বিশেষ যত্ন প্রয়োজন। আমাদের বিশেষত্ব:
                </h3>
                
                <div className="space-y-4">
                    {["আধুনিক চিকিৎসা প্রযুক্তি", "অভিজ্ঞ ডাক্তার ও পেশাদার কর্মী", "দ্রুত এবং নির্ভুল ডায়াগনস্টিক রিপোর্ট", "রোগীর প্রয়োজনই আমাদের প্রথম অগ্রাধিকার"].map((text, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="bg-[#00AEEF] rounded-full p-1">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-[#424344] font-medium text-md lg:text-lg">{text}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Image Section with Overlap Styling */}
            <div className="w-full lg:w-1/3 bg-[#005A92] relative flex items-center justify-center min-h-[300px] lg:min-h-full">
                <div className="relative lg:absolute lg:left-[-150px] w-[90%] lg:w-[450px] z-20">
                    <img 
                        src="/Story_Service.png" 
                        alt="Our Services" 
                        className="rounded-2xl shadow-2xl border-4 border-white object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default OurSheba;