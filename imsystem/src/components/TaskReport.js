import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../styles/TeamM.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import TaskReportModal from "./TaskReportModal";

const TaskReport = () => {
  //   const { team } = useParams();
  const [memberArray, setMemberArray] = useState([]);
  let index = 200;
  let alt = true;
  let newMemberArr = [];
  const [isDailyTaskOpen, setIsDailyTaskOpen] = useState(false);
  const [dailyTaskReport, setDailyTaskReport] = useState([]);

  const showDailyTaskModal = () => {
    setIsDailyTaskOpen(true);
  };

  const hideDailyTaskModal = () => {
    setIsDailyTaskOpen(false);
  };

  const fetchTaskReport = async (member) => {
    const response = await axios.get(
      `http://localhost/IMS/API/daily_task_report_fetch.php?emp_name=${member}`
    );

    setDailyTaskReport(response.data);

    console.log(response.data);
  };

  const setAlt = () => {
    alt = !alt;
    return alt ? "alt" : "";
  };

  const fetchMember = async () => {
    const response = await axios.get(
      `http://localhost/IMS/API/Member_fetch.php`
    );

    setMemberArray(response.data);
  };

  newMemberArr = memberArray.filter((team) => {
    console.log(team);
    if (team.name !== "") {
      return team;
    }
  });

  //   console.log(newMemberArr);

  //   const fetchTeam = async () => {
  //     const response = await axios.get(
  //       `http://localhost/IMS/API/TeamName_fetch.php?Team_name=${team}`
  //     );

  //     setTeamImage(response.data[0].Team_image);
  //   };

  //   console.log(projectArray);

  useEffect(() => {
    fetchMember();
    // fetchTaskReport();
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div
      className="team-members"
      style={{
        // width: "100vw",
        marginTop: "55px",
        // paddingTop: "55px",
        // backgroundImage: `url(${teamImage})`,
        // backgroundRepeat: "no-repeat",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
      }}
    >
      <TaskReportModal
        checkTaskOpen={isDailyTaskOpen}
        dailyTask={dailyTaskReport}
        hideTaskModal={hideDailyTaskModal}
      />
      <h2
        style={{ borderBottom: "2px solid blueviolet", textAlign: "center" }}
        data-aos="fade-down"
        data-aos-duration="800"
      >
        Daily Task Report
      </h2>
      <p data-aos="fade-up" data-aos-duration="800">
        Members of CodeSprout
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
        {newMemberArr &&
          newMemberArr.map((members) => (
            <>
              <div
                className={`blog-card ${alt} ? ${setAlt()} : ""`}
                data-aos={`${alt ? "fade-left" : "fade-right"}`}
                data-aos-duration={index > 400 ? 800 : (index += 200)}
              >
                <div className="meta">
                  <div
                    className="photo"
                    style={{ backgroundImage: "url(" + members.image + ")" }}
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
                  <h1>{members.name}</h1>
                  <h2>
                    {members.status} of Team {members.team}
                  </h2>
                  {/* <p className="wrapword">{members.jobrole}</p> */}
                  <p className="wrapword">{members.skills}</p>
                  <button
                    className="submit member-btn"
                    onClick={() => {
                      fetchTaskReport(members.name);
                      showDailyTaskModal();
                    }}
                  >
                    <i className="fas fa-scroll" style={{ color: "white" }}></i>{" "}
                    View Report
                  </button>
                </div>
              </div>
              <br />
            </>
          ))}
      </div>
    </div>
  );
};

export default TaskReport;
