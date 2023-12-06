import Lottie from "lottie-react";
import SketchAnimation from "../public/animations/sketch-animation.json";
import educatorsAnimation from "../public/animations/educators-animation.json";
import designersAnimation from "../public/animations/designers-animation.json";
import managersAnimation from "../public/animations/managers-animation.json";
import teamsAnimation from "../public/animations/teams-animation.json";


export default function TeamsComponent() {
    return (
        <div className="max-w-[900px] mx-auto px-10 md:px-0">
            <h1 className="text-[30px] md:text-[40px] text-center mb-5">Your Canvas for Collaboration, Tailored for Every Team</h1>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[25px] md:text-[30px]">For Educators:</h2>
                    <i>Unlock Interactive Learning</i>
                    <p>
                        Enrich your virtual classrooms with SketchSync. Engage students 
                        in real-time discussions, annotate diagrams, and create an 
                        immersive learning experience that transcends the limitations 
                        of traditional classrooms.
                    </p>
                </div>
                <Lottie
                    animationData={educatorsAnimation}
                    className='max-w-[800px]'
                />
            </div>
            <hr className="md:hidden"/>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center mb-5 md:mb-0">
                <Lottie animationData={designersAnimation} className='max-w-[800px] min-w-[350px]'/>
                <div className="flex flex-col gap-2">
                    <h2 className="text-[25px] md:text-[30px]">For Designers:</h2>
                    <i>Bring Ideas to Life, Together</i>
                    <p>
                        Designers, rejoice! From concept sketches to collaborative 
                        prototyping, SketchSync is your digital studio. Work 
                        alongside team members, provide instant feedback, and 
                        witness your creative visions come to life in real-time.
                    </p>
                </div>
            </div>
            <hr className="md:hidden"/>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center mt-5 md:mt-0">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[25px] md:text-[30px]">For Project Managers:</h2>
                    <i>Simplify Planning and Coordination</i>
                    <p>
                        Streamline your projects with our whiteboard. Whether 
                        you&apos;re mapping timelines, brainstorming strategies, 
                        or collecting team input, SketchSync ensures every team 
                        member is on the same page, no matter where they are.
                    </p>
                </div>
                <Lottie animationData={managersAnimation} className='max-w-[800px]'/>
            </div>
            <hr className="md:hidden"/>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center">
                <Lottie animationData={teamsAnimation} className='max-w-[800px] min-w-[350px]'/>
                <div className="flex flex-col gap-2">
                    <h2 className="text-[25px] md:text-[30px]">For Remote Teams:</h2>
                    <i>Bridge the Distance Gap</i>
                    <p>
                        Distance is no longer a barrier to collaboration. SketchSync 
                        becomes the shared space where remote teams connect, brainstorm, 
                        and contribute. Break down the virtual walls and collaborate as 
                        if you&apos;re in the same room.
                    </p>
                </div>
            </div>
        </div>
    )
}