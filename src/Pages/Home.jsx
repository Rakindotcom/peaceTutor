import React from 'react';
import { Link } from 'react-router-dom'; // ✅ You must import Link
import Hero from '../Components/Hero';
import TuitionTypes from '../Components/TuitionTypes';
import Categories from '../Components/Categories';

const Home = () => {
  return (
    <>
      <Hero />
      <TuitionTypes />

      {/* CTA Section */}
      <section className="w-full py-20 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center space-y-8">

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto">
            Whether you want to find the perfect tutor or start your career as one, Peace Tutor Academy is here for you.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-8">
            <Link
              to="/hire"
              className="bg-white text-blue-900 font-semibold px-8 py-3 rounded-md border-2 border-white hover:bg-blue-800 hover:text-white transition"
            >
              Hire a Tutor
            </Link>
            <Link
              to="/apply"
              className="bg-transparent text-white font-semibold px-8 py-3 rounded-md border-2 border-white hover:bg-white hover:text-blue-900 transition"
            >
              Apply as a Tutor
            </Link>
          </div>

        </div>
      </section>

        <Categories />
        
    </>
  );
};

export default Home;
