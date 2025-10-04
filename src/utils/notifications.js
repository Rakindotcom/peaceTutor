import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Create a notification for a user
 * @param {string} userId - The user ID to send notification to
 * @param {string} type - Type of notification (tutor_request, tuition_application, assignment, payment, system)
 * @param {string} title - Notification title
 * @param {string} message - Notification message
 * @param {Object} data - Additional data for the notification
 */
export const createNotification = async (userId, type, title, message, data = {}) => {
  try {
    await addDoc(collection(db, 'notifications'), {
      userId,
      type,
      title,
      message,
      data,
      isRead: false,
      createdAt: new Date(),
      readAt: null
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

/**
 * Send notification when a guardian requests a tutor
 */
export const notifyTutorRequest = async (tutorId, guardianName, studentClass, subjects) => {
  await createNotification(
    tutorId,
    'tutor_request',
    'New Tutor Request',
    `${guardianName} has requested you as a tutor for ${studentClass} - ${subjects}`,
    { guardianName, studentClass, subjects }
  );
};

/**
 * Send notification when a tutor applies for a tuition
 */
export const notifyTuitionApplication = async (guardianId, tutorName, studentClass, subjects) => {
  await createNotification(
    guardianId,
    'tuition_application',
    'New Tuition Application',
    `${tutorName} has applied for your ${studentClass} - ${subjects} tuition`,
    { tutorName, studentClass, subjects }
  );
};

/**
 * Send notification when a tutor is assigned to a guardian
 */
export const notifyTutorAssignment = async (guardianId, tutorId, tutorName, guardianName, studentClass, subjects) => {
  // Notify guardian
  await createNotification(
    guardianId,
    'assignment',
    'Tutor Assigned',
    `${tutorName} has been assigned as your tutor for ${studentClass} - ${subjects}`,
    { tutorName, studentClass, subjects }
  );

  // Notify tutor
  await createNotification(
    tutorId,
    'assignment',
    'You have been assigned',
    `You have been assigned to teach ${guardianName}'s student (${studentClass} - ${subjects})`,
    { guardianName, studentClass, subjects }
  );
};

/**
 * Send notification for payment updates
 */
export const notifyPayment = async (userId, type, amount, details) => {
  const title = type === 'received' ? 'Payment Received' : 'Payment Due';
  const message = type === 'received'
    ? `Payment of ৳${amount} has been received`
    : `Payment of ৳${amount} is due`;

  await createNotification(
    userId,
    'payment',
    title,
    message,
    { amount, details }
  );
};

/**
 * Send system notifications
 */
export const notifySystem = async (userId, title, message, data = {}) => {
  await createNotification(
    userId,
    'system',
    title,
    message,
    data
  );
};

/**
 * Send notification when tutor profile needs admin approval
 */
export const notifyAdminTutorVerification = async (adminId, tutorName, tutorEmail) => {
  await createNotification(
    adminId,
    'system',
    'Tutor Verification Required',
    `${tutorName} (${tutorEmail}) has submitted their profile for verification`,
    { tutorName, tutorEmail }
  );
};

/**
 * Send notification when tutor tries to edit profile
 */
export const notifyAdminTutorEdit = async (adminId, tutorName, tutorEmail, changes) => {
  await createNotification(
    adminId,
    'system',
    'Tutor Edit Request',
    `${tutorName} (${tutorEmail}) has requested to edit their profile`,
    { tutorName, tutorEmail, changes }
  );
};