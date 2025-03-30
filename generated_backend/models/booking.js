import mongoose from "mongoose";
import Faculty from "../models/faculty.js";

const bookingSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  facultyId: { type: String, required: true },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  reason: { type: String },
  createdAt: { type: Date, default: Date.now }, // No TTL index here
});

// Convert date + endTime into an expiration timestamp
bookingSchema.pre("save", function (next) {
  const [hours, minutes] = this.endTime.split(":").map(Number); // Assuming "HH:MM" format
  const bookingDate = new Date(this.date);
  bookingDate.setHours(hours, minutes, 0, 0); // Set to endTime
  this.createdAt = bookingDate; // Used for expiration check
  next();
});

// Function to clean expired bookings
const cleanExpiredBookings = async () => {
  const now = new Date();
  const expiredBookings = await Booking.find({ createdAt: { $lt: now } });

  for (const booking of expiredBookings) {
    // Querying using the custom field (if that's how you store faculty id)
    await Faculty.findOneAndUpdate(
      { id: booking.facultyId },
      { $pull: { bookings: booking._id } } // Using ObjectId directly
    );
    await Booking.findByIdAndDelete(booking._id);
  }
};

// Run cleanup every minute (adjust interval as needed)
setInterval(cleanExpiredBookings, 1 * 60 * 1000);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
