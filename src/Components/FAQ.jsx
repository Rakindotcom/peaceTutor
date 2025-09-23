import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "How do I find the right tutor for my needs?",
      answer: "Simply fill out our tutor request form with your subject requirements, preferred schedule, and location. Our team will match you with qualified tutors who meet your specific criteria. You can review their profiles, qualifications, and student reviews before making a decision."
    },
    {
      question: "Are all tutors verified and qualified?",
      answer: "Yes, absolutely! Every tutor on our platform goes through a rigorous verification process. We check their educational credentials, teaching experience, and conduct background verification. All our tutors are university graduates with proven expertise in their subjects."
    },
    {
      question: "What are the tutoring rates?",
      answer: "Tutoring rates vary based on the subject, level of study, and tutor's experience. Generally, rates range from 500-2000 BDT per hour. We ensure competitive and fair pricing. You can discuss and negotiate rates directly with your chosen tutor."
    },
    {
      question: "Can I change my tutor if I'm not satisfied?",
      answer: "Absolutely! Your satisfaction is our priority. If you're not happy with your current tutor for any reason, we'll help you find a replacement at no additional cost. We want to ensure you have the best possible learning experience."
    },
    {
      question: "Do you offer online tutoring sessions?",
      answer: "Yes, we offer both in-person and online tutoring options. Our tutors are equipped to conduct effective online sessions using platforms like Zoom, Google Meet, or Skype. Online tutoring offers flexibility and convenience, especially for students in remote areas."
    },
    {
      question: "How do I pay for tutoring sessions?",
      answer: "Payment is made directly to your tutor. You can choose from various payment methods including cash, mobile banking (bKash, Nagad, Rocket), or bank transfer. We recommend discussing payment terms with your tutor before starting sessions."
    },
    {
      question: "What subjects and levels do you cover?",
      answer: "We cover all major subjects from primary level to university level, including SSC, HSC, O/A Levels, admission tests, IELTS, and professional courses. Our subjects include Mathematics, Physics, Chemistry, Biology, English, Bangla, and many more specialized subjects."
    },
    {
      question: "How quickly can I get matched with a tutor?",
      answer: "We typically match students with suitable tutors within 24-48 hours of receiving your request. In urgent cases, we can often find a tutor within a few hours. The exact time depends on your location and specific requirements."
    },
    {
      question: "Is there any registration fee?",
      answer: "No, there's absolutely no registration fee for students! Our tutor matching service is completely free. You only pay your tutor for the actual tutoring sessions. We believe quality education should be accessible to everyone."
    },
    {
      question: "Can I have group tutoring sessions?",
      answer: "Yes, we offer group tutoring options! Group sessions are a cost-effective way to learn with friends or classmates. Many of our tutors are experienced in handling small group sessions (2-5 students) and can adapt their teaching methods accordingly."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  return (
    <section className="w-full py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Got questions? We've got answers! Here are the most common questions about our tutoring services.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                aria-expanded={openFAQ === index}
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0 text-blue-600">
                  {openFAQ === index ? (
                    <FaChevronUp className="text-xl" />
                  ) : (
                    <FaChevronDown className="text-xl" />
                  )}
                </div>
              </button>

              {openFAQ === index && (
                <div className="px-8 pb-6 animate-fade-in">
                  <div className="border-t border-gray-100 pt-6">
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-16">
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our friendly support team is here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors text-center">
                Contact Support
              </Link>
              <a href="tel:01938679075" className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors text-center">
                Call Us Now
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              📞 Call us: 01938-679075 | 📧 Email: support@peacetutor.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;