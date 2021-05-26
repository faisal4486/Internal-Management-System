import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../styles/TeamM.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";

const TeamM = () => {
  const { team } = useParams();
  const [teamArray, setTeamArray] = useState([]);
  const [teamImage, setTeamImage] = useState("");
  let index = 200;
  let alt = true;

  const setAlt = () => {
    alt = !alt;
    return alt ? "alt" : "";
  };

  const fetchMember = async () => {
    const response = await axios.get(
      `http://localhost/IMS/API/T_Member_fetch.php?team=${team}`
    );

    setTeamArray(response.data);
  };

  const fetchTeam = async () => {
    const response = await axios.get(
      `http://localhost/IMS/API/TeamName_fetch.php?Team_name=${team}`
    );

    setTeamImage(response.data[0].Team_image);
  };

  //   console.log(projectArray);

  useEffect(() => {
    fetchMember();
    fetchTeam();
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div
      className="team-members"
      style={{
        width: "100vw",
        marginTop: 0,
        paddingTop: "55px",
        backgroundImage: `url(${teamImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h2
        style={{ borderBottom: "2px solid blueviolet", textAlign: "center" }}
        data-aos="fade-down"
        data-aos-duration="800"
      >
        Team Members
      </h2>
      <p data-aos="fade-up" data-aos-duration="800">
        Members of Team {team}!
      </p>
      {/* <button
        className="submit logout"
        type="submit"
        align="right"
        data-aos="fade-down-left"
        data-aos-duration="800"
      >
        Log out
      </button> */}

      <div className="our-team">
        {teamArray &&
          teamArray.map((team) => (
            <>
              <div
                className={`blog-card ${alt} ? ${setAlt()} : ""`}
                data-aos={`${alt ? "fade-left" : "fade-right"}`}
                data-aos-duration={index > 400 ? 800 : (index += 200)}
              >
                <div className="meta">
                  <div
                    className="photo"
                    style={{ backgroundImage: "url(" + team.image + ")" }}
                  ></div>
                  <ul className="details">
                    {/* `<li className="author">
                      <a href="#">Contact No.</a>
                    </li>
                    <li className="date">Aug. 24, 2015</li>
                    <li className="tags">
                      <ul>
                        <li>
                          <a href="#">Learn</a>
                        </li>
                        <li>
                          <a href="#">Code</a>
                        </li>
                        <li>
                          <a href="#">HTML</a>
                        </li>
                        <li>
                          <a href="#">CSS</a>
                        </li>
                      </ul>
                    </li>` */}
                  </ul>
                </div>
                <div className="description">
                  <h1>{team.name}</h1>
                  <h2>
                    {team.status} of Team {team.team}
                  </h2>
                  <p> {team.skills}</p>
                </div>
              </div>
              <br />
            </>
          ))}
      </div>
    </div>
  );
};

export default TeamM;
