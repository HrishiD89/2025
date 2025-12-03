import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !question.trim() ||
      !option1.trim() ||
      !option2.trim() ||
      !option3.trim() ||
      !option4.trim()
    ) {
      return alert("Input should not be empty!");
    }

    const newPoll = {
      question,
      option1,
      option2,
      option3,
      option4,
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/polls/create`,
        newPoll
      );

      clearFields();

      alert(res.data.message);
      navigate("/register-vote");
    } catch (err) {
      console.log(err);
    }
  };

  const clearFields = () => {
    setQuestion("");
    setOption1("");
    setOption3("");
    setOption4("");
  };

  return (
    <div className="container">
      <h1>Create Poll</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="question"
          placeholder="question"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <input
          type="text"
          name="option1"
          placeholder="option1"
          onChange={(e) => setOption1(e.target.value)}
        />
        <input
          type="text"
          name="option2"
          placeholder="option2"
          onChange={(e) => setOption2(e.target.value)}
        />
        <input
          type="text"
          name="option3"
          placeholder="option3"
          onChange={(e) => setOption3(e.target.value)}
        />
        <input
          type="text"
          name="option4"
          placeholder="option4"
          onChange={(e) => setOption4(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePoll;
