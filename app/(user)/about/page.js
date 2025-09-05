
import {
    FaUserShield,
    FaHeart,
    FaTrophy,
    FaBriefcase,
    FaUsers,
    FaCheckCircle,
    FaRegCheckCircle,
} from "react-icons/fa";
const AboutPage = () => {
    return (
        <main className="flex-1 bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold text-blue-900">
                            About Our Institute
                        </h1>
                        <p className="text-base text-gray-600 leading-relaxed text-justify">
                            Langol View Institute of Nursing and Paramedical Sciences was established under the banner of Langol
                            View Hospital and Research Institute Pvt. Ltd., a trusted name in healthcare known for its commitment
                            to patient care, clinical excellence, and community service. Built on this strong legacy, the institute aims
                            to bridge the gap between classroom learning and real-world healthcare needs.<br /> <br />
                            With the support of our parent hospital, students receive unparalleled exposure to practical training in a
                            professional healthcare setting right from the start of their academic journey. This unique advantage
                            ensures that learning goes beyond textbooks, giving our students the confidence and competence to step
                            into the healthcare sector with real experience.<br /><br />
                            Our institute is more than just a place of study; it is a center of growth where future nurses and
                            paramedical professionals are shaped to meet global standards. By combining academic rigor, hands-on
                            training, and the values of compassion and professionalism, we strive to prepare graduates who will not
                            only find success in their careers but also serve as pillars of healthcare in society.
                            <br /><br />
                            <span className="italic">“Backed by a trusted hospital. Built for tomorrow’s healthcare leaders.”</span>
                        </p>

                        {/* Core Values */}
                        <div className="space-y-6 ">
                            <h2 className="text-3xl font-bold text-blue-900">
                                Our Core Values
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    {
                                        icon: <FaUserShield className="text-green-500 text-2xl" />,
                                        title: "Integrity",
                                        desc: "Upholding the highest ethical standards.",
                                    },
                                    {
                                        icon: <FaHeart className="text-green-500 text-2xl" />,
                                        title: "Compassion",
                                        desc: "Providing empathetic and patient-centered care.",
                                    },
                                    {
                                        icon: <FaTrophy className="text-green-500 text-2xl" />,
                                        title: "Excellence",
                                        desc: "Striving for the best in all we do.",
                                    },
                                    {
                                        icon: <FaBriefcase className="text-green-500 text-2xl" />,
                                        title: "Professionalism",
                                        desc: "Demonstrating respect and accountability.",
                                    },
                                    {
                                        icon: <FaUsers className="text-green-500 text-2xl" />,
                                        title: "Social Responsibility",
                                        desc: "Contributing positively to our community and society.",
                                    },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-4"
                                    >
                                        <div>{item.icon}</div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {item.title}
                                            </h3>
                                            <p className="text-gray-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* Image + Vision */}
                    <div className="space-y-8">
                        <div className="rounded-lg overflow-hidden shadow-lg">
                            <div
                                className="w-full h-80 bg-center bg-cover"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBwprhfMtEpfxXEuoUKtIdNjolkYrq9MAXZvUy_8Df2EXhcKgEAVJl61fSqqaSCK2UHJS9_KGQJRdHLjjdkfx_YPRwHH9jdjPOS0TxJoGjJ8pHqvuiN5Fm8hQEFq8Cj94L_elV_9IHpZqZVHHP-dzXMyqABq54gkMLq4Ox-OnRyjxlo0HpqEtNCbS2PE_MUHV56KJ4IZF-Ttf3ikzZIA2kmJyTs5mZ5oKVFR9rk2SFz_397WrCZvI9bVPw1GB4LJpm2VWgvis1JOcY")',
                                }}
                            />
                        </div>
                        <div className="bg-blue-600 text-white rounded-lg shadow-lg p-8">
                            <h2 className="text-2xl font-bold mb-2">Our Vision</h2>
                            <p className="text-blue-100 leading-relaxed">
                                To establish Langol View Institute of Nursing and Paramedical Sciences as a distinguished institution of
                                higher learning, recognized for academic excellence, professional competence, and ethical standards in
                                nursing and paramedical education, with a commitment to advancing healthcare services and societal
                                well-being.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mission Section */}
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
                        Our Mission
                    </h2>
                    <div className="max-w-4xl mx-auto space-y-4">
                        {[
                            "To impart rigorous and comprehensive education in nursing and paramedical sciences aligned with national and international standards.",
                            "To prepare competent healthcare professionals equipped with clinical expertise, analytical skills, and a commitment to ethical practice.",
                            "To foster an environment of research, innovation, and continuous professional development in the field of healthcare.",
                            "To inculcate values of integrity, empathy, and social responsibility among students and faculty.",
                            "To strengthen the healthcare system through active community engagement, institutional collaborations, and contribution to public health initiatives."
                        ].map((mission, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                            >
                                <FaRegCheckCircle className="text-2xl text-green-500 mt-1" />

                                <p className="text-gray-700 text-lg flex-1">{mission}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AboutPage;