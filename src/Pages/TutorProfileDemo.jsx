import React from 'react';
import TutorProfileView from '../Components/TutorProfileView';
import { sampleTutorProfile } from '../data/sampleTutorProfile';

const TutorProfileDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tutor Profile Demo</h1>
          <p className="text-gray-600 mt-2">
            This is a demonstration of how a complete tutor profile looks like.
          </p>
        </div>

        <TutorProfileView tutorData={sampleTutorProfile} />
      </div>
    </div>
  );
};

export default TutorProfileDemo;