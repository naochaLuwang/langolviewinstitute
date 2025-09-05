"use client";
import Image from "next/image";

export default function Hero() {
    return (
        <section
            className="relative flex min-h-[60vh] md:min-h-[75vh] items-center justify-center bg-cover bg-center bg-no-repeat text-center"
            style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuBGD0sWI59QXs9u9jnR9wi9vGZl1B_WIT1kvPZ_7dYWY9Ao-cKESXjjWT1deJZLDA1YW98yfvbIYLWGuOY7qxDpJzZ8DUdwTWhUuhFV7ZkTTL83gr5Z9HKJmnJSxhyttr0zyD_xcxidcgOe2j5ncrYC9g2FhplSfGlRMLt4lAu9qmpww2uYrKSsZS-ehVY_2QVKI5LfEx344bbYFlSpuIiiRzzUQSMmzAME8bO01_ieN2ZtOdFpTECUbMj-DbY0r1eW5sF_nuyQ2Vk")`,
            }}
        >
            <div className="px-6 lg:px-8 max-w-3xl">
                <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
                    Advancing Healthcare Through Education and Innovation
                </h1>
                <p className="text-white text-lg md:text-xl leading-relaxed">
                    Our institute is dedicated to providing exceptional healthcare education and fostering groundbreaking research to improve patient care and community health.
                </p>

                <div className="mt-6 space-x-4">
                    <button>Apply Now</button>
                    <button className="w-auto h-auto bg-white px-4 py-2 rounded-lg cursor-pointer">Contact Us</button>
                </div>
            </div>

        </section>
    );
}
