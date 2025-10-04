import React from 'react';

const Statistics = () => {
  const stats = [
    {
      number: "1M+",
      label: "Active Tutors",
      icon: "👨‍🏫",
      color: "text-blue-600"
    },
    {
      number: "1.5M+",
      label: "Happy Students",
      icon: "🎓",
      color: "text-green-600"
    },
    {
      number: "4.9/5",
      label: "Average Tutor Rating",
      icon: "⭐",
      color: "text-yellow-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our growing community of students and tutors across Bangladesh
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;