import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const Greet = ({ token }) => {
  useEffect(() => {
    if (!token) {
      window.location.href = "/"; // Redirect to login page
    }
  }, [token]);

  const [greet,setGreet] = useState("");

  useEffect(() => {
    try {
      const fetchGreet = async () => {
        const res = await axios.get("http://localhost:8080/greet", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGreet(res.data.message);
      };

      fetchGreet();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="flex justify-center items-center h-screen bg-green-100">
      <h1 className="text-3xl font-bold text-green-700">
        🎉 {greet}.
      </h1>
    </div>
  );
};

export default Greet;
