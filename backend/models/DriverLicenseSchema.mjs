import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const driverLicenseSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    lastName: {
        type: String,
        required: [true, "Please add your last name"]
    },
    name: {
        type: String,
        required: [true, "Please add your name"]
    },
    birthdate: {
        type: Date,
        required: [true, "Please add your birthdate"]
    },
    licenseType: {
        type: String,
        required: [true, "Please select a license type"],
        enum: ["AM", "A1", "A2", "A", "B1", "B", "C1", "C", "D1", "D", "BE", "C1E", "CE", "D1E", "DE"]
    },
    isApproved: {
        type: Boolean,
        default: false
    }

});

// driverLicenseSchema.pre("save", async function(next) {

//     this.name = await bcrypt.hash(this.name, 12);
// });

export default mongoose.model("DriverLicense", driverLicenseSchema);