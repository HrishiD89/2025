import express from "express";
import Poll from "../model/poll.model.js";

const pollRouter = express.Router();

pollRouter.get("/poll/fetch", async (req, res) => {
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

pollRouter.put("/poll/create", async (req, res) => {
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
        error: "Input should not be empty",
      });
    }

    const options = [option1, option2, option3, option4];
    const unqiueOption = new Set(options);

    if (unqiueOption.size != options.length) {
      return res.status(400).json({
        error: "Options should be unqiue",
      });
    }

    const existingPoll = await Poll.findOne({ question });
    if (existingPoll) {
      console.log("Poll already exists!");
      await Poll.deleteMany({});
      console.log("Previous poll deleted");
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
      message: "Poll added sucessfully",
      newPoll,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

export default pollRouter;
