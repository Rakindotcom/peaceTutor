import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';

const ApplyTuition = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    subjects: '',
    availability: '',
    expectedSalary: '',
    coverLetter: '',
    resume: ''
  });

  useEffect(() => {
    fetchTuition();
  }, [id]);

  const fetchTuition = async () => {
    try {
      const docRef = doc(db, 'tuitions', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTuition({ id: docSnap.id, ...docSnap.data() });
      } else {
        toast.error('Tuition not found');
        navigate('/get-tuition');
      }
    } catch (error) {
      toast.error('Error fetching tuition details');
      navigate('/get-tuition');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const application = {
        ...formData,
        appliedAt: new Date(),
        status: 'pending'
      };

      const tuitionRef = doc(db, 'tuitions', id);
      await updateDoc(tuitionRef, {
        applications: arrayUnion(application)
      });

      toast.success('Application submitted successfully!');
      navigate('/get-tuition');
    } catch (error) {
      toast.error('Error submitting application: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

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
          <p className="mt-4 text-gray-600">Loading tuition details...</p>
        </div>
      </div>
    );
  }

  if (!tuition) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tuition Not Found</h2>
          <button
            onClick={() => navigate('/get-tuition')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Tuitions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/get-tuition')}
            className="text-blue-600 hover:text-blue-700 font-medium mb-4"
          >
            ← Back to Tuitions
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for Tuition</h1>
          <p className="text-gray-600">Submit your application for this tutoring opportunity</p>
        </div>

        {/* Tuition Details Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{tuition.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-medium text-gray-700">Subject:</span>
                <span className="ml-2 text-gray-900">{tuition.subject}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700">Level:</span>
                <span className="ml-2 text-gray-900">{tuition.level}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700">Mode:</span>
                <span className="ml-2 text-gray-900 capitalize">{tuition.mode}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <span className="font-medium text-gray-700">Budget:</span>
                <span className="ml-2 text-green-600 font-semibold">{tuition.budget}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700">Duration:</span>
                <span className="ml-2 text-gray-900">{tuition.duration}</span>
              </div>
              {tuition.location && (
                <div className="flex items-center">
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="ml-2 text-gray-900">{tuition.location}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Description:</h3>
            <p className="text-gray-900">{tuition.description}</p>
          </div>

          {tuition.requirements && (
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Requirements:</h3>
              <p className="text-gray-900">{tuition.requirements}</p>
            </div>
          )}

          <div className="text-sm text-gray-500">
            Posted {formatDate(tuition.createdAt)}
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Your Application</h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label htmlFor="education" className="block text-sm font-medium text-gray-700">
                  Education *
                </label>
                <input
                  type="text"
                  name="education"
                  id="education"
                  required
                  value={formData.education}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., BSc in Mathematics, University of Dhaka"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Teaching Experience *
                </label>
                <input
                  type="text"
                  name="experience"
                  id="experience"
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 2 years of home tutoring"
                />
              </div>

              <div>
                <label htmlFor="subjects" className="block text-sm font-medium text-gray-700">
                  Subjects You Can Teach *
                </label>
                <input
                  type="text"
                  name="subjects"
                  id="subjects"
                  required
                  value={formData.subjects}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Mathematics, Physics, Chemistry"
                />
              </div>

              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">
                  Availability *
                </label>
                <input
                  type="text"
                  name="availability"
                  id="availability"
                  required
                  value={formData.availability}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Monday to Friday, 6 PM to 9 PM"
                />
              </div>

              <div>
                <label htmlFor="expectedSalary" className="block text-sm font-medium text-gray-700">
                  Expected Salary *
                </label>
                <input
                  type="text"
                  name="expectedSalary"
                  id="expectedSalary"
                  required
                  value={formData.expectedSalary}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., ৳6000 per month"
                />
              </div>
            </div>

            <div>
              <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700">
                Cover Letter *
              </label>
              <textarea
                name="coverLetter"
                id="coverLetter"
                required
                rows={5}
                value={formData.coverLetter}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Tell us why you're the perfect fit for this tutoring position..."
              />
            </div>

            <div>
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700">
                Resume/CV Link (Optional)
              </label>
              <input
                type="url"
                name="resume"
                id="resume"
                value={formData.resume}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://drive.google.com/your-resume-link"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/get-tuition')}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyTuition;