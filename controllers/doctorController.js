import Doctor from "../models/Doctor.js";
import User from "../models/userModel.js";

const applyDoctor = async (req, res) => {
  try {
    const { specialist, fees } = req.body;
    const createdBy = req.user.id;
    const userID = req.user.id;
    console.log(req.body, createdBy, "********");
    const newDoc = await Doctor.create({ userID, specialist, fees, createdBy });
    console.log(newDoc, "&&&&&&&&&&&&&&newDoc");
    await newDoc.save();
    console.log(newDoc, "&&&&&&&&&&&&&&newDoc");
    if (newDoc) {
      res
        .status(200)
        .send({ msg: "doctor applied successfully", success: true });
    } else {
      res
        .status(200)
        .send({ msg: "doctor not applied successfully", success: false });
    }
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
};

// 
const docStatus = async (req, res) => {
  try {
    const DoctorID = req.params.DoctorID;
    const { status } = req.body;

    const getDoctor = await Doctor.findById(DoctorID);

    if (!getDoctor) {
      return res.status(404).send({
        success: false,
        msg: "Doctor not found",
      });
    }

    // Update doctor status
    const updatedDoc = await Doctor.findByIdAndUpdate(
      DoctorID,
      { status },
      { new: true }
    );

    // If accepted → update user role
    if (status === "Accepted") {
      await User.findByIdAndUpdate(updatedDoc.userID, {
        role: "Doctor",
      });

      return res.status(200).send({
        success: true,
        msg: "Doctor approved successfully",
      });
    }

    // For Reject / Pending
    return res.status(200).send({
      success: true,
      msg: "Doctor status updated successfully",
    });

  } catch (error) {
    console.error("docStatus error:", error);
    return res.status(500).send({
      success: false,
      msg: "Server Error",
    });
  }
};





const getDoctorList = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("userID");
    console.log(doctors)
    res.status(200).send({
      success: true,
      doctors,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      msg: "Error fetching doctors",
    });
  }
};


export { applyDoctor,docStatus,getDoctorList}