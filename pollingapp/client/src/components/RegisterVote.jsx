import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegisterVote = () => {
  const [poll, setPoll] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/polls/fetch`
        );
        setPoll([res.data.poll]);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPoll();
  }, []);

  const handleSubmit = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/polls/updateValues`,
        {
          selectedOption,
        }
      );

      alert(res.data.message);
      navigate("/view-result");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="container">
        {poll.map((p) => {
          return (
            <div className="poll-container" key={p._id}>
              <h1>{p.question}</h1>
              <div className="option-grid">
                <div
                  className={`option-box ${
                    selectedOption === "option1" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedOption("option1")}
                >
                  {p.option1}
                </div>
                <div
                  className={`option-box ${
                    selectedOption === "option2" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedOption("option2")}
                >
                  {p.option2}
                </div>
                <div
                  className={`option-box ${
                    selectedOption === "option3" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedOption("option3")}
                >
                  {p.option3}
                </div>
                <div
                  className={`option-box ${
                    selectedOption === "option4" ? "selected" : ""
                  }`}
                  onClick={() => setSelectedOption("option4")}
                >
                  {p.option4}
                </div>
                <button onClick={handleSubmit}>Submit</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegisterVote;
