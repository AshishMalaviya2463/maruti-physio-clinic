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
    payment_data: {
      type: [
        {
          payment_date: Date,
          payment_amount: Number,
          payment_type: {
            type: String,
            enum: ["cash", "online"],
          },
        },
      ],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Patient ||
  mongoose.model("Patient", patientSchema);
