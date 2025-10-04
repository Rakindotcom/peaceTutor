import React from 'react';

const TutorProfileView = ({ tutorData }) => {
  if (!tutorData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    try {
      return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return timeString;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Tutor Profile</h2>
          <div className="text-right">
            <p className="text-sm text-gray-600">Tutor ID</p>
            <p className="text-lg font-bold text-blue-600">{tutorData.tutorId}</p>
          </div>
        </div>
      </div>

      {/* Basic Information */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Basic Information</h3>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-700">Name:</span>
                <span className="ml-2 text-gray-900">{tutorData.name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Contact No:</span>
                <span className="ml-2 text-gray-900">{tutorData.contactNo}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <span className="ml-2 text-gray-900">{tutorData.email}</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Overview</h3>
            <p className="text-gray-700 text-sm leading-relaxed">{tutorData.overview}</p>
          </div>
        </div>
      </div>

      {/* Educational Information */}
      <div className="mb-8 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Educational Information</h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-700">Degree:</span>
              <span className="ml-2 text-gray-900">{tutorData.degree}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Institute Name:</span>
              <span className="ml-2 text-gray-900">{tutorData.instituteName}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Exam / Degree Title:</span>
              <span className="ml-2 text-gray-900">{tutorData.examDegreeTitle || 'Not Given'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Group:</span>
              <span className="ml-2 text-gray-900">{tutorData.group || 'Not Given'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">ID Card No:</span>
              <span className="ml-2 text-gray-900">{tutorData.idCardNo || 'Not Given'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Result:</span>
              <span className="ml-2 text-gray-900">{tutorData.result || 'Not Given'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Year of passing:</span>
              <span className="ml-2 text-gray-900">{tutorData.yearOfPassing || 'Not Given'}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Curriculum:</span>
              <span className="ml-2 text-gray-900 capitalize">
                {tutorData.curriculum ? tutorData.curriculum.replace('_', ' ') : 'Not Given'}
              </span>
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-gray-700">Current institute:</span>
              <span className="ml-2 text-gray-900">{tutorData.currentInstitute ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tuition Related Information */}
      <div className="mb-8 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tuition Related Information</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-700">Available Days:</span>
              <span className="ml-2 text-gray-900">
                {tutorData.availableDays?.join(', ') || 'Not specified'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Available Time:</span>
              <span className="ml-2 text-gray-900">
                {tutorData.availableTimeFrom && tutorData.availableTimeTo
                  ? `${formatTime(tutorData.availableTimeFrom)} - ${formatTime(tutorData.availableTimeTo)}`
                  : 'Not specified'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Expected Salary:</span>
              <span className="ml-2 text-gray-900">{tutorData.expectedSalary} BDT</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">City:</span>
              <span className="ml-2 text-gray-900">{tutorData.city}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Location:</span>
              <span className="ml-2 text-gray-900">{tutorData.location}</span>
            </div>
          </div>

          <div>
            <span className="font-medium text-gray-700">Preferred Categories:</span>
            <span className="ml-2 text-gray-900">
              {tutorData.preferredCategories?.join(', ') || 'Not specified'}
            </span>
          </div>

          <div>
            <span className="font-medium text-gray-700">Preferred Classes:</span>
            <div className="ml-2 mt-1">
              <span className="text-gray-900">
                {tutorData.preferredClasses?.join(', ') || 'Not specified'}
              </span>
            </div>
          </div>

          <div>
            <span className="font-medium text-gray-700">Preferred Subjects:</span>
            <div className="ml-2 mt-1">
              <span className="text-gray-900">{tutorData.preferredSubjects || 'Not specified'}</span>
            </div>
          </div>

          <div>
            <span className="font-medium text-gray-700">Preferred Locations:</span>
            <div className="ml-2 mt-1">
              <span className="text-gray-900">
                {tutorData.preferredLocations?.join(', ') || 'Not specified'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="font-medium text-gray-700">Tutoring Styles:</span>
              <span className="ml-2 text-gray-900">
                {tutorData.tutoringStyles?.join(', ') || 'Not specified'}
              </span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Place of Tutoring:</span>
              <span className="ml-2 text-gray-900">
                {tutorData.placeOfTutoring?.join(', ') || 'Not specified'}
              </span>
            </div>
          </div>

          <div>
            <span className="font-medium text-gray-700">Total Experience:</span>
            <div className="ml-2 mt-1">
              <span className="text-gray-900">{tutorData.totalExperience || 'Not specified'}</span>
            </div>
          </div>

          <div>
            <span className="font-medium text-gray-700">Tutoring Method:</span>
            <div className="ml-2 mt-1">
              <span className="text-gray-900">{tutorData.tutoringMethod || 'Not specified'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="mb-8 border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-medium text-gray-700">Gender:</span>
            <span className="ml-2 text-gray-900">{tutorData.gender}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Date of Birth:</span>
            <span className="ml-2 text-gray-900">{formatDate(tutorData.dateOfBirth)}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Religion:</span>
            <span className="ml-2 text-gray-900">{tutorData.religion || 'Not specified'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Birth Certificate No:</span>
            <span className="ml-2 text-gray-900">{tutorData.birthCertificateNo || 'Not provided'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Additional Number:</span>
            <span className="ml-2 text-gray-900">{tutorData.additionalNumber || 'Not provided'}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Nationality:</span>
            <span className="ml-2 text-gray-900">{tutorData.nationality}</span>
          </div>
        </div>

        <div className="mt-4">
          <span className="font-medium text-gray-700">Address:</span>
          <div className="ml-2 mt-1">
            <span className="text-gray-900">{tutorData.address}</span>
          </div>
        </div>

        {tutorData.facebookProfile && (
          <div className="mt-4">
            <span className="font-medium text-gray-700">Facebook Profile Link:</span>
            <div className="ml-2 mt-1">
              <a
                href={tutorData.facebookProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline break-all"
              >
                {tutorData.facebookProfile}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Family Information */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Family & Emergency Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Parents Information</h4>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-700">Father's Name:</span>
                <span className="ml-2 text-gray-900">{tutorData.fatherName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Father's Number:</span>
                <span className="ml-2 text-gray-900">{tutorData.fatherNumber || 'Not provided'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Mother's Name:</span>
                <span className="ml-2 text-gray-900">{tutorData.motherName}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Mother's Number:</span>
                <span className="ml-2 text-gray-900">{tutorData.motherNumber || 'Not provided'}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-800 mb-2">Emergency Contact</h4>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-700">Name of Emergency Contact Person:</span>
                <span className="ml-2 text-gray-900">{tutorData.emergencyContactName || 'Not provided'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Number of Emergency Contact Person:</span>
                <span className="ml-2 text-gray-900">{tutorData.emergencyContactNumber || 'Not provided'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Relation with Emergency Contact Person:</span>
                <span className="ml-2 text-gray-900">{tutorData.emergencyContactRelation || 'Not provided'}</span>
              </div>
              {tutorData.emergencyContactAddress && (
                <div>
                  <span className="font-medium text-gray-700">Address of Emergency Contact Person:</span>
                  <div className="ml-2 mt-1">
                    <span className="text-gray-900">{tutorData.emergencyContactAddress}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t text-center">
        <p className="text-sm text-gray-600">Thank you for using our platform</p>
      </div>
    </div>
  );
};

export default TutorProfileView;