import { FaUserGraduate, FaShieldAlt, FaClock, FaMapMarkerAlt, FaChartLine, FaHandshake } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: <FaUserGraduate />,
      title: "Expert Tutors",
      description: "All our tutors are university graduates with proven teaching experience and subject expertise.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaShieldAlt />,
      title: "Verified Profiles",
      description: "Every tutor goes through a rigorous verification process including background checks and skill assessments.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <FaClock />,
      title: "Flexible Scheduling",
      description: "Choose your preferred time slots and study at your own pace with flexible scheduling options.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "All Over Bangladesh",
      description: "Find qualified tutors in all major cities and districts across Bangladesh for convenient learning.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <FaChartLine />,
      title: "Track Progress",
      description: "Monitor your learning progress with regular assessments and detailed performance reports.",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <FaHandshake />,
      title: "Satisfaction Guarantee",
      description: "Not satisfied with your tutor? We'll find you a replacement at no additional cost.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="w-full py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Why Choose Peace Tutor BD?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're committed to providing the best tutoring experience in Bangladesh with our comprehensive platform and dedicated support.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h3>
            <p className="text-xl mb-6 opacity-90">Join thousands of students who have improved their grades with our expert tutors.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/hire" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors text-center">
                Find a Tutor
              </Link>
              <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors text-center">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;