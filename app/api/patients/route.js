import patientSchema from "@/utils/db/models/patientSchema";
import { connectToDB } from "@/utils/db/mongodb";
import { NextResponse } from "next/server";

// export async function GET(request) {
//   try {
//     await connectToDB();

//     // const { searchParams } = new URL(request.url);
//     // const page = parseInt(searchParams.get("page")) || 1;
//     // const pageSize = parseInt(searchParams.get("pageSize")) || 10;
//     // const search = searchParams.get("search")?.trim() || "";

//     // const skip = (page - 1) * pageSize;

//     //  if (search) {
//     //     query = {
//     //       $or: [
//     //         { patient_name: { $regex: search, $options: "i" } },
//     //         { mobile_no: { $regex: search, $options: "i" } },
//     //         // { address: { $regex: search, $options: "i" } },
//     //         // { chief_complains: { $regex: search, $options: "i" } },
//     //       ],
//     //     };
//     //   } let query = {};

//     const rawPatients = await patientSchema.find().sort({ starting_date: -1 });
//     // .skip(skip)
//     // .limit(pageSize);

//     const patients = rawPatients.map((patient) => {
//       const obj = patient.toObject();
//       const { _id, __v, ...rest } = obj;
//       return {
//         id: _id.toString(),
//         ...rest,
//       };
//     });

//     // const totalCount = await patientSchema.countDocuments(query);

//     // console.log("totalCount", totalCount);
//     // console.log("page", page);
//     // console.log("pageSize", pageSize);

//     return NextResponse.json(
//       {
//         data: patients,
//         // total_records: totalCount,
//         // total_pages: Math.ceil(totalCount / pageSize),
//         // page,
//         // pageSize,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Error fetching patient records",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request) {
  try {
    await connectToDB();

    const rawPatients = await patientSchema.find().sort({ starting_date: -1 });

    const patients = rawPatients.map((patient) => {
      const obj = patient.toObject();
      const { _id, __v, ...rest } = obj;
      return {
        id: _id.toString(),
        payment_data: [],
        ...rest,
      };
    });

    return NextResponse.json(
      {
        data: patients,
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

export async function PUT(req, res) {
  try {
    const requestJson = await req.json();

    await connectToDB();

    const { id, ...rest } = requestJson;

    const updatedPatient = await patientSchema.findByIdAndUpdate(
      id,
      { ...rest },
      { new: true }
    );
    return NextResponse.json(
      {
        message: "Patient record updated successfully",
        data: updatedPatient,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error updating patient record",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    const { id, payment_data } = await req.json();

    if (!id || !payment_data) {
      return NextResponse.json(
        { message: "Patient ID and payment data are required." },
        { status: 400 }
      );
    }

    await connectToDB();

    // Push the new payment entry to the array
    const updatedPatient = await patientSchema.findByIdAndUpdate(
      id,
      {
        $push: {
          payment_data,
        },
      },
      { new: true } // return the updated document
    );

    if (!updatedPatient) {
      return NextResponse.json(
        { message: "Patient not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Payment data added successfully",
        data: updatedPatient,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error adding payment data",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req, res) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await connectToDB();

    const deletedPatient = await patientSchema.findByIdAndDelete(id);

    return NextResponse.json(
      {
        message: "Patient record deleted successfully",
        data: deletedPatient,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error deleting patient record",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
