import { VALIDATION_PATTERNS, ERROR_MESSAGES } from '../constants/formData';

export const validateField = (name, value, rules = {}) => {
  const { required = false, minLength, maxLength, pattern, type } = rules;
  
  // Check if required field is empty
  if (required && (!value || value.toString().trim() === '')) {
    return ERROR_MESSAGES.required;
  }
  
  // If field is empty and not required, no validation needed
  if (!value || value.toString().trim() === '') {
    return null;
  }
  
  const trimmedValue = value.toString().trim();
  
  // Length validation
  if (minLength && trimmedValue.length < minLength) {
    return ERROR_MESSAGES.minLength(minLength);
  }
  
  if (maxLength && trimmedValue.length > maxLength) {
    return `Must be no more than ${maxLength} characters long`;
  }
  
  // Pattern validation
  if (pattern && !pattern.test(trimmedValue)) {
    if (pattern === VALIDATION_PATTERNS.phone) {
      return ERROR_MESSAGES.invalidPhone;
    }
    if (pattern === VALIDATION_PATTERNS.email) {
      return ERROR_MESSAGES.invalidEmail;
    }
    return 'Invalid format';
  }
  
  // Type-specific validation
  if (type === 'number') {
    const num = parseFloat(trimmedValue);
    if (isNaN(num)) {
      return ERROR_MESSAGES.invalidNumber;
    }
  }
  
  return null;
};

export const validateForm = (formData, validationRules) => {
  const errors = {};
  let isValid = true;
  
  Object.keys(validationRules).forEach(fieldName => {
    const error = validateField(fieldName, formData[fieldName], validationRules[fieldName]);
    if (error) {
      errors[fieldName] = error;
      isValid = false;
    }
  });
  
  return { isValid, errors };
};

export const getFirebaseErrorMessage = (errorCode) => {
  const errorMessages = {
    'permission-denied': 'You don\'t have permission to perform this action.',
    'unavailable': 'Service is currently unavailable. Please try again later.',
    'deadline-exceeded': 'Request timed out. Please check your connection.',
    'auth/wrong-password': 'Invalid email or password.',
    'auth/user-not-found': 'Invalid email or password.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.'
  };
  
  return errorMessages[errorCode] || 'An unexpected error occurred. Please try again.';
};