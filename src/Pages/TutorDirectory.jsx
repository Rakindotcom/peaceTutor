import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { DISTRICTS, getAreas } from '../constants/formData';
import LoadingSpinner from '../Components/UI/LoadingSpinner';
import TutorCard from '../Components/TutorCard';

const TutorDirectory = () => {
  const [tutors, setTutors] = useState([]);
  const [filteredTutors, setFilteredTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    location: '',
    subject: '',
    class: '',
    gender: ''
  });

  const classes = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8',
    'Class 9', 'Class 10', 'HSC - 1st Year', 'HSC- 2nd Year', 'Admission', 'IELTS'
  ];

  useEffect(() => {
    fetchTutors();
  }, []);

  useEffect(() => {
    filterTutors();
  }, [searchFilters, tutors]);

  const fetchTutors = async () => {
    try {
      const q = query(
        collection(db, 'tutorProfiles'),
        where('status', '==', 'verified') // Only show verified tutors
      );

      const querySnapshot = await getDocs(q);
      const tutorData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => {
        // Sort by city first, then by location
        if (a.city !== b.city) {
          return (a.city || '').localeCompare(b.city || '');
        }
        return (a.location || '').localeCompare(b.location || '');
      });

      setTutors(tutorData);
      setFilteredTutors(tutorData);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterTutors = () => {
    let filtered = tutors;

    if (searchFilters.city) {
      filtered = filtered.filter(tutor =>
        tutor.city?.toLowerCase().includes(searchFilters.city.toLowerCase())
      );
    }

    if (searchFilters.location) {
      filtered = filtered.filter(tutor =>
        tutor.location?.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
        tutor.preferredLocations?.some(loc =>
          loc.toLowerCase().includes(searchFilters.location.toLowerCase())
        )
      );
    }

    if (searchFilters.subject) {
      filtered = filtered.filter(tutor =>
        tutor.preferredSubjects?.toLowerCase().includes(searchFilters.subject.toLowerCase())
      );
    }

    if (searchFilters.class) {
      filtered = filtered.filter(tutor =>
        tutor.preferredClasses?.includes(searchFilters.class)
      );
    }

    if (searchFilters.gender) {
      filtered = filtered.filter(tutor => tutor.gender === searchFilters.gender);
    }

    setFilteredTutors(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setSearchFilters({
      city: '',
      location: '',
      subject: '',
      class: '',
      gender: ''
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading tutors..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Tutor</h1>
          <p className="text-lg text-gray-600">Browse verified tutors by location and subject</p>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                value={searchFilters.city}
                onChange={handleFilterChange}
                placeholder="Enter city"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={searchFilters.location}
                onChange={handleFilterChange}
                placeholder="Enter area/location"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={searchFilters.subject}
                onChange={handleFilterChange}
                placeholder="Enter subject"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select
                name="class"
                value={searchFilters.class}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Classes</option>
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={searchFilters.gender}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Any Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={clearFilters}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredTutors.length} of {tutors.length} tutors
          </p>
        </div>

        {/* Tutors Grid */}
        {filteredTutors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutors.map(tutor => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tutors found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorDirectory;