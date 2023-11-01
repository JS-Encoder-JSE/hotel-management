import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  roomNumber: {
    type: Array,
    required: true
  },
  guestName: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  adult: {
    type: Number,
    required: true
  },
  children: {
    type: Number,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['Credit Card', 'Debit Card', 'Cash','Mobile Banking'],
    required: true
  },
  discount: {
    type: Number,
    default: 0
  },
  from: { type: Date, required: true, },
  to:{type:Date, required:true},
  document: {
    type: String // Assuming you'll store a link or file path to the document
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
