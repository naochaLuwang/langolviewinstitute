"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams, useRouter } from "next/navigation";
import { FiHome, FiBookOpen, FiChevronRight } from "react-icons/fi";

import Link from "next/link";

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Skeleton loader component
const SkeletonLoader = () => (
    <div className="animate-pulse flex flex-col items-center">
        <div className="h-10 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4 mb-6"></div>
        <div className="space-y-4 w-full">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-11/12"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
    </div>
);

export default function ProgramPage() {
    const [programs, setPrograms] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const router = useRouter();

    useEffect(() => {
        async function fetchProgram() {
            if (!id) return;
            try {
                const { data, error } = await supabase
                    .from("courses")
                    .select("*")
                    .eq("id", id)
                    .single();

                if (error) {
                    throw error;
                }
                if (!data) {
                    router.push("/404"); // Redirect to a 404 page if not found
                    return;
                }
                setPrograms(data);
            } catch (err) {
                console.error("Error fetching news:", err);
                setError("Failed to load news article. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        }
        fetchProgram();
    }, [id, router]);

    if (isLoading) {
        return (
            <main className="p-8 max-w-4xl mx-auto">
                <SkeletonLoader />
            </main>
        );
    }

    if (error) {
        return (
            <main className="p-8 max-w-4xl mx-auto">
                <p className="text-center text-red-500">{error}</p>
            </main>
        );
    }

    if (!programs) {
        return (
            <main className="p-8 max-w-4xl mx-auto">
                <p className="text-center text-gray-500">Program not found.</p>
            </main>
        );
    }



    return (
        <main className="p-8 max-w-6xl  mx-auto">
            <nav className="text-sm text-gray-600 mb-6 flex items-center" aria-label="Breadcrumb">
                <ol className="list-reset flex items-center space-x-2">
                    <li className="flex items-center space-x-1">
                        <FiHome className="text-gray-400" />
                        <Link href="/" className="hover:text-blue-500">Home</Link>
                    </li>
                    <li>
                        <FiChevronRight className="text-gray-400" />
                    </li>
                    <li className="flex items-center space-x-1">
                        <FiBookOpen className="text-gray-400" />
                        <Link href="/programs" className="hover:text-blue-500">Programs</Link>
                    </li>
                    <li>
                        <FiChevronRight className="text-gray-400" />
                    </li>
                    <li className="text-gray-500 flex items-center space-x-1">
                        <span>{programs.course_name}</span>
                    </li>
                </ol>
            </nav>
            {/* <div className="flex space-x-2"><Link href="/">Home</Link><span>/</span><Link href="/">Courses</Link></div> */}
            <div className="bg-white p-8 min-h-[80vh] rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold text-[#1B4332] mb-4">
                    {programs.course_name}
                </h1>

                <p className="text-gray-700 leading-relaxed mb-6">Duration: {programs.duration}</p>
                <p className="text-gray-700 leading-relaxed mb-6">Eligibility: {programs.eligibility}</p>



                <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Fees Structure</h3>
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200">
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-[#1B4332] tracking-wider">Regd. Fees (Non-Reundable)</th>
                                    <td className="px-4 py-2 text-sm text-end text-gray-900">Rs.{programs.regd_fees}/-</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-[#1B4332] tracking-wider">One Time Admission Fee per Year</th>
                                    <td className="px-4 py-2 text-sm text-end text-gray-900">Rs.{programs.one_time_admission_fee}/-</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-[#1B4332] tracking-wider">Total Installment Fees per Year</th>
                                    <td className="px-4 py-2 text-sm text-end text-gray-900">Rs.{programs.total_installment_fees_per_year}/-</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-[#1B4332] tracking-wider">1st Installment Fees per Year (At the time of Admission)</th>
                                    <td className="px-4 py-2 text-sm text-end text-gray-900">Rs.{programs.first_installment_fees_per_year}/-</td>
                                </tr>
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-[#1B4332] tracking-wider">2nd Installment Fees per Year (Within 6 months)</th>
                                    <td className="px-4 py-2 text-sm text-end text-gray-900">Rs.{programs.second_installment_fees_per_year}/-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex mt-5 flex-col space-y-2">
                    <h2 className="text-gray-700 font-bold leading-relaxed ">MEDIUM OF INSTRUCTION</h2>
                    <p className="text-gray-700 leading-relaxed ">English shall be the medium of instruction for all the courses and for examination of the
                        courses</p>
                </div>

                <div className="flex mt-5 flex-col space-y-2">
                    <h2 className="text-gray-700 font-bold leading-relaxed ">APPLICATION PROCEDURE</h2>
                    <p className="text-gray-700 leading-relaxed">Every candidate shall apply in prescribed form duly obtained from concerned
                        authority on payment of Rs.1000 (One Thousand only).
                        Duly completed application form is to be submitted along with the required
                        documents to the office of Langol View Institute of Nursing and Paramedical
                        Sciences, Uripok Bachaspati Leikai, RIMS South Gate, Near Kombirei Keithel, Imphal
                        West, Manipur-795001, during office hours.
                        <br /> <br />
                        Application must be filled up by the candidate in his/her own handwriting and shall be
                        accompanied by all necessary certificates, documents and fees may be prescribed
                        in the prospectus/advertisement.<br /><br />
                        Incomplete application forms in any respect shall be rejected and no
                        communication in this regard shall be entertained. The Authority/ Institute shall not be
                        responsible for any delay in the receipt or loss of application in postal transit and no
                        correspondence in this regard shall be entertained. Any document/ certificate found
                        to be false or fabricated at any stage shall make the application liable to rejection
                        and admission if given on basis of such documents/ certificates shall be liable to be
                        cancelled without any refund of any fee etc. paid in this regard and criminal
                        proceedings shall be drawn against such candidate.</p>
                </div>

                <div className="flex mt-5 flex-col space-y-2">
                    <h2 className="text-gray-700 font-bold leading-relaxed ">LAST DATE OF APPLICATION SUBMISSION</h2>
                    <p className="text-gray-700 leading-relaxed">The admission board will carefully review your application and will be invited for
                        selection process.<br /> <br />
                        For further quarries on Admission
                        Please contact the co-ordinator in the college office
                        College office: Langol View Institute of Nursing and Paramedical Sciences<br /><br />
                        Contact no:<br></br>
                        Email:</p>
                </div>

                <div className="flex mt-5 flex-col space-y-2">
                    <h2 className="text-gray-700 font-bold leading-relaxed ">DOCUMENTS TO BE ENCLOSED/CHECKLIST</h2>
                    <p className="text-gray-700 leading-relaxed">The Candidates shall have to enclose attested copies of the following documents
                        along with their application forms. The original documents should be produced at
                        the time of interview and admission.<br /><br />
                        1. Admit Card of X exam (Age Proof)<br></br>
                        2. Mark sheet X and XII<br></br>
                        3. Pass certificate of X and XII<br></br>
                        4. Caste certificate (if applicable),<br></br>
                        5. Migration certificate (for students from other universities)<br></br>
                        6. PHOTOGRAPH: Each candidate shall submit 2 (two) colored passport size
                        photograph, one pasted on the form in the space provided and should be self
                        attested by a gazetted officer. The signature should be partly on the photograph
                        and partly on the body of the application form.</p>
                </div>



            </div>
        </main>
    );
}
