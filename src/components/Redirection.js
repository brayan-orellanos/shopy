import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Redirection = () => {
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("items");
    navigate("/");
  }, []);

  return (
    <div>
      <h1>fdfdfd</h1>
    </div>
  );
};

export default Redirection;
