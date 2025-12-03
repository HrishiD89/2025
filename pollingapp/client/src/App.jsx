import { Routes, Route } from "react-router-dom";
import CreatePoll from "./components/CreatePoll";
import RegisterVote from "./components/RegisterVote";
import ViewResult from "./components/ViewResult";
import Layout from "./page/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CreatePoll />} />
        <Route path="/register-vote" element={<RegisterVote />} />
        <Route path="/view-result" element={<ViewResult />} />
      </Route>
    </Routes>
  );
}

export default App;
