import { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { VALIDATION_PATTERNS } from '../constants/formData';
import { validateField, getFirebaseErrorMessage } from '../utils/validation';
import { sendNewsletterWelcome } from '../utils/emailNotifications';
import { showToast, toastMessages } from '../utils/toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate email
    const emailError = validateField('email', email, {
      required: true,
      pattern: VALIDATION_PATTERNS.email
    });

    if (emailError) {
      setError(emailError);
      setIsLoading(false);
      return;
    }

    try {
      // Check if email already exists
      const emailQuery = query(
        collection(db, 'newsletter'),
        where('email', '==', email.trim().toLowerCase())
      );
      const existingEmails = await getDocs(emailQuery);

      if (!existingEmails.empty) {
        showToast.warning(toastMessages.newsletterAlreadySubscribed);
        setIsLoading(false);
        return;
      }

      // Add new subscription
      await addDoc(collection(db, 'newsletter'), {
        email: email.trim().toLowerCase(),
        subscribedAt: serverTimestamp(),
        status: 'active',
        source: 'website'
      });

      // Send welcome email
      await sendNewsletterWelcome(email.trim().toLowerCase());

      showToast.success(toastMessages.newsletterSuccess);
      setEmail('');
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      const errorMessage = getFirebaseErrorMessage(error.code);
      showToast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            placeholder="Enter your email"
            className={`w-full px-4 py-3 rounded-full bg-gray-800 border text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-600'
              }`}
            required
          />
          {error && (
            <p className="text-red-400 text-sm mt-2 text-center">{error}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
        >
          {isLoading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>

    </>
  );
};

export default Newsletter;