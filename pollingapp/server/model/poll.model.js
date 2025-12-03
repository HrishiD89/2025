import mongoose from "mongoose";

const Poll = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    option1: {
      type: String,
      required: true,
    },
    option2: { type: String, required: true },
    option3: { type: String, required: true },
    option4: { type: String, required: true },
    option1vote: {
      type: Number,
      default: 0,
    },
    option2vote: {
      type: Number,
      default: 0,
    },
    option3vote: {
      type: Number,
      default: 0,
    },
    option4vote: {
      type: Number,
      default: 0,
    },
    option1votePercentage: {
      type: Number,
      default: 0,
    },
    option2votePercentage: {
      type: Number,
      default: 0,
    },
    option3votePercentage: {
      type: Number,
      default: 0,
    },
    option4votePercentage: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Poll", Poll);
