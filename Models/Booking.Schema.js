import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  Room_name: String,
  Room_Id: String,
  Booked_status: String,
  Customer_name: String,
  Booked_date: String,
  Entry_time: String,
  Exit_time: String
});

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;