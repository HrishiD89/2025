import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">CreatePoll</Link>{" "}
          </li>
          <li>
            <Link to="/register-vote">RegisterVote</Link>{" "}
          </li>
          <li>
            <Link to="/view-result">ViewResult</Link>{" "}
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Layout;
