import Booking from "../Models/Booking.Schema.js";



export const CreateHallBooking = async (req, res) => {
  const { Room_name, Booked_status, Customer_name, Booked_date, Entry_time, Exit_time } = req.body;

  try {
    const existingBooking = await Booking.findOne({ Booked_date });

    if (existingBooking) {
      res.status(400).json({ message: "Already booked on the given date" });
    } else {
      const newBooking = await Booking.create({
        Room_name,
        Booked_status,
        Customer_name,
        Booked_date,
        Entry_time,
        Exit_time
      });

      res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getdetail = async (req, res) => {
  try {
    const allBookings = await Booking.find();

    res.status(200).json({ bookings: allBookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const GetRoomdata = async (req, res) => {
  try {
    const roomData = await Booking.find({ Booked_status: "booked" });

    if (!roomData.length) {
      res.status(404).json({ message: "Data not found" });
    } else {
      const collection = roomData.map(room => ({
        Room_name: room.Room_name,
        Booked_status: room.Booked_status,
        Customer_name: room.Customer_name,
        Booked_date: room.Booked_date,
        Entry_time: room.Entry_time,
        Exit_time: room.Exit_time,
      }));

      res.status(200).json({ message: collection });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const GetCustomerData = async (req, res) => {
  try {
    const bookedRooms = await Booking.find({ Booked_status: "booked" });

    if (!bookedRooms.length) {
      return res.status(404).json({ message: 'No booked rooms found' });
    }else{

    const collection = bookedRooms.map(booking => ({
      Booked_status: booking.Booked_status,
      Customer_name: booking.Customer_name,
      Booked_date: booking.Booked_date,
      Entry_time: booking.Entry_time,
      Exit_time: booking.Exit_time,
    }));

    res.status(200).json({ data: collection });
  }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



export const getCustomerMulBookings = async (req, res) => {
  try {
    const customerCounts = {};
    const customersWithMultipleBookings = [];

    const bookings = await Booking.find({ Booked_status: 'booked' });

    bookings.forEach(booking => {
      const customerName = booking.Customer_name?.toLowerCase();
      customerCounts[customerName] = (customerCounts[customerName] || 0) + 1;

      if (customerCounts[customerName] > 1) {
        customersWithMultipleBookings.push({
          Customer_name: booking.Customer_name,
          Booked_date: booking.Booked_date,
          Entry_time: booking.Entry_time,
          Exit_time: booking.Exit_time,
        });
      }
    });

    if (customersWithMultipleBookings.length === 0) {
      return res.status(404).json({ message: 'No customers with multiple bookings found' });
    }

    res.status(200).json({ customersWithMultipleBookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





