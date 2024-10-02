import React, { useState } from 'react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., sending an email or storing the message)
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-[#0b1b29] text-white py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg mb-6 text-center">
          We’d love to hear from you! Please fill out the form below to get in touch with us.
        </p>
        <form onSubmit={handleSubmit} className="bg-[#141a24] p-6 rounded-lg shadow-lg max-w-lg mx-auto">
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#0b1b29] border border-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#0b1b29] border border-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg mb-2" htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#0b1b29] border border-gray-700 text-white h-32"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#ff9800] hover:bg-[#e68900] py-2 px-4 rounded-lg text-lg text-white shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
