const Programs = () => {
    const programs = [
        {
            name: "Bachelor of Science in Nursing",
            duration: "4 Years",
            eligibility: "10+2 with Science (Physics, Chemistry, Biology)",
        },
        {
            name: "General Nursing & Midwifery (GNM)",
            duration: "3 Years",
            eligibility: "10+2 in any stream (preferably Science)",
        },
        {
            name: "Diploma in Medical Laboratory Technology (DMLT)",
            duration: "2 Years",
            eligibility: "10+2 with Science (Biology preferred)",
        },
        {
            name: "Post Basic B.Sc Nursing",
            duration: "2 Years",
            eligibility: "GNM Pass + Registered Nurse",
        },
    ];

    return (
        <div className="w-7xl mx-auto px-8 py-12">
            <h1 className="text-3xl font-bold  mb-10">
                Programs We Offer
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {programs.map((program, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-shadow"
                    >
                        <div>
                            <h2 className="text-xl font-semibold mb-3 text-gray-800">
                                {program.name}
                            </h2>
                            <p className="text-gray-600">
                                <span className="font-medium">Duration:</span> {program.duration}
                            </p>
                            <p className="text-gray-600 mt-1">
                                <span className="font-medium">Eligibility:</span>{" "}
                                {program.eligibility}
                            </p>
                        </div>
                        <button className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            Learn More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Programs;
