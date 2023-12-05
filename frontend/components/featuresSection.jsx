import FeaturesCardComponent from "./featuresCard";
import collabIcon from "../public/icons/collaboration.svg";
import liveUpdateIcon from "../public/icons/live-update.svg";
import endlessIcon from "../public/icons/endlessIcon.svg";


export default function FeaturesSection() {

    const desc1 = "Work together in real-time, whether you're in the same room or on different continents. Our whiteboard brings everyone onto the same canvas, fostering creativity without limits."
    const desc2 = "Witness changes as they happen. Every stroke, idea, or annotation is visible to everyone in real-time, ensuring no brilliant thought is lost in the shuffle."
    const desc3 = "From brainstorming sessions to project planning, our whiteboard adapts to your needs. Use it for teaching, planning, designing, or any collaborative endeavor that requires a shared visual space."

    return (
        <div className="my-20 max-w-[1000px] mx-5">
            <h2 className="text-center text-[40px] max-w-max mx-auto mb-10">Features</h2>
            <div className="flex flex-col sm:flex-row max-w-max mx-auto flex-wrap justify-between gap-5">
                <FeaturesCardComponent
                    image={collabIcon}
                    title="Instant Collaboration"
                    desc={desc1}
                />
                <FeaturesCardComponent
                    image={liveUpdateIcon}
                    title="Live Updates"
                    desc={desc2}
                />
                <FeaturesCardComponent
                    image={endlessIcon}
                    title="Endless Possibilities"
                    desc={desc3}
                />
            </div>
        </div>
    )
}