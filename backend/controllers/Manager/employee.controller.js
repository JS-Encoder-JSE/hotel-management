import Employee from "../../models/Manager/employee.model.js";

// Controller to add a new employee
export const addEmployee = async (req, res) => {
  try {
    const {
      name,
      designation,
      shift,
      sallary,
      street_address,
      state,
      city,
      zip,
      images,
    } = req.body;

    // Create a new employee instance based on the Employee model
    const newEmployee = new Employee({
      name,
      designation,
      shift,
      sallary,
      street_address,
      state,
      city,
      zip,
      images,
    });

    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();

    res.status(201).json(savedEmployee);
  } catch (error) {
    res.status(500).json({ error: "Failed to add an employee" });
  }
};

// Controller to delete an employee by ID
export const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id; // Assuming you pass the employee ID in the URL

    // Use the `findByIdAndDelete` method to delete the employee by ID
    const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete employee" });
  }
};

// Controller to update an employee by ID
export const updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id; // Assuming you pass the employee ID in the URL
    const updateFields = req.body; // Fields to be updated

    // Ensure at least one field is being updated
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({ error: "No fields to update provided" });
    }

    // Use the `findByIdAndUpdate` method to update the employee by ID
    const updatedEmployee = await Employee.findByIdAndUpdate(
      employeeId,
      { $set: updateFields }, // Use $set to update only the provided fields
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: "Failed to update employee" });
  }
};

// Controller to get all employees with filter options and pagination
export const getAllEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, filter, search } = req.query;
    const query = {};

    if (filter === "Waiter" || filter === "House_Keeper") {
      query.designation = filter;
    }
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };
    const items = await Employee.paginate(query, options);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve items" });
  }
};
