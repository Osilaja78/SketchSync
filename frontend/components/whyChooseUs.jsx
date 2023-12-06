import Image from "next/image";
import Link from "next/link";
import ghIcon from "../public/icons/ghIcon.svg";
import twitterIcon from "../public/icons/twitterIcon.svg";


export default function WhyChooseUsComponent() {
    return (
        <div className="max-w-[1000px] mx-auto pb-20 pt-5 px-10 md:px-0">
            <h1 className="text-center text-[40px] max-w-max mx-auto mb-10">About SketchSync</h1>
            <div className="max-w-[600px] mx-auto my-5 text-center">
                <p>
                    Welcome to SketchSync, a project inspired by our passion 
                    for fostering collaboration and breaking down the barriers 
                    of distance in creative endeavors. As a dedicated individual 
                    at ALX Software Engineering School, this project has been an 
                    exciting journey, fueled by our shared belief in the power of 
                    collaborative work.
                </p>
                <h2 className="text-center text-[30px] my-5">Our Story</h2>
                <p>
                    The idea sprouted from a shared experience - the challenges 
                    of working together seamlessly, irrespective of physical 
                    boundaries. We envisioned a platform that would redefine 
                    collaborative work, bringing teams closer and enhancing 
                    creativity. SketchSync was born out of this vision, and 
                    it has been an exhilarating ride turning our dream into reality.
                </p>
                <h2 className="text-center text-[30px] mt-5 mb-2">Meet the Team</h2>
                <div>
                    <h3 className="text-center text-[20px] mb-2">Hameed Osilaja</h3>
                    <div className="flex gap-10 max-w-max mx-auto">
                        <Link href="https://github.com/Osilaja78" target="blank">
                            <Image src={ghIcon} alt="Github" />
                        </Link>
                        <Link href="https://twitter.com/HameedOsilaja" target="blank">
                            <Image src={twitterIcon} alt="Twitter" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}