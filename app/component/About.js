// components/AboutSection.tsx
import { MdArrowForward } from "react-icons/md";

const AboutSection = () => {
    return (
        <section id="about" className="py-16 sm:py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
                <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                    {/* Left Text Section */}
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                            About Us
                        </h2>
                        <p className="mt-6 text-lg leading-8 text-[var(--color-text-secondary)]">
                            Langol View Institute of Nursing and Paramedical Sciences was established under the banner of Langol
                            View Hospital and Research Institute Pvt. Ltd., a trusted name in healthcare known for its commitment
                            to patient care, clinical excellence, and community service. Built on this strong legacy, the institute aims
                            to bridge the gap between classroom learning and real-world healthcare needs.
                        </p>

                        {/* Button */}
                        <div className="mt-8">
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 rounded-md bg-[var(--color-secondary)] px-5 py-3 text-sm font-semibold text-[var(--color-primary)] shadow-sm hover:bg-teal-100 transition-colors"
                            >
                                Learn More
                                <MdArrowForward className="text-lg" />
                            </a>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="mt-12 lg:mt-0">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc8l7VXrzJCjo6Cs8-_iPSR3ddr8Qpq150DxuyhQnaDh15vd2ywBMnMZWDW8HeZUaYlPUXpEAlSrG7API8D_9yVkKcOcrPb9LVI-7ujx6_Yl7MPT9D7CmkiC7mzr0Ch2kPzgwqFdBGxFn4Hxhp70YoPkckfigF3qKdVxhdDGTEQn7Hm4Zss6L-DOmOSYbNVzxZmcBBoA5c4-EGMY5AwaoS1Rfed2D1GQMKPRTkDHW8xke1inXTTr1ns7aXiYU9NeickHXwZvPe-cM"
                            alt="Doctors collaborating"
                            className="rounded-lg shadow-xl"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
