import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./page/Register";
import Login from "./page/Login";
import { useState } from "react";
import Greet from "./page/Greet";

const App = () => {
  const [token, setToken] = useState(null);

  const handleToken = (token) => {
    setToken(token);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={handleToken}/>}  />
        <Route path="/register" element={<Register />} />
        <Route path="/greet"  element={<Greet token={token}/>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
