import { FaHome, FaUsers, FaLaptop, FaBox } from 'react-icons/fa'; // Correct import for icons

function TuitionTypes() {
  return (
    <section className="w-full bg-white pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-900">
            Explore Our Range of Tutoring Options
          </h1>
          <p className="mt-4 text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
            Whether you're looking for personal lessons, online classes, or group sessions, we have a tutoring option that fits your needs.
          </p>
        </div>

        {/* Tuition Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Card 1 */}
          <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-100 to-white p-8 rounded-3xl shadow-md border border-black hover:scale-105 hover:shadow-lg transition duration-300">
            <div className="text-5xl mb-4">
              <FaHome /> {/* Home Tutoring Icon */}
            </div>
            <h2 className="text-xl font-bold text-blue-800 mb-2">Home Tutoring</h2>
            <p className="text-gray-600 text-sm text-justify">
              Receive personalized one-on-one lessons right at your doorstep with the tutor of your choice.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-100 to-white p-8 rounded-3xl shadow-md border border-black hover:scale-105 hover:shadow-lg transition duration-300">
            <div className="text-5xl mb-4">
              <FaUsers /> {/* Group Tutoring Icon */}
            </div>
            <h2 className="text-xl font-bold text-blue-800 mb-2">Group Tutoring</h2>
            <p className="text-gray-600 text-sm text-justify">
              Join a small group of learners to solve problems together, all while enjoying an affordable rate.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-100 to-white p-8 rounded-3xl shadow-md border border-black hover:scale-105 hover:shadow-lg transition duration-300">
            <div className="text-5xl mb-4">
              <FaLaptop /> {/* Online Tutoring Icon */}
            </div>
            <h2 className="text-xl font-bold text-blue-800 mb-2">Online Tutoring</h2>
            <p className="text-gray-600 text-sm text-justify">
              Take lessons from anywhere in the world, using popular online tools like Zoom, Google Meet, or Skype.
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center text-center bg-gradient-to-br from-blue-100 to-white p-8 rounded-3xl shadow-md border border-black hover:scale-105 hover:shadow-lg transition duration-300">
            <div className="text-5xl mb-4">
              <FaBox /> {/* Package Tutoring Icon */}
            </div>
            <h2 className="text-xl font-bold text-blue-800 mb-2">Package Tutoring</h2>
            <p className="text-gray-600 text-sm text-justify">
              Structured learning packages designed to help you complete a course or topic within a set timeframe.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default TuitionTypes;