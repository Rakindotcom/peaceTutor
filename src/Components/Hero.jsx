import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section className="w-full bg-gradient-to-b from-blue-50 to-white py-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">

                {/* Text Content */}
                <div className="md:w-3/5 text-center md:text-left space-y-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-blue-900 leading-tight">
                        Hire the Right Tutor Today
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600">
                        Book one-on-one lessons with verified tutors in your area and start your learning journey.
                    </p>

                    {/* Buttons and Inline Link */}
                    <div className="flex flex-col items-center md:items-start gap-5 mt-6">
                        <Link
                            to="/hire"
                            className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:brightness-110 transition"
                        >
                            Hire a Tutor (It’s Free!)
                        </Link>

                        {/* Inline Sentence */}
                        <div className="flex gap-1 text-gray-500 text-sm">
                            <p>Want to become a Tutor?</p>
                            <Link
                                to="/apply"
                                className="font-bold text-blue-700 hover:underline"
                            >
                                Sign Up
                            </Link>
                            <p>now</p>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center relative">
                    <div className="p-6 md:p-10">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/12925/12925163.png"
                            alt="Tutoring Illustration"
                            className="w-72 md:w-80 h-auto"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Hero;
