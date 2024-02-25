import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { gsap } from "gsap";
import axios from "axios";

const BetaPage = () => {
  const [isDeatial, setIsDetail] = useState(false);
  const [email, setEmail] = useState("");
  const [dots, setDots] = useState("...");

  const containerRef = useRef(null);
  const handleCloseClick = (value) => {
    if (value === "open") {
      setIsDetail(true);
    } else {
      setIsDetail(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => {
        // Rotate the three dots
        return prevDots === "..." ? "." : prevDots === "." ? ".." : "...";
      });
    }, 500); // Change the interval as needed

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);
  useEffect(() => {
    if (isDeatial) {
      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      tl.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 1 }
      );

      return () => {
        tl.kill(); // Kill the animation on unmount
      };
    }
  }, [isDeatial]);

  const emailHandler = async () => {
    if (!email) return;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gi;
    if (!emailRegex.test(email)) {
      console.log(
        "Please show error message here: Provided mail is not a valid mail."
      );
      return;
    }
    const data = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/user/beta-mail`,
      { userMail: email }
    );
    try {
      setEmail("");
    } catch (err) {
      console.log("err", err);
    }
    console.log(
      "Show a success message here if the api is responding with 200 else show error message put the condition in try and catch"
    );
  };
  return (
    <>
      <div className="navbar">
        <img src="/projectoLogo-bg.png" alt="logo" />
      </div>
      {!isDeatial ? (
        <div class="wrapper">
          <div className="content--wrapper">
            <h5 className="pre-head">Projectó</h5>
            <h1 className="heading">
              Coming Soon <span>{dots}</span>
            </h1>
            <div className="desc">
              <p>
                Revolutionize project planning effortlessly with our multiple
                products, soon to launch on your personalised subdomain
              </p>
            </div>
            <div className="btn--wrapper">
              <button
                className="btn"
                onClick={() => {
                  handleCloseClick("open");
                }}
              >
                Join Us
              </button>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      ) : (
        <div className="close-container" ref={containerRef}>
          <div className="close-container-logo">
            <span
              onClick={() => {
                handleCloseClick();
              }}
            >
              <i class="fa-regular fa-circle-xmark"></i>
            </span>
          </div>
          <div className="close-content--wrapper">
            <div className="close-heading">Get private beta access</div>
            <div className="close-desc">
              <p>
                We invite you to join us on the exciting journey of refining our
                project planning tools. Your expertise and collaboration will
                play a pivotal role in enhancing our capabilities. <br />
              </p>
            </div>
            <div className="form-wrapper">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <button
                className="close-btn--wrapper"
                onClick={() => {
                  emailHandler();
                }}
              >
                Join Beta
              </button>
            </div>
            <p>
              We look forward to having you onboard for this professional and
              impactful endeavor.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default BetaPage;
