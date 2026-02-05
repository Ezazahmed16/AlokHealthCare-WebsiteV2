const StoryBanner = () => {
    return (
        <div
            className="hero min-h-[360px] md:min-h-[380px] relative flex items-center justify-center"
            style={{
                backgroundImage: "url('/story_banner.png')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="hero-overlay bg-opacity-60 absolute inset-0"></div>
            
            <div className="hero-content text-neutral-content text-center custom-bangla-font z-10">
                <div className="max-w-5xl">
                    <h1 className="text-xl md:text-4xl lg:text-6xl font-bold text-[#F9FAFB]">
                        আপনার স্বাস্থ্য, আমাদের অঙ্গীকার
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default StoryBanner;