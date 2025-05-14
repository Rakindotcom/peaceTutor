import React, { useState } from "react";

const Apply = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    district: "",
    area: "",
    university: "",
    department: "",
    year: "",
    experience: "",
    expectedSalary: "",
    preferredSubjects: "",
    address: "",
  });

  const genders = ["Male", "Female", "Other"];
  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"];
  const districts = [
    "Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh",
    "Comilla", "Narayanganj", "Gazipur", "Cox's Bazar", "Noakhali", "Jessore", "Bogra",
    "Moulvibazar", "Dinajpur", "Faridpur", "Kushtia", "Pabna", "Patuakhali", "Satkhira", "Sirajganj",
    "Tangail", "Jamalpur", "Feni", "Brahmanbaria", "Pirojpur", "Bhola", "Panchagarh", "Thakurgaon",
    "Naogaon", "Natore", "Joypurhat", "Lalmonirhat", "Kurigram", "Sherpur", "Netrakona", "Bagerhat",
    "Chuadanga", "Magura", "Jhenaidah", "Meherpur", "Habiganj", "Sunamganj", "Rangamati", "Khagrachari",
    "Bandarban", "Chandpur", "Lakshmipur", "Shariatpur", "Gopalganj", "Madaripur", "Manikganj",
    "Munshiganj", "Rajbari", "Nilphamari", "Gaibandha", "Kishoreganj", "Barisal", "Jhalokathi",
    "Barguna"
  ];
  const areas = ["Didn't Found Here",
    "Dhanmondi", "Uttara", "Mirpur", "Gulshan", "Banani", "Mohammadpur", "Bashundhara", "Motijheel",
    "Tejgaon", "Badda", "Rampura", "Farmgate", "Savar", "Keraniganj", "Wari", "Demra", "Khilgaon",
    "Ashulia", "Rayerbazar", "Moghbazar", "Khilkhet", "Bashabo", "Pallabi", "Jatrabari", "Baridhara",
    "Mohakhali", "Gulshan 1", "Gulshan 2", "Lalbagh", "Kotwali", "Shahbagh", "Mirpur-10", "Mirpur-12",
    "Banani", "Shantinagar", "Tejgaon Industrial Area", "Segunbagicha", "Paltan", "Chawkbazar",
    "Kamrangirchar", "Kawran Bazar", "Khilgaon", "Moghbazar", "Bata", "Mugda", "Shahjadpur", "Nikunja",
    "Kafrul", "Moulvibazar", "Jatrabari", "Shyamoli", "Kazipara", "Banasree", "Mahakhali", "Mintu Road",
    "Khilgaon", "Puran Dhaka", "Rasa Mela", "Hazaribagh", "Muktijuddha Road", "Keraniganj", "Barabagh",
    "Tejgaon", "Shabagh", "Basila", "Mohammadpur", "Dhaka Cantonment", "Foy’s Lake", "Banani", "Noapara",
    "Goran", "Mirpur-14", "Gabtali", "Shampur", "Chittagong Road", "Ramna", "Motijheel", "Purbachal",
    "Siddheswari", "Kalabagan", "Gabtali", "Gulshan 1", "Gulshan 2", "Kachukhet", "Dholairpar",
    "Laxmibazar", "Vashantek", "Taltola", "Chandrima Udyan", "Sadarghat", "Babu Bazar", "Kaptan Bazar",
    "Shagorika", "Patuakhali", "Tikatuli", "Shibpur", "Moulvibazar", "West Nakhalpara", "Chittagong Road",
    "Gopibagh", "Kallyanpur", "Mirpur-13", "Tajgaon", "Shamshernagar", "Dewanhat", "Sonargaon",
    "Gulshan-1", "Gulsan-2", "Pallabi", "Khamarbari", "Bagan Bazar", "Anwar Sardar Road", "Baridhara",
    "Rayerbazar", "Ekatali", "Shatinagar", "Rampura", "Chandpur", "Monipur", "Arambagh", "Aftabnagar",
    "Basundhara", "Mirpur-11", "Baitul Aman Housing", "Chhayanir", "Patuakhali", "Ramna Park", "Postogola",
    "Shewrapara", "Gulshan-2", "Reazuddin Bazar", "North Badda", "Majher Char", "Hazaribagh", "Biyabani",
    "Lakshmipur", "Chouddagram", "Tejgaon", "Rajabazar", "Satmasjid Road", "Mirpur-15", "Dhamrai",
    "Nalchity", "Kawran Bazar", "Maniknagar", "South Kamrangirchar", "Middle Baraipara", "Asad Gate",
    "Biggan Bhaban", "Mohammadpur-1", "Jatrabari", "Biswa Road", "Sheikh Mujib Road", "Mithapukur",
    "Shantinagar", "Barakhola", "Purana Paltan", "Awal Tower", "Bhanga Bazar", "Kalatali", "Thana Road",
    "Mirpur-6", "Shaheed Minar", "Bangla Bazar", "Kadamtala", "Meherpur", "Pabna", "Madhabdi",
    "Gulshan 1", "Barabari", "Kadirganj", "Khulna Road", "Khulshi", "Banarupa", "Chittagong University",
    "Gotalapara", "Naria", "Narinda", "Shabagh Market", "Fakirapool", "Sutrapur", "Kotwali Road",
    "Chandra", "Sanarpara", "Sadarghat Station", "Bokshi Bazar", "Malibagh", "Bogura", "Mollar Bagan",
    "Modhupur", "Shamshernagar", "Kallyanpur", "Narayanganj Road", "Bausi", "Daulatpur", "Maniknagar",
    "Demra Thana", "Dhanmondi-2", "Jorpatki"
  ];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = [
      "name", "phone", "email", "gender", "district", "university",
      "department", "year", "experience", "expectedSalary", "preferredSubjects", "address"
    ];

    const isEmpty = requiredFields.some((field) => !formData[field]);
    if (isEmpty) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log(formData);
    alert("Application Submitted Successfully!");
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-white to-gray-100 shadow-xl rounded-2xl mt-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-600">Apply as a Tutor</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Name */}
        <div>
          <label className="block mb-1 font-semibold">Full Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border rounded-lg p-3 mb-2"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-1 font-semibold">Phone Number*</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 017XXXXXXXX"
            className="w-full border rounded-lg p-3 mb-2"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-semibold">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="w-full border rounded-lg p-3 mb-2"
            required
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1 font-semibold">Gender*</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-2"
            required
          >
            <option value="">Select Gender</option>
            {genders.map((g, i) => (
              <option key={i} value={g}>{g}</option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="block mb-1 font-semibold">District*</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-2"
            required
          >
            <option value="">Select District</option>
            {districts.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* Area */}
        <div>
          <label className="block mb-1 font-semibold">Area*</label>
          <select
            name="area"
            value={formData.area}
            onChange={handleChange}
            required
            className="w-full border rounded-lg p-3 mb-2"
          >
            <option value="">Select Area</option>
            {areas.map((a, i) => (
              <option key={i} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* University */}
        <div>
          <label className="block mb-1 font-semibold">University*</label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            placeholder="University Name"
            className="w-full border rounded-lg p-3 mb-2"
            required
          />
        </div>

        {/* Department */}
        <div>
          <label className="block mb-1 font-semibold">Department*</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Department Name"
            className="w-full border rounded-lg p-3 mb-2"
            required
          />
        </div>

        {/* Year */}
        <div>
          <label className="block mb-1 font-semibold">Academic Year*</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 mb-2"
            required
          >
            <option value="">Select Year</option>
            {years.map((y, i) => (
              <option key={i} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div>
          <label className="block mb-1 font-semibold">Tutoring Experience*</label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="e.g. 2 years, 5 students"
            className="w-full border rounded-lg p-3 mb-2"
            required
          />
        </div>

        {/* Expected Salary */}
        <div>
          <label className="block mb-1 font-semibold">Expected Salary (BDT/month)*</label>
          <input
            type="number"
            name="expectedSalary"
            value={formData.expectedSalary}
            onChange={handleChange}
            placeholder="e.g. 5000"
            className="w-full border rounded-lg p-3 mb-2"
            required
          />
        </div>

        {/* Preferred Subjects */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Preferred Subjects* (comma separated)</label>
          <input
            type="text"
            name="preferredSubjects"
            value={formData.preferredSubjects}
            onChange={handleChange}
            placeholder="e.g. Math, Physics, Chemistry"
            className="w-full border rounded-lg p-3 mb-2"
            required
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Full Address*</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="House, Road, Area details"
            className="w-full border rounded-lg p-3 mb-2"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-10 rounded-full transition-all"
          >
            Apply Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Apply;