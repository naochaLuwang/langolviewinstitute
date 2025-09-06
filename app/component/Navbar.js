import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-white shadow-sm py-4 px-6 md:px-12">
            <div className="flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center space-x-2">
                    {/* Heart/Logo Icon (using a simple emoji for demonstration) */}
                    <span className="text-blue-500 text-2xl">💙</span>
                    <Link href="/">
                        <p className="text-lg w-[400px] font-semibold text-gray-800">Langol View Institute of Nursing and Paramedical Sciences</p>
                    </Link>
                </div>

                {/* Navigation Links (Hidden on small screens, shown on medium and above) */}
                <div className="hidden md:flex items-center space-x-8 text-lg text-gray-600">
                    <Link href="/">
                        <p className="hover:text-blue-500 transition-colors duration-300">Home</p>
                    </Link>
                    <Link href="/about">
                        <p className="hover:text-blue-500 transition-colors duration-300">About Us</p>
                    </Link>
                    <Link href="/admissions">
                        <p className="hover:text-blue-500 transition-colors duration-300">Admissions</p>
                    </Link>
                    <Link href="/gallery">
                        <p className="hover:text-blue-500 transition-colors duration-300">Gallery</p>
                    </Link>
                    <Link href="/news_events">
                        <p className="hover:text-blue-500 transition-colors duration-300">News & Events</p>
                    </Link>
                    <Link href="/contact">
                        <p className="hover:text-blue-500 transition-colors duration-300">Contact Us</p>
                    </Link>
                </div>


            </div>
        </nav>
    );
};

export default Navbar;
