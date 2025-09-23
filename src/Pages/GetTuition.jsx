import { useState, useEffect, useRef } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const GetTuition = () => {
  const [tuitions, setTuitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasShownErrorRef = useRef(false);
  const [filters, setFilters] = useState({
    subject: '',
    level: '',
    mode: '',
    location: ''
  });

  useEffect(() => {
    fetchTuitions();
  }, []);

  const fetchTuitions = async () => {
    try {
      const q = query(
        collection(db, 'tuitions'),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const tuitionData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTuitions(tuitionData);
      hasShownErrorRef.current = false; // Reset error state on success
    } catch (error) {
      if (!hasShownErrorRef.current) {
        toast.error('Error fetching tuitions: ' + error.message);
        hasShownErrorRef.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const filteredTuitions = tuitions.filter(tuition => {
    return (
      (filters.subject === '' || tuition.subject === filters.subject) &&
      (filters.level === '' || tuition.level === filters.level) &&
      (filters.mode === '' || tuition.mode === filters.mode) &&
      (filters.location === '' || tuition.location.toLowerCase().includes(filters.location.toLowerCase()))
    );
  });

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tuitions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Tuitions</h1>
          <p className="text-xl text-gray-600 mb-8">Find the perfect tutoring opportunity for you</p>

          <div className="flex justify-center gap-4">
            <Link
              to="/admin-login?from=post-tuition"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Post a Tuition
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Tuitions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                name="subject"
                id="subject"
                value={filters.subject}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Economics">Economics</option>
                <option value="Accounting">Accounting</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
              <select
                name="level"
                id="level"
                value={filters.level}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Levels</option>
                <option value="Primary">Primary (Class 1-5)</option>
                <option value="Secondary">Secondary (Class 6-10)</option>
                <option value="Higher Secondary">Higher Secondary (Class 11-12)</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Graduate">Graduate</option>
              </select>
            </div>

            <div>
              <label htmlFor="mode" className="block text-sm font-medium text-gray-700 mb-1">
                Mode
              </label>
              <select
                name="mode"
                id="mode"
                value={filters.mode}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Modes</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="both">Both Online & Offline</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Search by location"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Tuition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTuitions.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tuitions found</h3>
              <p className="text-gray-600 mb-4">
                {tuitions.length === 0
                  ? "No tuitions have been posted yet."
                  : "Try adjusting your filters to see more results."
                }
              </p>
              <Link
                to="/admin-login?from=post-tuition"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Post the First Tuition
              </Link>
            </div>
          ) : (
            filteredTuitions.map((tuition) => (
              <div key={tuition.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                    {tuition.title}
                  </h3>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {tuition.mode}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Subject:</span>
                    <span className="ml-2">{tuition.subject}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Level:</span>
                    <span className="ml-2">{tuition.level}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Budget:</span>
                    <span className="ml-2 text-green-600 font-semibold">{tuition.budget}</span>
                  </div>
                  {tuition.location && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{tuition.location}</span>
                    </div>
                  )}
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="font-medium">Duration:</span>
                    <span className="ml-2">{tuition.duration}</span>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                  {tuition.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Posted {formatDate(tuition.createdAt)}
                  </span>
                  <Link
                    to={`/apply-tuition/${tuition.id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredTuitions.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Showing {filteredTuitions.length} of {tuitions.length} tuitions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetTuition;