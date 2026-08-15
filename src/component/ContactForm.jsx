import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";
import { createLead } from "../api/leads";

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
  const location = useLocation();
  const product = location.state?.product;

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.current.user_name.value,
      email: form.current.user_email.value,
      product: product || null,
      message: form.current.message.value,
    };

    try {
      await createLead(payload);
      setSubmitted(true);
      form.current.reset();
    } catch {
      alert("Something went wrong sending your enquiry. Please try WhatsApp instead.");
    } finally {
      setLoading(false);
    }
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
    <section className="bg-white pt-32 pb-16 px-6 sm:px-12 lg:px-24 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* FORM + MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 shadow-sm border border-hairline rounded-lg overflow-hidden bg-white">
          {/* Map */}
          <div
            className="w-full h-96 lg:h-auto rounded-l-lg overflow-hidden"
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
            className="bg-gray-50 p-10 rounded-r-lg flex flex-col justify-center"
            data-aos="fade-left"
          >
            <h2 className="text-4xl font-extrabold text-ink tracking-tight mb-2 text-center">
              Get in Touch
            </h2>
            <p className="text-center text-ink-soft mb-8">
              Send us an enquiry and we'll get back to you shortly.
            </p>

            {submitted ? (
              <div className="flex flex-col items-center text-center gap-4 py-10">
                <FaCheckCircle size={48} className="text-orange-500" />
                <h3 className="text-2xl font-bold text-ink">
                  Enquiry received!
                </h3>
                <p className="text-ink-soft max-w-sm">
                  Thanks for reaching out{product ? ` about ${product}` : ""}.
                  Our team will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm font-semibold text-orange-500 hover:underline"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                {product && (
                  <div className="flex items-center justify-between bg-orange-50 border border-orange-200 text-orange-700 text-sm font-medium px-4 py-3 rounded-lg">
                    Enquiring about: <span className="font-bold">{product}</span>
                  </div>
                )}

                <div>
                  <label className="block mb-2 font-semibold text-ink-soft">
                    Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    placeholder="Your full name"
                    className="w-full px-5 py-3 rounded-lg border border-hairline bg-white focus:outline-none focus:ring-3 focus:ring-orange-200 focus:border-orange-400 shadow-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-ink-soft">
                    Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-5 py-3 rounded-lg border border-hairline bg-white focus:outline-none focus:ring-3 focus:ring-orange-200 focus:border-orange-400 shadow-sm transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-ink-soft">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    required
                    defaultValue={product ? `Hi, I'd like a quote for ${product}. ` : ""}
                    placeholder="Write your message here..."
                    className="w-full px-5 py-3 rounded-lg border border-hairline bg-white focus:outline-none focus:ring-3 focus:ring-orange-200 focus:border-orange-400 shadow-sm transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-3 bg-ink hover:bg-orange-500 disabled:opacity-60 text-cream font-semibold px-8 py-3 rounded-full shadow-sm transition-all hover:scale-105"
                  >
                    <FaEnvelope size={20} />
                    {loading ? "Sending..." : "Send Enquiry"}
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-3 bg-green-700 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full shadow-sm transition-transform hover:scale-105"
                  >
                    <FaWhatsapp size={20} />
                    Send via WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Contact Info Cards */}
        <div
  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
  data-aos="fade-up"
>
  <div className="bg-ink text-cream rounded-lg p-6 flex items-center gap-4 shadow-sm hover:-translate-y-1 hover:bg-orange-600 transition-all cursor-pointer">
    <IoCall size={22} className="opacity-80" />
    <div>
      <p className="text-xs uppercase tracking-widest text-cream/60">Call Us</p>
      <p className="font-semibold">+91 9307011622</p>
    </div>
  </div>

  <div className="bg-ink text-cream rounded-lg p-6 flex items-center gap-4 shadow-sm hover:-translate-y-1 hover:bg-orange-600 transition-all cursor-pointer">
    <FaWhatsapp size={22} className="opacity-80" />
    <div>
      <p className="text-xs uppercase tracking-widest text-cream/60">WhatsApp</p>
      <p className="font-semibold">Chat Now</p>
    </div>
  </div>

  <div className="bg-ink text-cream rounded-lg p-6 flex items-center gap-4 shadow-sm hover:-translate-y-1 hover:bg-orange-600 transition-all cursor-pointer">
    <FaEnvelope size={22} className="opacity-80" />
    <div>
      <p className="text-xs uppercase tracking-widest text-cream/60">Email</p>
      <p className="font-semibold">support@example.com</p>
    </div>
  </div>

  <div className="bg-ink text-cream rounded-lg p-6 flex items-center gap-4 shadow-sm hover:-translate-y-1 hover:bg-orange-600 transition-all cursor-pointer">
    <FaMapMarkerAlt size={22} className="opacity-80" />
    <div>
      <p className="text-xs uppercase tracking-widest text-cream/60">Address</p>
      <p className="font-semibold">San Francisco, CA</p>
    </div>
  </div>
</div>


        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto" data-aos="fade-up">
          <h3 className="text-3xl font-bold text-ink tracking-tight mb-8 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-hairline"
              >
                <button
                  className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-ink hover:bg-gray-50 transition"
                  onClick={() => toggleFAQ(idx)}
                >
                  {faq.question}
                  <span className="text-xl">{openFAQ === idx ? "−" : "+"}</span>
                </button>
                {openFAQ === idx && (
                  <div className="px-6 py-4 text-ink-soft border-t border-hairline">
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
