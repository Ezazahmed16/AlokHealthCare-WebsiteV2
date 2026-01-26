
const ContactForm = () => {
    return (
        <div className="bg-[#F9FAFB] ">
            <div className="g-[#F3F3F3]">
                <div className="block md:hidden text-center">
                    <h1 className='text-[#005A92] text-xl md:text-4xl pb-8 font-bold'>যোগাযোগ করুন</h1>
                    <p className='text-[#424344] text-sm md:text-lg pb-5'>
                        আপনার যেকোনো স্বাস্থ্য সংক্রান্ত প্রশ্ন, পরীক্ষা সংক্রান্ত তথ্য, বা অ্যাপয়েন্টমেন্ট
                        বুকিং-এর জন্য  আমাদের  সাথে  যোগাযোগ  করুন| আমরা  সবসময়  আপনার
                        সেবায় প্রস্তুত|
                    </p>
                </div>
            </div>
            <div className="p-10">
                <form action="">
                    <input type="text" placeholder="আপনার নাম" className="input input-lg w-full bg-[#F3F3F3] text-[#424344] text-sm font-bold rounded mb-5 border-2 p-2" style={{ borderBottom: '2px solid var(--Light, #D8D8D8' }} />
                    <input type="text" placeholder="আপনার মোবাইল নম্বর" className="input input-lg w-full bg-[#F3F3F3] text-[#424344] text-sm font-bold rounded mb-5 border-2 p-2" style={{ borderBottom: '2px solid var(--Light, #D8D8D8' }} />
                    <input type="email" placeholder="ই-মেইল" className="input input-lg w-full bg-[#F3F3F3] text-[#424344] text-sm font-bold rounded mb-5 border-2 p-2" style={{ borderBottom: '2px solid var(--Light, #D8D8D8' }} />
                    <textarea placeholder="আপনার বার্তা..." className="input input-lg w-full bg-[#F3F3F3] text-[#424344] text-sm font-bold rounded mb-10 min-h-[123px] border-2 p-2" style={{ borderBottom: '2px solid var(--Light, #D8D8D8' }} />

                    <div className="w-full flex justify-center md:justify-start">
                        <button className="btn bg-[#FFDE24] rounded-full border-0 p-2">
                            <span className="custom-bangla-font text-[#001522] px-4 md:px-5">
                                পাঠান
                            </span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default ContactForm