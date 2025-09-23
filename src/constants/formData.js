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

export const DISTRICTS = [
  "Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", 
  "Mymensingh", "Comilla", "Narayanganj", "Gazipur", "Cox's Bazar", "Noakhali", 
  "Jessore", "Bogra", "Moulvibazar", "Dinajpur", "Faridpur", "Kushtia", "Pabna", 
  "Patuakhali", "Satkhira", "Sirajganj", "Tangail", "Jamalpur", "Feni", 
  "Brahmanbaria", "Pirojpur", "Bhola", "Panchagarh", "Thakurgaon", "Naogaon", 
  "Natore", "Joypurhat", "Lalmonirhat", "Kurigram", "Sherpur", "Netrakona", 
  "Bagerhat", "Chuadanga", "Magura", "Jhenaidah", "Meherpur", "Habiganj", 
  "Sunamganj", "Rangamati", "Khagrachari", "Bandarban", "Chandpur", "Lakshmipur", 
  "Shariatpur", "Gopalganj", "Madaripur", "Manikganj", "Munshiganj", "Rajbari", 
  "Nilphamari", "Gaibandha", "Kishoreganj", "Jhalokathi", "Barguna", "Narail"
];

export const AREAS = [
  "Didn't Found Here", "Dhanmondi", "Uttara", "Mirpur", "Gulshan", "Banani", 
  "Mohammadpur", "Bashundhara", "Motijheel", "Tejgaon", "Badda", "Rampura", 
  "Farmgate", "Savar", "Keraniganj", "Wari", "Demra", "Khilgaon", "Ashulia", 
  "Rayerbazar", "Moghbazar", "Khilkhet", "Bashabo", "Pallabi", "Jatrabari", 
  "Baridhara", "Mohakhali", "Lalbagh", "Kotwali", "Shahbagh", "Mirpur-10", 
  "Mirpur-12", "Shantinagar", "Tejgaon Industrial Area", "Segunbagicha", 
  "Paltan", "Chawkbazar", "Kamrangirchar", "Kawran Bazar", "Mugda", "Shahjadpur", 
  "Nikunja", "Kafrul", "Shyamoli", "Kazipara", "Banasree", "Mahakhali", 
  "Mintu Road", "Puran Dhaka", "Hazaribagh", "Muktijuddha Road", "Barabagh", 
  "Basila", "Dhaka Cantonment", "Noapara", "Goran", "Mirpur-14", "Gabtali", 
  "Shampur", "Chittagong Road", "Ramna", "Purbachal", "Siddheswari", "Kalabagan", 
  "Vashantek", "Taltola", "Chandrima Udyan", "Sadarghat", "Babu Bazar", 
  "Kaptan Bazar", "Shagorika", "Tikatuli", "Shibpur", "West Nakhalpara", 
  "Gopibagh", "Kallyanpur", "Mirpur-13", "Tajgaon", "Shamshernagar", "Dewanhat", 
  "Sonargaon", "Khamarbari", "Bagan Bazar", "Anwar Sardar Road", "Ekatali", 
  "Shatinagar", "Chandpur", "Monipur", "Arambagh", "Aftabnagar", "Mirpur-11", 
  "Baitul Aman Housing", "Chhayanir", "Ramna Park", "Postogola", "Shewrapara", 
  "Reazuddin Bazar", "North Badda", "Majher Char", "Biyabani", "Lakshmipur", 
  "Chouddagram", "Rajabazar", "Satmasjid Road", "Mirpur-15", "Dhamrai", 
  "Nalchity", "Maniknagar", "South Kamrangirchar", "Middle Baraipara", 
  "Asad Gate", "Biggan Bhaban", "Mohammadpur-1", "Biswa Road", "Sheikh Mujib Road", 
  "Mithapukur", "Barakhola", "Purana Paltan", "Awal Tower", "Bhanga Bazar", 
  "Kalatali", "Thana Road", "Mirpur-6", "Shaheed Minar", "Bangla Bazar", 
  "Kadamtala", "Meherpur", "Pabna", "Madhabdi", "Barabari", "Kadirganj", 
  "Khulna Road", "Khulshi", "Banarupa", "Chittagong University", "Gotalapara", 
  "Naria", "Narinda", "Shabagh Market", "Fakirapool", "Sutrapur", "Kotwali Road", 
  "Chandra", "Sanarpara", "Sadarghat Station", "Bokshi Bazar", "Malibagh", 
  "Bogura", "Mollar Bagan", "Modhupur", "Narayanganj Road", "Bausi", "Daulatpur", 
  "Demra Thana", "Dhanmondi-2", "Jorpatki"
];

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