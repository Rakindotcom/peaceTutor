import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Email notification utility functions
export const sendEmailNotification = async (type, recipientEmail, data = {}) => {
  try {
    const emailTemplates = {
      tutor_application_received: {
        subject: 'Application Received - Peace Tutor Academy',
        template: 'application_received'
      },
      hire_request_received: {
        subject: 'Tutor Request Received - Peace Tutor Academy',
        template: 'hire_request_received'
      },
      contact_message_received: {
        subject: 'Thank you for contacting us - Peace Tutor Academy',
        template: 'contact_received'
      },
      newsletter_welcome: {
        subject: 'Welcome to Peace Tutor Academy Newsletter!',
        template: 'newsletter_welcome'
      }
    };

    const template = emailTemplates[type];
    if (!template) {
      console.error('Email template not found for type:', type);
      return false;
    }

    // Queue email for sending
    await addDoc(collection(db, 'emailQueue'), {
      to: recipientEmail,
      subject: template.subject,
      template: template.template,
      data: data,
      type: type,
      status: 'pending',
      createdAt: serverTimestamp(),
      sentAt: null,
      attempts: 0
    });

    console.log(`Email notification queued for ${recipientEmail}`);
    return true;
  } catch (error) {
    console.error('Error queuing email notification:', error);
    return false;
  }
};

// Send welcome email for new newsletter subscribers
export const sendNewsletterWelcome = async (email) => {
  return await sendEmailNotification('newsletter_welcome', email);
};

// Send confirmation for tutor applications
export const sendTutorApplicationConfirmation = async (email, name) => {
  return await sendEmailNotification('tutor_application_received', email, { name });
};

// Send confirmation for hire requests
export const sendHireRequestConfirmation = async (email, name) => {
  return await sendEmailNotification('hire_request_received', email, { name });
};

// Send confirmation for contact messages
export const sendContactConfirmation = async (email, name) => {
  return await sendEmailNotification('contact_message_received', email, { name });
};

// Bulk email to all newsletter subscribers
export const sendBulkNewsletter = async (subject, message) => {
  try {
    await addDoc(collection(db, 'emailQueue'), {
      to: 'all-subscribers',
      subject: subject,
      message: message,
      type: 'newsletter_bulk',
      status: 'pending',
      createdAt: serverTimestamp(),
      sentAt: null,
      attempts: 0
    });

    console.log('Bulk newsletter queued for sending');
    return true;
  } catch (error) {
    console.error('Error queuing bulk newsletter:', error);
    return false;
  }
};