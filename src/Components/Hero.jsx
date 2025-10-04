import { Link } from 'react-router-dom';

function Hero() {
    return (
        <section className="w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 sm:py-16 lg:py-20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-10 left-4 sm:left-10 w-12 sm:w-20 h-12 sm:h-20 bg-blue-200 rounded-full opacity-20 animate-bounce-slow"></div>
                <div className="absolute top-20 sm:top-32 right-4 sm:right-20 w-10 sm:w-16 h-10 sm:h-16 bg-purple-200 rounded-full opacity-20 animate-bounce-slow" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 left-1/4 w-8 sm:w-12 h-8 sm:h-12 bg-indigo-200 rounded-full opacity-20 animate-bounce-slow" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8 lg:gap-12">
                {/* Text Content */}
                <div className="lg:w-3/5 text-center lg:text-left space-y-6 lg:space-y-8 animate-fade-in">
                    <div className="space-y-4">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-indigo-800 to-purple-800 leading-tight">
                            Find Your Perfect Tutor in Bangladesh
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 leading-relaxed">
                            Connect with <span className="font-semibold text-blue-700">qualified, verified tutors</span> for personalized learning experiences. From SSC to University level - we've got you covered!
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-3 sm:gap-6 justify-center lg:justify-start text-center">
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-md flex-1 min-w-[100px] sm:flex-none">
                            <div className="text-xl sm:text-2xl font-bold text-blue-900">1 M+</div>
                            <div className="text-xs sm:text-sm text-gray-600">Verified Tutors</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-md flex-1 min-w-[100px] sm:flex-none">
                            <div className="text-xl sm:text-2xl font-bold text-green-700">1.5 M+</div>
                            <div className="text-xs sm:text-sm text-gray-600">Happy Students</div>
                        </div>
                        <div className="bg-white/70 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-md flex-1 min-w-[100px] sm:flex-none">
                            <div className="text-xl sm:text-2xl font-bold text-purple-700">24/7</div>
                            <div className="text-xs sm:text-sm text-gray-600">Support</div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mt-6 lg:mt-8 w-full sm:w-auto">
                        <Link
                            to="/hire"
                            className="group bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                            <span>Find a Tutor Now</span>
                            <svg className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>

                        <Link
                            to="/apply"
                            className="group border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
                        >
                            <span>Become a Tutor</span>
                            <svg className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 mt-4 lg:mt-6">
                        <div className="flex items-center gap-2">
                            <svg className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>100% Verified Tutors</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Free Matching Service</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Satisfaction Guaranteed</span>
                        </div>
                    </div>
                </div>

                {/* Image Section */}
                <div className="lg:w-2/5 mt-8 lg:mt-0 flex justify-center relative animate-slide-up">
                    <div className="relative w-full max-w-md lg:max-w-none">
                        {/* Decorative background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl transform rotate-6 opacity-20"></div>
                        <div className="relative bg-white rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
                            <img
                                src="/hero.jpg"
                                alt="Students learning with a qualified tutor in a modern educational environment"
                                className="w-full h-auto rounded-2xl"
                            />
                            {/* Floating elements */}
                            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-yellow-400 text-yellow-900 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-bounce">
                                ⭐ Top Rated
                            </div>
                            <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-green-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                                ✓ Verified
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;