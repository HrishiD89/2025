import axios from "axios";
import React, { useEffect, useState } from "react";

const ViewResult = () => {
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/polls/fetch`
        );
        setPoll(res.data.poll);
      } catch (err) {
        console.log(err);
      }
    };

    fetchPoll();
  }, []);

  if (!poll) return <h1>No Poll Found!</h1>;

  const options = [
    { label: poll.option1, percent: poll.option1votePercentage },
    { label: poll.option2, percent: poll.option2votePercentage },
    { label: poll.option3, percent: poll.option3votePercentage },
    { label: poll.option4, percent: poll.option4votePercentage },
  ];

  return (
    <div className="container">
      <div className="poll-container">
        <h1>{poll.question}</h1>

        <div className="result-grid">
          {options.map((opt, index) => (
            <div
              key={index}
              className="result-box"
              style={{
                background: `linear-gradient(
                  to left,
                  #4caf50 ${opt.percent}%,
                  #ffffff ${opt.percent}%
                )`,
              }}
            >
              <span>{opt.label}</span>
              <span>{opt.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewResult;
