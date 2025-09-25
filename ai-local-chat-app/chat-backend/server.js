import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// Chat endpoint
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await axios.post("http://localhost:1234/v1/chat/completions", {
      model: "Qwen2.5-VL-3B-Instruct-GGUF/Qwen2.5-VL-3B-Instruct-q4_k_s.gguf", // Replace with your model name
      messages: [
        { role: "system", content: "You are a helpful AI assistant." },
        { role: "user", content: message }
      ]
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Error talking to LM Studio" });
  }
});

app.listen(5000, () => console.log("✅ Backend running on http://localhost:5000"));
