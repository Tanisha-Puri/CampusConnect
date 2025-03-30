import React, { useState } from 'react';
import axios from 'axios';

function BookingForm() {
  const [formData, setFormData] = useState({
    roomNumber: '',
    facultyId: '',
    date: '',
    startTime: '',
    endTime: '',
    reason: ''
  });
  const [message, setMessage] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/room/submit', formData);
      setMessage(res.data.message);
    } catch (error) {
      console.error(error);
      // Check if error.response exists
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error booking room: Network error or server is not available');
      }
    }
  };
  

  return (
    <div>
      <h2>Book a Room</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Room Number:</label>
          <input
            type="text"
            name="roomNumber"
            value={formData.roomNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Faculty ID:</label>
          <input
            type="text"
            name="facultyId"
            value={formData.facultyId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Reason:</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Book Room</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default BookingForm;
