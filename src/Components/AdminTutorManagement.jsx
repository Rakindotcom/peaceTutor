import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { showToast } from '../utils/toast';
import { notifyTutorAssignment, notifySystem } from '../utils/notifications';
import LoadingSpinner from './UI/LoadingSpinner';

const AdminTutorManagement = () => {
  const [tutorRequests, setTutorRequests] = useState([]);
  const [tuitionApplications, setTuitionApplications] = useState([]);
  const [pendingTutors, setPendingTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('requests');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch tutor requests
      const requestsQuery = query(
        collection(db, 'tutorRequests'),
        where('status', '==', 'pending')
      );
      const requestsSnapshot = await getDocs(requestsQuery);
      const requestsData = requestsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Fetch tuition applications
      const applicationsQuery = query(
        collection(db, 'tuitionApplications'),
        where('status', '==', 'pending')
      );
      const applicationsSnapshot = await getDocs(applicationsQuery);
      const applicationsData = applicationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Fetch pending tutor verifications
      const tutorsQuery = query(
        collection(db, 'tutorProfiles'),
        where('status', '==', 'pending_verification')
      );
      const tutorsSnapshot = await getDocs(tutorsQuery);
      const tutorsData = tutorsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setTutorRequests(requestsData);
      setTuitionApplications(applicationsData);
      setPendingTutors(tutorsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      showToast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const approveTutorRequest = async (request) => {
    try {
      // Update request status
      await updateDoc(doc(db, 'tutorRequests', request.id), {
        status: 'approved',
        approvedAt: new Date(),
        assignedDate: new Date()
      });

      // Send notifications to both parties
      await notifyTutorAssignment(
        request.guardianId,
        request.tutorId,
        request.tutorName,
        request.guardianName,
        request.studentClass,
        request.subjects
      );

      showToast.success('Tutor request approved and both parties notified!');
      fetchData();
    } catch (error) {
      console.error('Error approving request:', error);
      showToast.error('Failed to approve request');
    }
  };

  const verifyTutor = async (tutor, approved) => {
    try {
      const status = approved ? 'verified' : 'rejected';

      await updateDoc(doc(db, 'tutorProfiles', tutor.id), {
        status: status,
        verificationStatus: status,
        verifiedAt: new Date(),
        verifiedBy: 'admin'
      });

      // Notify tutor
      await notifySystem(
        tutor.userId,
        approved ? 'Profile Verified' : 'Profile Rejected',
        approved
          ? 'Your tutor profile has been verified and is now active!'
          : 'Your tutor profile was rejected. Please contact admin for details.'
      );

      showToast.success(`Tutor ${approved ? 'verified' : 'rejected'} successfully!`);
      fetchData();
    } catch (error) {
      console.error('Error updating tutor status:', error);
      showToast.error('Failed to update tutor status');
    }
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    if (date.toDate) return date.toDate().toLocaleDateString();
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingSpinner size="lg" message="Loading admin data..." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">Tutor Management</h2>
        <p className="text-sm text-gray-600 mt-1">Manage tutor requests, applications, and verifications</p>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <nav className="flex space-x-8 px-6">
          <button
            onClick={() => setActiveTab('requests')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'requests'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Tutor Requests ({tutorRequests.length})
          </button>
          <button
            onClick={() => setActiveTab('applications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'applications'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Tuition Applications ({tuitionApplications.length})
          </button>
          <button
            onClick={() => setActiveTab('verifications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'verifications'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
          >
            Pending Verifications ({pendingTutors.length})
          </button>
        </nav>
      </div>

      <div className="p-6">
        {/* Tutor Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {tutorRequests.length > 0 ? (
              tutorRequests.map((request) => (
                <div key={request.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {request.guardianName} → {request.tutorName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Student: {request.studentName} ({request.studentClass})
                      </p>
                      <p className="text-sm text-gray-600">
                        Subjects: {request.subjects}
                      </p>
                      <p className="text-sm text-gray-600">
                        Location: {request.location}
                      </p>
                      <p className="text-sm text-gray-600">
                        Guardian Phone: {request.guardianPhone}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Requested: {formatDate(request.requestDate)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => approveTutorRequest(request)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Approve & Assign
                      </button>
                      <button
                        onClick={() => {
                          // Reject logic here
                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No pending tutor requests</p>
            )}
          </div>
        )}

        {/* Tuition Applications Tab */}
        {activeTab === 'applications' && (
          <div className="space-y-4">
            {tuitionApplications.length > 0 ? (
              tuitionApplications.map((application) => (
                <div key={application.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {application.tutorName} applied for {application.jobTitle}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Guardian: {application.guardianName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Tutor Email: {application.tutorEmail}
                      </p>
                      <p className="text-sm text-gray-600">
                        Tutor Phone: {application.tutorPhone}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Applied: {formatDate(application.appliedAt)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          // Approve application logic
                        }}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          // Reject application logic
                        }}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No pending applications</p>
            )}
          </div>
        )}

        {/* Tutor Verifications Tab */}
        {activeTab === 'verifications' && (
          <div className="space-y-4">
            {pendingTutors.length > 0 ? (
              pendingTutors.map((tutor) => (
                <div key={tutor.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {tutor.name} (ID: {tutor.tutorId})
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Email: {tutor.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        Phone: {tutor.contactNo}
                      </p>
                      <p className="text-sm text-gray-600">
                        Education: {tutor.degree} from {tutor.instituteName}
                      </p>
                      <p className="text-sm text-gray-600">
                        Location: {tutor.location}, {tutor.city}
                      </p>
                      <p className="text-sm text-gray-600">
                        Subjects: {tutor.preferredSubjects}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Submitted: {formatDate(tutor.timestamp)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => verifyTutor(tutor, true)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                      >
                        Verify
                      </button>
                      <button
                        onClick={() => verifyTutor(tutor, false)}
                        className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No pending verifications</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTutorManagement;