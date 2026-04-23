import React, { useState } from 'react';
import './StudentApplicationForm.css';

const StudentApplicationForm = ({ isOpen, onClose, universityName }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'India',
    qualifications: '',
    stream: 'MBBS',
    experience: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: 'India',
        qualifications: '',
        stream: 'MBBS',
        experience: '',
        message: ''
      });
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="form-overlay" onClick={onClose}>
      <div className="form-modal" onClick={(e) => e.stopPropagation()}>
        {!submitted ? (
          <>
            <button className="close-btn" onClick={onClose}>✕</button>
            <div className="form-header">
              <h2>Apply Now</h2>
              <p className="university-title">{universityName}</p>
            </div>

            <form onSubmit={handleSubmit} className="application-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Enter first name"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="form-group">
                  <label>Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                  >
                    <option>India</option>
                    <option>Nepal</option>
                    <option>Bangladesh</option>
                    <option>Pakistan</option>
                    <option>Sri Lanka</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Program *</label>
                  <select
                    name="stream"
                    value={formData.stream}
                    onChange={handleChange}
                    required
                  >
                    <option>MBBS</option>
                    <option>BDS</option>
                    <option>Nursing</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Qualifications *</label>
                <textarea
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  required
                  placeholder="Describe your educational qualifications..."
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Experience (if any)</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Any relevant experience or achievements..."
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us why you're interested in this university..."
                  rows="2"
                />
              </div>

              <button type="submit" className="submit-btn">
                Submit Application
              </button>
            </form>
          </>
        ) : (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h3>Application Submitted!</h3>
            <p>Thank you for applying to {universityName}.</p>
            <p>We'll contact you soon with more information.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentApplicationForm;
