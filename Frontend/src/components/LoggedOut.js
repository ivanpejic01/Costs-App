import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles/loggedout.css";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function LoggedOut() {
  const { isAuthenticated } = useAuth0();
  const { user } = useAuth0();
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
  };

  const { loginWithRedirect } = useAuth0();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
  };
  return (
    <div className="main-part">
      <div className="animations">
        <Slider {...settings} style={{ height: "100%" }}>
          <div className="container-animations">
            <p className="animation-description">Praćenje prihoda i troškova</p>
          </div>
          <div className="container-animations">
            <p className="animation-description">Informiranje o autoru</p>
          </div>
          <div className="container-animations">
            <p className="animation-description">Dodatne mogućnosti</p>
          </div>
        </Slider>
      </div>
      <div className="home-and-login">
        <div className="login" onClick={() => handleClick("/")}>
          <p>Povratak na početnu stranicu</p>
        </div>
        {isAuthenticated ? (
          <div className="login-no-hover">
            Korisnik prijavljen kao: {user.name}
          </div>
        ) : (
          <div className="login" onClick={() => loginWithRedirect()}>
            <p>Prijavi se</p>
          </div>
        )}
      </div>
    </div>
  );
}
