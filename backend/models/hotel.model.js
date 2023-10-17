import mongoose from 'mongoose';

const RoomsSchema = new mongoose.Schema({
    room_no: {type: Number, required: true},
    floor: {type: Number, required: true},
    type: {type: String, required: true},
    ac_status: {type:Boolean, default: false},
    
})

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  address: String,
  numberOfFloors: Number,
  managers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
  }],
  rooms:[RoomsSchema]
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
