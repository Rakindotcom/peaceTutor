import { toast } from 'react-toastify';

// Custom toast configurations
const toastConfig = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const showToast = {
  success: (message) => {
    toast.success(message, {
      ...toastConfig,
      className: 'toast-success',
    });
  },

  error: (message) => {
    toast.error(message, {
      ...toastConfig,
      className: 'toast-error',
    });
  },

  warning: (message) => {
    toast.warning(message, {
      ...toastConfig,
      className: 'toast-warning',
    });
  },

  info: (message) => {
    toast.info(message, {
      ...toastConfig,
      className: 'toast-info',
    });
  },

  loading: (message) => {
    return toast.loading(message, {
      ...toastConfig,
      className: 'toast-loading',
    });
  },

  update: (toastId, type, message) => {
    toast.update(toastId, {
      render: message,
      type: type,
      isLoading: false,
      ...toastConfig,
    });
  },

  dismiss: (toastId) => {
    toast.dismiss(toastId);
  },

  dismissAll: () => {
    toast.dismiss();
  }
};

// Predefined messages for common actions
export const toastMessages = {
  // Form submissions
  formSubmitSuccess: "Form submitted successfully! We'll get back to you soon.",
  formSubmitError: "Failed to submit form. Please try again.",

  // Newsletter
  newsletterSuccess: "Successfully subscribed to our newsletter! Check your email for confirmation.",
  newsletterAlreadySubscribed: "This email is already subscribed to our newsletter!",
  newsletterError: "Failed to subscribe. Please try again.",

  // Hire requests
  hireRequestSuccess: "Your tutor request has been submitted! We'll contact you within 24 hours.",
  hireRequestError: "Failed to submit request. Please try again.",

  // Tutor applications
  tutorApplicationSuccess: "Your application has been submitted! We'll review it and contact you soon.",
  tutorApplicationError: "Failed to submit application. Please try again.",

  // Contact messages
  contactSuccess: "Your message has been sent! We'll respond within 24 hours.",
  contactError: "Failed to send message. Please try again.",

  // Admin actions
  emailSentSuccess: "Email sent successfully!",
  emailSentError: "Failed to send email. Please try again.",
  dataExportSuccess: "Data exported successfully!",
  dataDeleteSuccess: "Data deleted successfully!",
  dataDeleteError: "Failed to delete data. Please try again.",

  // Authentication
  loginSuccess: "Welcome back! Login successful.",
  loginError: "Login failed. Please check your credentials.",
  logoutSuccess: "Logged out successfully!",

  // Validation
  validationError: "Please fix the errors in the form before submitting.",
  networkError: "Network error. Please check your connection and try again.",

  // Loading states
  submitting: "Submitting your request...",
  loading: "Loading...",
  processing: "Processing...",
  sending: "Sending email...",
};