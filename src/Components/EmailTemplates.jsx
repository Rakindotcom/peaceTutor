import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { validateField } from '../utils/validation';
import { showToast, toastMessages } from '../utils/toast';
import FormField from './UI/FormField';

const EmailTemplates = () => {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    message: '',
    type: 'newsletter'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const emailTypes = [
    { value: 'newsletter', label: 'Newsletter' },
    { value: 'welcome', label: 'Welcome Email' },
    { value: 'tutor_match', label: 'Tutor Match Notification' },
    { value: 'application_received', label: 'Application Received' },
    { value: 'custom', label: 'Custom Email' }
  ];

  const templates = {
    newsletter: {
      subject: 'Peace Tutor BD Newsletter - Latest Updates',
      message: `Dear Subscriber,

Thank you for being part of the Peace Tutor BD community! Here are our latest updates:

📚 New Subjects Added: We now offer tutoring in Computer Science and Digital Marketing
🎯 Success Stories: Our students achieved 95% success rate in recent SSC exams
💡 Study Tips: Check out our latest blog post on effective study techniques
🎉 Special Offer: 20% discount on group tutoring sessions this month

Best regards,
Peace Tutor BD Team

---
If you no longer wish to receive these emails, you can unsubscribe at any time.`
    },
    welcome: {
      subject: 'Welcome to Peace Tutor BD!',
      message: `Dear [Name],

Welcome to Peace Tutor BD! We're thrilled to have you join our community of learners and educators.

What's next?
✅ Complete your profile
✅ Browse available tutors
✅ Schedule your first lesson
✅ Start your learning journey

Our team is here to help you every step of the way. If you have any questions, don't hesitate to contact us.

Best regards,
Peace Tutor BD Team`
    },
    tutor_match: {
      subject: 'Great News! We Found Perfect Tutors for You',
      message: `Dear [Student Name],

Excellent news! We've found qualified tutors that match your requirements:

📋 Subject: [Subject]
📍 Location: [Location]
⏰ Preferred Time: [Time]

We've carefully selected these tutors based on:
- Subject expertise
- Teaching experience
- Student reviews
- Location convenience

Next steps:
1. Review tutor profiles
2. Contact your preferred tutor
3. Schedule a trial lesson
4. Begin your learning journey

Best regards,
Peace Tutor BD Team`
    },
    application_received: {
      subject: 'Application Received - Peace Tutor BD',
      message: `Dear [Tutor Name],

Thank you for applying to become a tutor with Peace Tutor BD!

We have received your application and our team is currently reviewing it. Here's what happens next:

📋 Application Review (1-2 business days)
📞 Phone Interview (if selected)
✅ Background Verification
🎓 Subject Assessment
📝 Final Approval

We'll contact you within 48 hours with an update on your application status.

Thank you for your interest in joining our team of educators!

Best regards,
Peace Tutor BD Team`
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailData(prev => ({ ...prev, [name]: value }));

    // Load template if type changes
    if (name === 'type' && templates[value]) {
      setEmailData(prev => ({
        ...prev,
        subject: templates[value].subject,
        message: templates[value].message
      }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate form
    const newErrors = {};

    if (!emailData.to.trim()) {
      newErrors.to = 'Recipient email is required';
    }

    if (!emailData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!emailData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Save email to queue for processing
      await addDoc(collection(db, 'emailQueue'), {
        ...emailData,
        status: 'pending',
        createdAt: serverTimestamp(),
        sentAt: null
      });

      showToast.success(toastMessages.emailSentSuccess);

      // Reset form
      setEmailData({
        to: '',
        subject: '',
        message: '',
        type: 'newsletter'
      });
      setErrors({});

    } catch (error) {
      console.error('Error queuing email:', error);
      showToast.error(toastMessages.emailSentError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Email</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Email Type"
            name="type"
            value={emailData.type}
            onChange={handleChange}
            options={emailTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
            required
            error={errors.type}
          />

          <FormField
            label="Recipient Email"
            name="to"
            type="email"
            value={emailData.to}
            onChange={handleChange}
            placeholder="recipient@example.com or use 'all-subscribers' for newsletter"
            required
            error={errors.to}
          />
        </div>

        <FormField
          label="Subject"
          name="subject"
          value={emailData.subject}
          onChange={handleChange}
          placeholder="Email subject"
          required
          error={errors.subject}
        />

        <FormField
          label="Message"
          name="message"
          value={emailData.message}
          onChange={handleChange}
          placeholder="Email message content"
          required
          error={errors.message}
          isTextarea
        />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Available Placeholders:</h3>
          <div className="text-sm text-blue-700 grid grid-cols-2 gap-2">
            <span>[Name] - Recipient's name</span>
            <span>[Student Name] - Student's name</span>
            <span>[Tutor Name] - Tutor's name</span>
            <span>[Subject] - Subject name</span>
            <span>[Location] - Location</span>
            <span>[Time] - Preferred time</span>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              setEmailData({
                to: '',
                subject: '',
                message: '',
                type: 'newsletter'
              });
              setErrors({});
            }}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {isLoading ? 'Queuing Email...' : 'Send Email'}
          </button>
        </div>
      </form>


    </div>
  );
};

export default EmailTemplates;