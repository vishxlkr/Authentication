import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, "Please add a name"],
      },
      email: {
         type: String,
         required: [true, "Please add an email"],
         unique: true,
         match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
         ],
      },
      password: {
         type: String,
         required: [true, "Please add a password"],
         minlength: 6,
      },
      isVerified: {
         type: Boolean,
         default: false,
      },
      otp: {
         type: String,
      },
      otpExpires: {
         type: Date,
      },
   },
   {
      timestamps: true,
   }
);

// Encrypt password using bcrypt before saving the document
userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
   return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
