import express from "express";
import Poll from "../model/poll.model.js";

const pollRouter = express.Router();

pollRouter.get("/polls/fetch", async (req, res) => {
  try {
    const poll = await Poll.findOne();
    if (!poll || poll.length === 0) {
      return res.status(400).json({
        error: "No Poll is found!",
      });
    }

    res.status(200).json({
      message: "Poll created sucessfully!",
      poll,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

pollRouter.put("/polls/create", async (req, res) => {
  try {
    const { question, option1, option2, option3, option4 } = req.body;
    if (
      !question.trim() ||
      !option1.trim() ||
      !option2.trim() ||
      !option3.trim() ||
      !option4.trim()
    ) {
      return res.status(400).json({
        error: "Input should not be empty!",
      });
    }

    const options = [option1, option2, option3, option4];
    const unqiueOption = new Set(options);

    if (unqiueOption.size != options.length) {
      return res.status(400).json({
        error: "Options should be unqiue!",
      });
    }

    const existingPoll = await Poll.findOne({ question });
    if (existingPoll) {
      console.log("Poll already exists!");
      await Poll.deleteMany({});
      console.log("Previous poll deleted!");
    }

    const newPoll = await Poll.create({
      question,
      option1,
      option2,
      option3,
      option4,
    });

    console.log(newPoll);

    res.status(200).json({
      message: "Poll added sucessfully!",
      newPoll,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

pollRouter.patch("/polls/updateValues", async (req, res) => {
  try {
    const { selectedOption } = req.body;
    console.log("📊 Received vote for:", selectedOption);

    const poll = await Poll.findOne();

    if (!poll || poll.length === 0) {
      return res.status(400).json({
        error: "No Poll is found!",
      });
    }

    console.log("📋 Current poll options:", {
      option1: poll.option1,
      option2: poll.option2,
      option3: poll.option3,
      option4: poll.option4,
    });

    console.log("🔍 Before vote - Counts:", {
      option1vote: poll.option1vote,
      option2vote: poll.option2vote,
      option3vote: poll.option3vote,
      option4vote: poll.option4vote,
    });

    if (selectedOption === "option1") poll.option1vote += 1;
    if (selectedOption === "option2") poll.option2vote += 1;
    if (selectedOption === "option3") poll.option3vote += 1;
    if (selectedOption === "option4") poll.option4vote += 1;

    console.log("✅ After vote - Counts:", {
      option1vote: poll.option1vote,
      option2vote: poll.option2vote,
      option3vote: poll.option3vote,
      option4vote: poll.option4vote,
    });

    let totalVote =
      poll.option1vote + poll.option2vote + poll.option3vote + poll.option4vote;

    if (totalVote > 0) {
      poll.option1votePercentage = parseFloat(
        ((poll.option1vote / totalVote) * 100).toFixed(2)
      );
      poll.option2votePercentage = parseFloat(
        ((poll.option2vote / totalVote) * 100).toFixed(2)
      );
      poll.option3votePercentage = parseFloat(
        ((poll.option3vote / totalVote) * 100).toFixed(2)
      );
      poll.option4votePercentage = parseFloat(
        ((poll.option4vote / totalVote) * 100).toFixed(2)
      );
    } else {
      poll.option1votePercentage = 0;
      poll.option2votePercentage = 0;
      poll.option3votePercentage = 0;
      poll.option4votePercentage = 0;
    }

    const updatePoll = await poll.save();

    res.status(200).json({
      message: "Poll updated sucessfully!",
      updatePoll,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

export default pollRouter;
