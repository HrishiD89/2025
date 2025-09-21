import mongoose from "mongoose";

const courseSchema = mongoose.Schema(
  {
    courseName: { type: String, required: true },
    courseDept: { type: String, required: true },
    description: String,
    duration: Number,
    noOfRatings: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    isApplied: { type: Boolean, default: false },
    isRated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
