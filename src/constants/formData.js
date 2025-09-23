export const GENDERS = ["Male", "Female", "Other"];

export const CATEGORIES = [
  "Bangla Medium",
  "English Medium",
  "English Version",
  "Arabic Medium",
  "Admission Test"
];

export const GRADES = [
  "Nursery", "KG", "Class I", "Class II", "Class III", "Class IV", "Class V",
  "Class VI", "Class VII", "Class VIII", "Class IX", "S.S.C", "HSC 1st year",
  "HSC 2nd year", "Honours 1st year", "Honours 2nd year", "Honours 3rd year",
  "Honours 4th year", "Masters", "Diploma in Engineering",
  "Engineering University Admission Test", "Medical College Admission Test",
  "Public University Admission Test", "Private University Admission Test",
  "School Admission Test", "O Level", "A Level (AS)", "A Level (A2)",
  "Dakhil", "Alim", "Fazil", "Kamil"
];

export const ACADEMIC_YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"];

// Import location data from separate file
import { getDistricts, getAreasForDistrict } from './locationData';

export const DISTRICTS = getDistricts();

// This will be dynamically populated based on selected district
export const getAreas = (district) => getAreasForDistrict(district);

// Validation patterns
export const VALIDATION_PATTERNS = {
  phone: /^01[3-9][0-9]{8}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

// Error messages
export const ERROR_MESSAGES = {
  required: 'This field is required',
  invalidPhone: 'Please enter a valid phone number (e.g., 017XXXXXXXX)',
  invalidEmail: 'Please enter a valid email address',
  minLength: (min) => `Must be at least ${min} characters long`,
  invalidNumber: 'Please enter a valid number'
};