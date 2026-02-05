import { Layout } from "@/components/layout/Layout"
import BookAppointment from "@/components/storys/BookAppointment"
import OurSheba from "@/components/storys/OurSheba"
import OurTarget from "@/components/storys/OurTarget"
import StoryBanner from "@/components/storys/StoryBanner"

const OurStory = () => {
    return (
        <div>
            <Layout>
                <div className="">
                    <div>
                        <StoryBanner />
                        <OurTarget />
                        <OurSheba />
                        <BookAppointment />
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default OurStory