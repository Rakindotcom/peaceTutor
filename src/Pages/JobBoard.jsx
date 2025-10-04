import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../Components/UI/LoadingSpinner';
import TuitionJobCard from '../Components/TuitionJobCard';

const JobBoard = () => {
  const { user, userData } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    class: '',
    subject: '',
    salary: ''
  });

  const classes = [
    'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8',
    'Class 9', 'Class 10', 'HSC - 1st Year', 'HSC- 2nd Year', 'Admission', 'IELTS'
  ];

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [searchFilters, jobs]);

  const fetchJobs = async () => {
    try {
      const q = query(
        collection(db, 'tuitionPosts'),
        where('status', '==', 'active')
      );

      const querySnapshot = await getDocs(q);
      const jobData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })).sort((a, b) => {
        // Sort by createdAt in descending order (newest first)
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB - dateA;
      });

      setJobs(jobData);
      setFilteredJobs(jobData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = jobs;

    if (searchFilters.location) {
      filtered = filtered.filter(job =>
        job.location?.toLowerCase().includes(searchFilters.location.toLowerCase()) ||
        job.area?.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }

    if (searchFilters.class) {
      filtered = filtered.filter(job => job.studentClass === searchFilters.class);
    }

    if (searchFilters.subject) {
      filtered = filtered.filter(job =>
        job.subjects?.toLowerCase().includes(searchFilters.subject.toLowerCase())
      );
    }

    if (searchFilters.salary) {
      const salaryNum = parseInt(searchFilters.salary);
      filtered = filtered.filter(job => {
        const jobSalary = parseInt(job.salary) || 0;
        return jobSalary >= salaryNum;
      });
    }

    setFilteredJobs(filtered);
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
      location: '',
      class: '',
      subject: '',
      salary: ''
    });
  };

  // Check if user is a tutor
  const isTutor = userData?.role === 'tutor';

  if (!isTutor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🚫</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Restricted</h2>
          <p className="text-gray-600">Only verified tutors can access the job board.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" message="Loading tuition opportunities..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tuition Job Board</h1>
          <p className="text-lg text-gray-600">Find suitable tuition opportunities near you</p>
        </div>

        {/* Search Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Salary</label>
              <input
                type="number"
                name="salary"
                value={searchFilters.salary}
                onChange={handleFilterChange}
                placeholder="e.g., 5000"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
            Showing {filteredJobs.length} of {jobs.length} tuition opportunities
          </p>
        </div>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map(job => (
              <TuitionJobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tuition jobs found</h3>
            <p className="text-gray-600">Try adjusting your search filters or check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobBoard;