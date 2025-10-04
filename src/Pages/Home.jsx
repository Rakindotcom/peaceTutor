import { Link } from 'react-router-dom';
import Hero from '../Components/Hero';
import Features from '../Components/Features';
import TuitionTypes from '../Components/TuitionTypes';
import Categories from '../Components/Categories';
import HowItWorks from '../Components/HowItWorks';
import Statistics from '../Components/Statistics';
import Testimonials from '../Components/Testimonials';
import FAQ from '../Components/FAQ';

const Home = () => {
  return (
    <>
      <Hero />
      <Features />
      <TuitionTypes />
      <Categories />
      <HowItWorks />
      <Statistics />
      <Testimonials />
      <FAQ />

      {/* Final CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-20"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white opacity-10 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center space-y-8 relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Transform Your Academic Journey Today
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Join thousands of successful students who have achieved their academic goals with Peace Tutor BD.
            Your perfect tutor is just one click away!
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-12">
            <Link
              to="/hire"
              className="group bg-white text-blue-900 font-bold px-10 py-4 rounded-full text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3"
            >
              <span>Start Learning Now</span>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>

            <Link
              to="/login"
              className="group bg-transparent text-white font-bold px-10 py-4 rounded-full text-lg border-2 border-white hover:bg-white hover:text-blue-900 transition-all duration-300 flex items-center gap-3"
            >
              <span>Teach & Earn</span>
              <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-sm opacity-90">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Free Registration</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Satisfaction Guaranteed</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
