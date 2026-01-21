import React, { useRef, useState, useEffect } from "react";
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Select your service, customize your design, and submit your order via the contact form or WhatsApp.",
  },
  {
    question: "What is your delivery time?",
    answer: "Delivery usually takes 3-7 business days depending on the product and customization.",
  },
  {
    question: "Can I request a custom design?",
    answer: "Yes! Our designers can create custom designs tailored to your brand and needs.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, UPI, and net banking for online orders.",
  },
];

const ContactForm = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "your_service_id",
        "your_template_id",
        form.current,
        "your_public_key"
      )
      .then(
        () => {
          alert("Message sent successfully!");
          form.current.reset();
          setLoading(false);
        },
        (error) => {
          alert("Failed to send message. Try again!");
          console.error(error);
          setLoading(false);
        }
      );
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const name = form.current.user_name.value;
    const message = form.current.message.value;
    const phone = "+919307011622";

    const encodedMsg = encodeURIComponent(`Hello, I am ${name}. ${message}`);
    window.open(`https://wa.me/${phone}?text=${encodedMsg}`, "_blank");
  };

  return (
    <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-32 pb-16 px-6 sm:px-12 lg:px-24 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* FORM + MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 shadow-2xl rounded-2xl overflow-hidden bg-white">
          {/* Map */}
          <div
            className="w-full h-96 lg:h-auto rounded-l-2xl overflow-hidden"
            data-aos="fade-right"
          >
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019559315687!2d-122.41941508468127!3d37.77492977975938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064e22e3d43%3A0xc68e0a8aa8b7d64c!2sSan%20Francisco%2C%20CA%2094103%2C%20USA!5e0!3m2!1sen!2sin!4v1691506786158!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* Contact Form */}
          <div
            className="bg-gray-50 p-10 rounded-r-2xl flex flex-col justify-center"
            data-aos="fade-left"
          >
            <h2 className="text-4xl font-extrabold text-blue-900 mb-8 text-center">
              Get in Touch
            </h2>
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="user_name"
                  required
                  placeholder="Your full name"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-3 focus:ring-blue-500 shadow-sm transition-transform hover:scale-105"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="user_email"
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-3 focus:ring-blue-500 shadow-sm transition-transform hover:scale-105"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  rows="5"
                  required
                  placeholder="Write your message here..."
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-3 focus:ring-blue-500 shadow-sm transition-transform hover:scale-105 resize-none"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-3 bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-transform hover:scale-105"
                >
                  <FaEnvelope size={20} />
                  {loading ? "Sending..." : "Send via Email"}
                </button>

                <button
                  onClick={handleWhatsApp}
                  className="flex items-center justify-center gap-3 bg-green-700 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-transform hover:scale-105"
                >
                  <FaWhatsapp size={20} />
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Info Cards */}
        <div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
  data-aos="fade-up"
>
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 flex items-center gap-4 shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
    <IoCall size={22} className="opacity-80" />
    <div>
      <p className="text-xs uppercase tracking-widest text-gray-400">Call Us</p>
      <p className="font-semibold">+91 9307011622</p>
    </div>
  </div>

  <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 flex items-center gap-4 shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
    <FaWhatsapp size={22} className="opacity-80" />
    <div>
      <p className="text-xs uppercase tracking-widest text-gray-400">WhatsApp</p>
      <p className="font-semibold">Chat Now</p>
    </div>
  </div>

  <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 flex items-center gap-4 shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
    <FaEnvelope size={22} className="opacity-80" />
    <div>
      <p className="text-xs uppercase tracking-widest text-gray-400">Email</p>
      <p className="font-semibold">support@example.com</p>
    </div>
  </div>

  <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6 flex items-center gap-4 shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
    <FaMapMarkerAlt size={22} className="opacity-80" />
    <div>
      <p className="text-xs uppercase tracking-widest text-gray-400">Address</p>
      <p className="font-semibold">San Francisco, CA</p>
    </div>
  </div>
</div>


        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto" data-aos="fade-up">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
              >
                <button
                  className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-gray-800 hover:bg-gray-50 transition"
                  onClick={() => toggleFAQ(idx)}
                >
                  {faq.question}
                  <span className="text-xl">{openFAQ === idx ? "−" : "+"}</span>
                </button>
                {openFAQ === idx && (
                  <div className="px-6 py-4 text-gray-600 border-t border-gray-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
