import Image from "next/image"


export default function FeaturesCardComponent({image, title, desc}) {
    return (
        <div className="max-w-[300px] border rounded-xl p-10">
            <Image className="max-w-max mx-auto" src={image} alt="feature"/>
            <h1 className="text-[22px] my-2 text-center">{title}</h1>
            <p className="text-center">{desc}</p>
        </div>
    )
}