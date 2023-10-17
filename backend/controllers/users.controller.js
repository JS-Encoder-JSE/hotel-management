import  User from '../models/user.model.js';
import Hotel from '../models/hotel.model.js';

export const addOwner = async (req, res) => {
  try {
    const { username, password, maxHotels } = req.body;
    
    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new owner user
    const owner = new User({
      username,
      password,
      role: 'owner',
      maxHotels,
    });

    await owner.save();

    res.status(201).json({ message: 'Owner added successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const addManager = async (req, res) => {
  try {
    const { username, password, assignedHotelId } = req.body;

    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Create a new manager user
    const manager = new User({
      username,
      password,
      role: 'manager',
      assignedHotel: assignedHotelId,
    });

    await manager.save();

    // Update the assigned hotel to include the manager
    await Hotel.findByIdAndUpdate(assignedHotelId, { $push: { managers: manager._id } });

    res.status(201).json({ message: 'Manager added and assigned to the hotel successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createSuperUser = async () => {
    try {
      const username = 'superuser';
      const password = 'superuserpassword';
  
      // Check if a superuser with the same username already exists
      const existingSuperUser = await User.findOne({ username });
      if (existingSuperUser) {
        console.log('Superuser already exists.');
        return;
      }
  
      // Create a new superuser
      const superuser = new User({
        username,
        password,
        role: 'superuser',
      });
  
      await superuser.save();
  
      console.log('Superuser created successfully.');
    } catch (error) {
      console.error('Error creating superuser:', error.message);
    }
  };
  