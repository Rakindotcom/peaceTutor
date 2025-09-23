import { useState } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Fatima Rahman",
      role: "SSC Student",
      location: "Dhaka",
      image: "👩‍🎓",
      rating: 5,
      text: "Peace Tutor Academy helped me find the perfect math tutor. My grades improved from C to A+ in just 3 months! The tutor was very patient and explained everything clearly.",
      subject: "Mathematics"
    },
    {
      name: "Ahmed Hassan",
      role: "HSC Student",
      location: "Chittagong",
      image: "👨‍🎓",
      rating: 5,
      text: "I was struggling with Physics and Chemistry. The tutors here are amazing! They use practical examples that make complex concepts easy to understand. Highly recommended!",
      subject: "Physics & Chemistry"
    },
    {
      name: "Rashida Begum",
      role: "Parent",
      location: "Sylhet",
      image: "👩‍💼",
      rating: 5,
      text: "As a working mother, finding a reliable tutor for my daughter was challenging. Peace Tutor Academy made it so easy! The tutor is punctual, professional, and my daughter loves learning now.",
      subject: "English & Bangla"
    },
    {
      name: "Karim Uddin",
      role: "University Student",
      location: "Rajshahi",
      image: "👨‍💻",
      rating: 5,
      text: "The computer science tutoring I received was exceptional. The tutor helped me with programming concepts and I aced my semester exams. Great platform for finding quality tutors!",
      subject: "Computer Science"
    },
    {
      name: "Nasir Ahmed",
      role: "Tutor",
      location: "Dhaka",
      image: "👨‍🏫",
      rating: 5,
      text: "Being a tutor with Peace Tutor Academy has been wonderful. They provide great support and help me connect with serious students. The platform is user-friendly and professional.",
      subject: "Mathematics Tutor"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="w-full py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what students, parents, and tutors say about their experience with Peace Tutor Academy.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>

            {/* Quote icon */}
            <div className="absolute top-8 left-8 text-blue-200 text-4xl">
              <FaQuoteLeft />
            </div>

            <div className="relative z-10">
              {/* Stars */}
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-xl mx-1" />
                ))}
              </div>

              {/* Testimonial text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 text-center leading-relaxed mb-8 font-medium">
                "{testimonials[currentTestimonial].text}"
              </blockquote>

              {/* Author info */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="text-6xl">
                  {testimonials[currentTestimonial].image}
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-xl font-bold text-gray-900">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-blue-600 font-semibold">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {testimonials[currentTestimonial].location} • {testimonials[currentTestimonial].subject}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-blue-600 hover:bg-blue-50"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft className="text-xl" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 text-blue-600 hover:bg-blue-50"
            aria-label="Next testimonial"
          >
            <FaChevronRight className="text-xl" />
          </button>
        </div>

        {/* Testimonial indicators */}
        <div className="flex justify-center mt-8 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                  ? 'bg-blue-600 w-8'
                  : 'bg-blue-200 hover:bg-blue-300'
                }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">1000+</div>
            <div className="text-gray-600">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600">Expert Tutors</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">50+</div>
            <div className="text-gray-600">Subjects Covered</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;