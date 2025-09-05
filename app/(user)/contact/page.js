import { MdLocationOn, MdCall, MdEmail } from "react-icons/md";

export default function Contact() {
    return (
        <main className="flex-grow">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    {/* Left side */}
                    <div>
                        <h1 className="text-4xl font-bold text-[#212529]">Get in Touch</h1>
                        <p className="mt-4 text-lg text-[#495057]">
                            We&apos;re here to help. Reach out to us with any questions or inquiries you may have.
                        </p>

                        <div className="mt-12 space-y-8">
                            {/* Address */}
                            <div className="flex items-start gap-4">
                                <div className="flex size-12 items-center justify-center rounded-full bg-[#005A9C] flex-shrink-0 text-[#FFFFFF]">
                                    <MdLocationOn size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Address</h3>
                                    <p className="text-[#495057]">
                                        Uripok Bachaspati Leikai, RIMS South Gate, Near Kombirei Keithel,
                                        Imphal West, Manipur-795001
                                    </p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4">
                                <div className="flex size-12 items-center justify-center rounded-full bg-[#005A9C] text-[#FFFFFF]">
                                    <MdCall size={22} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Phone</h3>
                                    <p className="text-[#495057]">6909988995</p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="flex size-12 items-center justify-center rounded-full bg-[#005A9C] text-[#FFFFFF]">
                                    <MdEmail size={22} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Email</h3>
                                    <p className="text-[#495057]">info.langolviewinstitute@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side (Form) */}
                    <div className="rounded-lg bg-[#FFFFFF] p-8 shadow-lg">
                        <form action="#" className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#212529]" htmlFor="name">
                                    Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        className="w-full rounded-md border border-[#E1E5EA] bg-[#F7F9FC] px-3 py-2 text-sm text-[#212529] focus:border-[#005A9C] focus:ring-[#005A9C]"
                                        id="name"
                                        name="name"
                                        placeholder="Your Name"
                                        type="text"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#212529]" htmlFor="email">
                                    Email
                                </label>
                                <div className="mt-1">
                                    <input
                                        className="w-full rounded-md border border-[#E1E5EA] bg-[#F7F9FC] px-3 py-2 text-sm text-[#212529] focus:border-[#005A9C] focus:ring-[#005A9C]"
                                        id="email"
                                        name="email"
                                        placeholder="Your Email"
                                        type="email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#212529]" htmlFor="message">
                                    Message
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        className="w-full rounded-md border border-[#E1E5EA] bg-[#F7F9FC] px-3 py-2 text-sm text-[#212529] focus:border-[#005A9C] focus:ring-[#005A9C]"
                                        id="message"
                                        name="message"
                                        placeholder="Your Message"
                                        rows={4}
                                    ></textarea>
                                </div>
                            </div>

                            <div>
                                <button
                                    className="w-full rounded-md bg-[#005A9C] px-6 py-3 text-base font-semibold text-[#FFFFFF] shadow-sm transition-colors hover:bg-[#00447A]"
                                    type="submit"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-16">
                    <div className="aspect-h-9 aspect-w-16 h-96 w-full overflow-hidden rounded-lg">
                        <iframe
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.4985666206294!2d93.92138857562152!3d24.81261814716977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374927c976764091%3A0x2c2a93f04663351d!2sLangol%20View%20Hospital%20And%20Research%20Institute%20Pvt.%20Ltd!5e0!3m2!1sen!2sin!4v1757066550640!5m2!1sen!2sin"
                            style={{ border: 0 }}
                            width="100%"
                            height="450"
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
