import React, { useState } from "react";

const Hire = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    gender: "",
    district: "",
    area: "",
    category: "",
    grade: "",
    subjects: "",
    address: "",
  });

  const [popup, setPopup] = useState({
    isVisible: false,
    message: "",
    isError: false,
  });

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

  const areas = [
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

  const categories = ["Bangla Medium", "English Medium", "English Version", "Arabic Medium", "Admission Test"];
  const grades = [
    "Nursery", "KG", "Class I", "Class II", "Class III", "Class IV", "Class V", "Class VI", "Class VII", "Class VIII",
    "Class IX", "S.S.C", "HSC 1st year", "HSC 2nd year", "Honours 1st year", "Honours 2nd year",
    "Honours 3rd year", "Honours 4th year", "Masters", "Diploma in Engineering", "Engineering University Admission Test",
    "Medical College Admission Test", "Public University Admission Test", "Private University Admission Test",
    "School Admission Test", "O Level", "A Level (AS)", "A Level (A2)", "Dakhil", "Alim", "Fazil", "Kamil"
  ];
  const genders = ["Male", "Female", "Other"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.phone ||
      !formData.email ||
      !formData.gender ||
      !formData.district ||
      !formData.category ||
      !formData.grade ||
      !formData.subjects ||
      !formData.address
    ) {
      setPopup({
        isVisible: true,
        message: "Please fll all required fields!",
        isError: true,
      });
      return;
    }

    console.log(formData);
    setPopup({
      isVisible: true,
      message: "Form Submitted Successfully!",
      isError: false,
    });
  };

  const closePopup = () => {
    setPopup({ isVisible: false, message: "", isError: false });
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-white to-gray-100 shadow-xl rounded-2xl mt-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Hire a Tutor</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-semibold">Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Phone Number*</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 017XXXXXXXX"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Email*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Gender*</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select Gender</option>
            {genders.map((g, i) => (
              <option key={i} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">District*</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select District</option>
            {districts.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Area (Optional)</label>
          <select
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">Select Area</option>
            {areas.map((a, i) => (
              <option key={i} value={a}>{a}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Category*</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-semibold">Class*</label>
          <select
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
            required
          >
            <option value="">Select Class</option>
            {grades.map((g, i) => (
              <option key={i} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Subjects* (separated by comma)</label>
          <input
            type="text"
            name="subjects"
            value={formData.subjects}
            onChange={handleChange}
            placeholder="e.g. Math, Physics, English"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Full Address*</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="House, Road, Area details"
            className="w-full border rounded-lg p-3"
            required
          />
        </div>
        <div className="md:col-span-2 text-center mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-10 rounded-full transition-all"
          >
            Submit
          </button>
        </div>
      </form>

      {popup.isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className={`bg-white rounded-lg p-6 max-w-md w-full shadow-xl ${
              popup.isError ? "border-2 border-red-500" : "border-2 border-green-500"
            }`}
          >
            <h2
              className={`text-xl font-bold mb-4 ${
                popup.isError ? "text-red-600" : "text-green-600"
              }`}
            >
              {popup.isError ? "Error" : "Success"}
            </h2>
            <p className="text-gray-700 mb-6">{popup.message}</p>
            <div className="flex justify-end">
              <button
                onClick={closePopup}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hire;