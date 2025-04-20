import patientSchema from "@/utils/db/models/patientSchema";
import { connectToDB } from "@/utils/db/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const pageSize = parseInt(searchParams.get("pageSize")) || 10;
    const search = searchParams.get("search")?.trim() || "";

    const skip = (page - 1) * pageSize;

    let query = {};
    if (search) {
      query = {
        $or: [
          { patient_name: { $regex: search, $options: "i" } },
          { mobile_no: { $regex: search, $options: "i" } },
          // { address: { $regex: search, $options: "i" } },
          // { chief_complains: { $regex: search, $options: "i" } },
        ],
      };
    }

    const rawPatients = await patientSchema
      .find(query)
      .sort({ starting_date: -1 })
      .skip(skip)
      .limit(pageSize);

    const patients = rawPatients.map((patient) => {
      const obj = patient.toObject();
      const { _id, __v, ...rest } = obj;
      return {
        id: _id.toString(),
        ...rest,
      };
    });

    const totalCount = await patientSchema.countDocuments(query);

    console.log("totalCount", totalCount);
    console.log("page", page);
    console.log("pageSize", pageSize);

    return NextResponse.json(
      {
        data: patients,
        total_records: totalCount,
        total_pages: Math.ceil(totalCount / pageSize),
        page,
        pageSize,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error fetching patient records",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  try {
    const requestJson = await req.json();

    await connectToDB();

    const newPatient = new patientSchema(requestJson);
    await newPatient.save();

    console.log("newPatient", newPatient);

    return NextResponse.json(
      {
        message: "Patient record created successfully",
        data: newPatient,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error creating patient record",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
