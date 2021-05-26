import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../styles/TeamReport.css";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import Aos from "aos";
import "aos/dist/aos.css";

const SATeamReport = () => {
  const { team } = useParams();
  const [teamReport, setTeamReport] = useState([]);
  const [teamImage, setTeamImage] = useState("");
  let index = 200;

  function getRuleWithSelector(selector) {
    var numSheets = document.styleSheets.length,
      numRules,
      sheetIndex,
      ruleIndex;
    // Search through the style sheets.
    for (sheetIndex = 0; sheetIndex < numSheets; sheetIndex += 1) {
      numRules = document.styleSheets[sheetIndex].cssRules.length;
      for (ruleIndex = 0; ruleIndex < numRules; ruleIndex += 1) {
        if (
          document.styleSheets[sheetIndex].cssRules[ruleIndex].selectorText ===
          selector
        ) {
          return document.styleSheets[sheetIndex].cssRules[ruleIndex];
        }
      }
    }
    // If we get this far, then the rule doesn't exist.
    // So the return value is undefined.
  }

  const fetchTeam = async () => {
    const response = await axios.get(
      `http://localhost/IMS/API/TeamName_fetch.php?Team_name=${team}`
    );

    setTeamImage(response.data[0].Team_image);
  };

  const fetchReport = async () => {
    const res = await axios.get(
      `http://localhost/IMS/API/Project_report_fetch.php?team=${team}`
    );

    setTeamReport(res.data);

    console.log(res.data);
  };

  const deleteReport = async (project) => {
    if (window.confirm("Are You Sure?")) {
      const response = await axios.post(
        `http://localhost/IMS/API/Project_insert_completed.php`,
        {
          project_name: project,
          project_team: team,
          completion_date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
        }
      );

      const res = await axios.delete(
        `http://localhost/IMS/API/Project_report_delete.php?project_name=${project}`
      );

      fetchReport();

      console.log(res.data);
    }
  };

  const progressBarElement = document.querySelectorAll(".progress");

  const setProgressBar = () => {
    for (let i = 0; i < progressBarElement.length; i++) {
      if (progressBarElement[i].classList.contains("Notstarted")) {
        getRuleWithSelector(".Notstarted::after").style.width = "0";
      } else if (progressBarElement[i].classList.contains("Initiated")) {
        getRuleWithSelector(".Initiated::after").style.width = "25%";
      } else if (progressBarElement[i].classList.contains("Inprogress")) {
        getRuleWithSelector(".Inprogress::after").style.width = "50%";
      } else if (progressBarElement[i].classList.contains("Onhold")) {
        getRuleWithSelector(".Onhold::after").style.width = "75%";
      } else if (progressBarElement[i].classList.contains("Complete")) {
        getRuleWithSelector(".Complete::after").style.width = "100%";
      } else {
        continue;
      }
    }
  };

  useEffect(() => {
    fetchReport();
    fetchTeam();
    setProgressBar();
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div
      className="team-report"
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
        style={{ borderBottom: "2px solid blueviolet" }}
        data-aos="fade-down"
        data-aos-duration="800"
      >
        Project Report
      </h2>
      <p data-aos="fade-up" data-aos-duration="800">
        Team {team}'s project report!
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
      <div className="team-reports">
        {teamReport.length &&
          teamReport.map((report) => (
            <>
              {/* <Card
                className="bg-light text-white card-projects"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "1000px",
                  height: "300px",
                }}
                key={report.report_id}
              > */}
              {/* <Card.Img
                  src={report.Project_image}
                  alt="Card image"
                  class="projects"
                  style={{ width: "350px" }}
                  // variant="bottom"
                /> */}
              <div
                className="courses-container"
                data-aos="fade-right"
                data-aos-duration={index > 400 ? 800 : (index += 200)}
              >
                <div className="course">
                  <div className="course-preview">
                    <h6>Project</h6>
                    <h2>{report.project_name}</h2>
                    <a href="#" id="update-des">
                      <i
                        className="far fa-clock"
                        style={{ color: "white" }}
                      ></i>{" "}
                      Updated {format(report.update_date)}
                    </a>
                  </div>
                  <div className="course-info">
                    <div className="progress-container">
                      <div
                        className={`progress ${report.stage_status.replace(
                          / +/g,
                          ""
                        )}`}
                      ></div>
                      {setProgressBar()}
                      <span
                        className="progress-text"
                        style={{ textAlign: "center" }}
                      >
                        {report.stage_status}
                      </span>
                    </div>
                    <h6 className="para">Stage</h6>
                    <h2>{report.stage}</h2>

                    <h6 className="update-desc">Update Description</h6>
                    <p className="wrapword">{report.update_description}</p>

                    <button
                      className="btn tick"
                      onClick={() => deleteReport(report.project_name)}
                    >
                      &#x2713;
                    </button>
                  </div>
                </div>
              </div>
              {/* <Card.Body
                  style={{
                    width: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Card.Title>{report.project_name}</Card.Title>

                  <Card.Text>{report.stage}</Card.Text>
                  <Card.Text>{report.stage_status}</Card.Text>
                </Card.Body>
              </Card> */}
              <br />
            </>
          ))}
        {!teamReport.length && (
          <h1
            style={{
              borderBottom: "2px solid blueviolet",
              textAlign: "center",
            }}
            data-aos="zoom-in"
            data-aos-duration="800"
          >
            Hooray!! No Reports!!
          </h1>
        )}
      </div>
    </div>
  );
};

export default SATeamReport;
