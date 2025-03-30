import Booking from '../models/booking.js';
import Faculty from '../models/faculty.js';

export async function Bookroom(req, res) {
  const { roomNumber, facultyId, date, startTime, endTime, reason } = req.body;

  try {
    // Check if room is already booked
    const existingBooking = await Booking.findOne({
      roomNumber,
      date,
      $or: [
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } }, 
        { startTime: { $gte: startTime, $lt: endTime } }, 
        { endTime: { $gt: startTime, $lte: endTime } }, 
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } } 
      ],
    });

    if (existingBooking) {
      return res.status(400).json({ message: 'Room already booked for this time slot.' });
    }

    // Create new booking
    const newBooking = new Booking({ roomNumber, facultyId, date, startTime, endTime, reason });
    await newBooking.save();

    // Update faculty using the custom id field
    await Faculty.findOneAndUpdate(
      { id: facultyId }, // Use the custom faculty id field
      { $push: { bookings: newBooking._id } }
    );

    res.status(201).json({ message: 'Room booked successfully!', booking: newBooking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
}
