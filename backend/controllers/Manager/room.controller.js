import Room from '../../models/Manager/room.model.js'; // Assuming the Room model file path

//add room
export const addRoom = async (req, res) => {
  try {
    const {
      category,
      type,
      capacity,
      price,
      bedSize,
      floorNumber,
      roomNumber,
      images,
      description,
      air_conditioned,
      status,
      hotel_id
    } = req.body;

    const newRoom = new Room({
      category,
      type,
      capacity,
      price,
      bedSize,
      floorNumber,
      roomNumber,
      images,
      description,
      air_conditioned,
      status,
      hotel_id
    });

    const savedRoom = await newRoom.save();

    res.status(201).json({
      success: true,
      data: savedRoom,
      message: 'Room added successfully'
    });
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        error: error,
        message: 'Validation error'
      });
    } else {
      res.status(500).json({
        success: false,
        error: error,
        message: 'Internal Server Error'
      });
    }
  }
};

// get rooms by hotel Id 

export const getRoomsByHotelId = async (req, res) => {
  try {
    const { hotel_id } = req.params; // Assuming you're passing `hotel_id` as a route parameter
    const { category, type, status, search } = req.query; // Allow query parameters for filtering and searching

    // Construct the filter object based on the query parameters
    const filter = {
      hotel_id,
    };

    if (category) {
      filter.category = category;
    }

    if (type) {
      filter.type = type;
    }

    if (status) {
      filter.status = status;
    }

    // Add a search condition based on the "search" query parameter
    if (search) {
      filter.$or = [
        { description: { $regex: search, $options: 'i' } }, // Case-insensitive search on the description field
        // Add additional fields for searching if needed
      ];
    }

    // Query the database with the constructed filter
    const rooms = await Room.find(filter);

    res.status(200).json({
      success: true,
      data: rooms,
      message: 'Rooms retrieved successfully'
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error,
      message: 'Internal Server Error'
    });
  }
};



// get room by id 
export const getRoomById = async (req, res) => {
    try {
      const roomId = req.params.roomId; // Assuming you're passing the room ID as a parameter
      const room = await Room.findById(roomId);
  
      if (!room) {
        return res.status(404).json({
          success: false,
          error: 'Room not found'
        });
      }
  
      res.status(200).json({
        success: true,
        data: room,
        message: 'Room retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }
  };
  
// get all rooms 
export const getAllRooms = async (req, res) => {

  try {
    // getting only room numbers 
    const only_for_room = req.query.only_for_room
    if (only_for_room === 'true') {
      const rooms = await Room.find({}, 'category _id roomNumber',);

      // send res 
      res.status(200).json({
        success: true,
        data: rooms,
        message: 'Rooms retrieved successfully'
      });
      return
}



    const { limit = 10, page = 1, ...query } = req.query;
    const parsedLimit = parseInt(limit);
    const parsedPage = parseInt(page);

    const startIndex = (parsedPage - 1) * parsedLimit;
    const endIndex = parsedPage * parsedLimit;

    const totalRooms = await Room.countDocuments(query);
    const totalPages = Math.ceil(totalRooms / parsedLimit);

    const rooms = await Room.find(query).skip(startIndex).limit(parsedLimit);

    const paginationInfo = {
      totalRooms,
      totalPages,
      currentPage: parsedPage,
      limit: parsedLimit
    };


    res.status(200).json({
      success: true,
      data: rooms,
      pagination: paginationInfo,
      message: 'Rooms retrieved successfully'
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};


// update room 
export const updateRoom = async (req, res) => {
  try {
      
    const roomId = req.params.roomId; // Assuming you pass the booking ID in the request body
        const updateData = req.body; // Object containing the fields to update
    
        const updateRoom = await Room.findByIdAndUpdate(roomId, updateData, { new: true });
    
        if (!updateRoom) {
          return res.status(404).json({
            success: false,
            error: 'Room not found'
          });
        }
    
        res.status(200).json({
          success: true,
          data: updateRoom,
          message: 'Room updated successfully'
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Internal Server Error'
        });
      }
}

// delete room 
export const deleteRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId; // Assuming you pass the booking ID in the request body
        const deleteRoom = await Room.findByIdAndDelete(roomId);
        if (!deleteRoom) {
          return res.status(404).json({
            success: false,
            error: 'Room not found'
          });
        }
    
        res.status(200).json({
          success: true,
          message: 'Room deleted successfully'
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          error: 'Internal Server Error'
        });
      }
}



