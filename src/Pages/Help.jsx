import React from 'react';
import { Link } from 'react-router-dom';

const Help = () => {
  const faqItems = [
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking the 'Login' button in the header and selecting 'Sign Up'. Choose whether you're a Tutor or Guardian, then fill in your details."
    },
    {
      question: "How do I reset my password?",
      answer: "On the login page, click 'Forgot Password?' and enter your email address. You'll receive a password reset link in your email."
    },
    {
      question: "How do I update my profile information?",
      answer: "Go to your Profile page by clicking on your name in the header, then click 'Edit Profile' to update your information."
    },
    {
      question: "How do I post a tuition job?",
      answer: "As a Guardian, you can post tuition jobs by going to your dashboard and clicking 'Post New Job' or by visiting the 'Post Tuition' page."
    },
    {
      question: "How do I apply for tuition jobs?",
      answer: "As a Tutor, you can browse available jobs on the 'Get Tuition' page and apply for jobs that match your expertise."
    },
    {
      question: "How do I contact support?",
      answer: "You can contact us through the Contact page or email us directly. We typically respond within 24 hours."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Help & Support</h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions and get the help you need
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Link
            to="/contact"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="text-blue-600 text-3xl mb-4">📞</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Support</h3>
            <p className="text-gray-600 text-sm">Get in touch with our support team</p>
          </Link>

          <Link
            to="/profile"
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
          >
            <div className="text-green-600 text-3xl mb-4">👤</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Settings</h3>
            <p className="text-gray-600 text-sm">Update your account information</p>
          </Link>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="text-purple-600 text-3xl mb-4">📚</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">User Guide</h3>
            <p className="text-gray-600 text-sm">Learn how to use the platform</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {item.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Contact Support
            </Link>
            <a
              href="mailto:support@peacetutorbd.com"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>

        {/* Troubleshooting Tips */}
        <div className="mt-12 bg-white rounded-lg shadow-sm border p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Troubleshooting Tips</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Login Issues</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Make sure you're using the correct email and password</li>
                <li>• Try clearing your browser cache and cookies</li>
                <li>• Use the "Forgot Password" feature if needed</li>
                <li>• Ensure you're selecting the correct user type (Tutor/Guardian)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Profile Updates</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Ensure all required fields are filled out</li>
                <li>• Use a valid phone number format (01XXXXXXXXX)</li>
                <li>• Check your internet connection</li>
                <li>• Try refreshing the page if changes don't save</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;