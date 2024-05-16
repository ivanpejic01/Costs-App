import React from "react";
import "./styles/home.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };
  return (
    <div className="home-page">
      <div className="rectangle" onClick={() => handleClick("/user")}>
        Profil korisnika
      </div>
      <div className="rectangle" onClick={() => handleClick("/description")}>
        Opis aplikacije
      </div>
      <div className="rectangle" onClick={() => handleClick("/author")}>
        O autoru
      </div>
      <div className="rectangle">Prazno</div>
    </div>
  );
}
