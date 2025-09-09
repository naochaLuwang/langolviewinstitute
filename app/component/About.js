import Image from "next/image";
import { MdArrowForward } from "react-icons/md";

const AboutSection = () => {
    return (
        <section id="about" className="py-16 sm:py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    {/* Left Text Section */}
                    <div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#1B4332]">
                            About Us
                        </h2>
                        <p className="mt-6 text-base sm:text-xl leading-8 text-[#495057]">
                            Langol View Institute of Nursing and Paramedical Sciences was established under the banner of Langol
                            View Hospital and Research Institute Pvt. Ltd., a trusted name in healthcare known for its commitment
                            to patient care, clinical excellence, and community service. Built on this strong legacy, the institute aims
                            to bridge the gap between classroom learning and real-world healthcare needs.
                        </p>

                        {/* Button */}
                        <div className="mt-8">
                            <a
                                href="/about"
                                className="inline-flex items-center gap-2 rounded-md bg-[#90C9AC] px-5 py-3 text-sm font-semibold text-[#1B4332] shadow-sm hover:bg-[#A8D5BA] transition-colors"
                            >
                                Learn More
                                <MdArrowForward className="text-lg" />
                            </a>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="mt-12 lg:mt-0">
                        <Image
                            src="/images/IMG_3526.JPG"
                            alt="Doctors collaborating"
                            width={600}   // specify the actual or desired width
                            height={400}  // specify the actual or desired height
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
