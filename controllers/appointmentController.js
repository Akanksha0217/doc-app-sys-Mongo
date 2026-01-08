const appointment = require("../models/appointmentModel");

async function createAppointment(req, res) {
  try {
    let  { dateTime, doctorId } = req.body;
    createdBy = req.user.id;
    userID = req.user.id
    console.log(req.body,createdBy, userID)
    dateTime = new Date(dateTime+'Z')
    const newAppoint = await appointment.create({userID, dateTime, doctorId, createdBy });
    console.log(newAppoint)
    newAppoint.save()
    if (!newAppoint) {
      res.status(200).send({ msg: "appointment not created", success: false });
    }
    res
      .status(200)
      .send({ msg: "appointment created successfully", success: true });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}

async function statusUpdateByDoctor(req, res) {
  const { ID } = req.params;
  console.log(ID, "________id_______");
  try {
    const updatedAppointment = await appointment.findByIdAndUpdate(ID, {
        $set:{
            status:req.body.status
        }
    },
        { new: true, runValidators: true });
    console.log(updatedAppointment, "updatedAppointment");
    if (!updatedAppointment) {
      res.status(200).send({ msg: "appointment not updated", success: false });
    }
    res
      .status(200)
      .send({ msg: "appointments status updated successfully", success: true });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}



async function updateAppointment(req, res) {
  try {
    const { ID } = req.params;   // appointment id
    const { dateTime, doctorId } = req.body;
    const userId = req.user.id;  // logged-in user

    // Validate input
    if (!dateTime || !doctorId) {
      return res.status(400).json({
        msg: "dateTime and doctorId are required",
        success: false,
      });
    }

    // Find appointment by ID
    const appointmentData = await appointment.findById(ID);

    if (!appointmentData) {
      return res.status(404).json({
        msg: "Appointment not found",
        success: false,
      });
    }

    // Check if the user is the creator (authorization)
    if (appointmentData.createdBy.toString() !== userId) {
      return res.status(403).json({
        msg: "Unauthorized",
        success: false,
      });
    }

    // Update fields
    appointmentData.dateTime = new Date(dateTime);
    appointmentData.doctorId = doctorId;
    appointmentData.updatedBy = userId;

    // Save updated appointment
    await appointmentData.save();

    return res.status(200).json({
      msg: "Appointment updated successfully",
      success: true,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Server Error",
      success: false,
    });
  }
}




async function deleteAppointment(req, res) {
  try {
    const { ID } = req.params;
     const userId = req.user.id;

    const appointmentData = await appointment.findById(ID);

if (!appointmentData) {
      return res.status(404).json({
        msg: "Appointment not found",
        success: false,
      });}

   // Check authorization (only creator can delete)
    if (appointmentData.createdBy.toString() !== userId) {
      return res.status(403).json({
        msg: "Unauthorized",
        success: false,
      });
    }

   // Delete the appointment
    await appointment.findByIdAndDelete(ID);

    return res.status(200).json({
      msg: "Appointment deleted successfully",
      success: true,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
}

async function getAppointmentsByUser(req, res) {
const uId =req.user.id
  try {
    const appointments = await appointment.find({userID:uId});
    if(await appointment.countDocuments({}) == 0){
      res.status(400).send({ msg: "No appointments yet" });
    }
    // appointments.dateTime = appointments.dateTime
    res.status(200).send({ appointments: appointments, success: true });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}

async function showAppointmentsOfDoctor(req, res) {
  try {
    // req.userid (docotr id )

    const appointments = await appointment.findAll({
      where: { doctorId: req.user.id },
    });
    if (appointments.length == 0) {
      res.status(400).send({ msg: "No appointments yet" });
    }
    res.status(200).send({ appointments: appointments, success: true });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
}

module.exports = {
  createAppointment,
  statusUpdateByDoctor,
  updateAppointment,
  deleteAppointment,
  getAppointmentsByUser,
  showAppointmentsOfDoctor,
};