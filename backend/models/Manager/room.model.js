import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ["Standard", "Deluxe", "Suite", "General"],  // Add other category options as needed
  },
  type: {
    type: String,
    enum: ["Single", "Double", "Twin"],  // Add other type options as needed
  },
  capacity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  bedSize: {
      type: String,
      enum:['SM',"LG","XL"],
    required: true
  },
  floorNumber: {
    type: Number,
    required: true
  },
  roomNumber: {
    type: Number,
    required: true
  },
  images: {
    type: Array, 
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status:{type:String,default:'Available',enum:["Available","Booked","CheckedIn"]}
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
