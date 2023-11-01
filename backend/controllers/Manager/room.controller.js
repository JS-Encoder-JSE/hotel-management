import Room from '../../models/Manager/room.model.js'; // Assuming the Room model file path

// add room 
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
      description
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
      description
    });

    const savedRoom = await newRoom.save();

    res.status(201).json({
      success: true,
      data: savedRoom,
      message: 'Room added successfully'
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: error,
      message:'Internal Server Error'
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
    res.status(500).json({
      success: false,
      error: 'Internal Server Error'
    });
  }
};




