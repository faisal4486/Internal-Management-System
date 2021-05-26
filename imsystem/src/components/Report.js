import React, { useEffect, useState } from "react";
import "../styles/Report.css";
import { Link, useParams } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

import axios from "axios";

function Report() {
  const { team } = useParams();
  const [teamArray, setTeamArray] = useState([]);
  let index = 200;

  const fetchTeam = async () => {
    const response = await axios.get(`http://localhost/IMS/API/Team_fetch.php`);

    setTeamArray(response.data);
  };

  let newTeamArr = [];

  newTeamArr = teamArray.filter((team) => {
    console.log(team);
    if (team.Team_name !== "") {
      return team;
    }
  });

  console.log(teamArray);

  useEffect(() => {
    fetchTeam();
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="report" style={{ marginTop: "55px" }}>
      <h2
        style={{
          color: "#fff",
          borderBottom: "2px solid blueviolet",
          textAlign: "center",
        }}
        data-aos="fade-down"
        data-aos-duration="800"
      >
        Progress Report
      </h2>
      <p data-aos="fade-up" data-aos-duration="800">
        View Progress Reports!
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

      <div className="team-img">
        {newTeamArr.map(({ Team_id, Team_name, Team_image }) => (
          <div
            key={Team_id}
            className="team-imgs"
            data-aos="zoom-in"
            data-aos-duration={index > 1200 ? 800 : (index += 200)}
          >
            <Link
              to={`/superadmin/progressReport/${Team_name}`}
              className="hover"
            >
              <img src={Team_image} alt="" className="team" />
            </Link>
            <p className="des">Team {Team_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Report;
