import { FaSearch, FaUserCheck, FaCalendarAlt, FaGraduationCap } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch />,
      title: "Tell Us Your Needs",
      description: "Fill out our simple form with your subject requirements, preferred schedule, and location.",
      color: "from-blue-500 to-blue-600",
      step: "01"
    },
    {
      icon: <FaUserCheck />,
      title: "Get Matched",
      description: "We'll find and recommend the best tutors based on your specific needs and preferences.",
      color: "from-green-500 to-green-600",
      step: "02"
    },
    {
      icon: <FaCalendarAlt />,
      title: "Schedule & Start",
      description: "Choose your preferred tutor, schedule your first lesson, and begin your learning journey.",
      color: "from-purple-500 to-purple-600",
      step: "03"
    },
    {
      icon: <FaGraduationCap />,
      title: "Achieve Success",
      description: "Track your progress, improve your grades, and achieve your academic goals with expert guidance.",
      color: "from-orange-500 to-orange-600",
      step: "04"
    }
  ];

  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with Peace Tutor Academy is simple. Follow these easy steps to find your perfect tutor and start improving your grades today.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative z-10">
                  {/* Step number */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-6 mx-auto`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-6 mb-2">
                    <div className="w-8 h-8 text-gray-300">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full transform -translate-x-24 translate-y-24"></div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of students who have transformed their academic performance with our expert tutors. It only takes 2 minutes to get started!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/hire" className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg text-center">
                  Find a Tutor Now
                </Link>
                <Link to="/apply" className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors text-center">
                  Become a Tutor
                </Link>
              </div>

              <p className="text-sm mt-4 opacity-75">
                ✓ Free consultation • ✓ No hidden fees • ✓ 100% satisfaction guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;