import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    patient_name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    address: {
      type: String,
    },
    chief_complains: {
      type: String,
      required: true,
    },
    history: {
      type: String,
      required: true,
    },
    on_examination: {
      type: String,
      required: true,
    },
    provisional_diagnosis: {
      type: String,
      required: true,
    },
    treatment_given: {
      type: String,
      required: true,
    },
    mobile_no: {
      type: Number,
      required: true,
    },
    mouth_opening_measurement: {
      type: String,
      required: true,
    },
    starting_date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Patient ||
  mongoose.model("Patient", patientSchema);
