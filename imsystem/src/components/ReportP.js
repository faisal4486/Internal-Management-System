import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../styles/ReportP.css";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import Aos from "aos";
import "aos/dist/aos.css";

const ReportP = () => {
  const { team } = useParams();
  const [projectArray, setProjectArray] = useState([]);
  const [stage, setStage] = useState();
  const [statusStage, setStatusStage] = useState();
  const [teamImage, setTeamImage] = useState("");
  const [stageDescription, setStageDescription] = useState("");

  //   const [projectName, setProjectName] = useState();
  const history = useHistory();
  let index = 200;

  const fetchProject = async () => {
    const response = await axios.get(
      `http://localhost/IMS/API/Project_fetch.php?Team_name=${team}`
    );

    setProjectArray(response.data);
  };

  const fetchTeam = async () => {
    const response = await axios.get(
      `http://localhost/IMS/API/TeamName_fetch.php?Team_name=${team}`
    );

    setTeamImage(response.data[0].Team_image);
  };

  const handleFormSubmit = async (name) => {
    //  e.preventDefault();
    if (window.confirm("Are you sure?")) {
      const res = await axios.post(
        `http://localhost/IMS/API/Project_Report_Insert.php`,
        {
          team: team,
          project_name: name,
          project_stage: stage,
          stage_status: statusStage,
          update_date: Date.now(),
          update_description: stageDescription,
        }
      );

      // history.push(`/admin/${team}`);

      console.log(Date.now());
    }
  };

  useEffect(() => {
    fetchProject();
    fetchTeam();
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <div
      className="project-report"
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
        Project Report Updation
      </h2>
      <p data-aos="fade-up" data-aos-duration="800">
        Update your team's assigned project's status!
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
      <div className="project-reports">
        {projectArray.length &&
          projectArray.map((project) => (
            <>
              <Card
                className="bg-light text-white text-center responsive"
                style={{
                  //     display: "flex",
                  //     flexDirection: "row",
                  width: "900px",
                  // height: "300px",
                }}
                key={project.Project_id}
                data-aos="zoom-in"
                data-aos-duration={index > 400 ? 800 : (index += 200)}
              >
                <Card.Header style={{ borderBottom: "1px solid grey" }}>
                  Assigned {format(project.Assign_date)}
                </Card.Header>
                <Card.Body>
                  <Card.Title>{project.Project_name}</Card.Title>
                  <div className="form-group dropdowns">
                    <select
                      className="browser-default custom-select"
                      onChange={(e) => setStage(e.currentTarget.value)}
                    >
                      <option defaultValue>Select Stage</option>
                      <option value="Requirement Analysis">
                        Requirement Analysis
                      </option>
                      <option value="System Design">System Design</option>
                      <option value="Implementation">Implementation</option>
                      <option value="Testing">Testing</option>
                      <option value="Deployment">Deployment</option>
                      <option value="Maintenance">Maintenance</option>
                    </select>
                  </div>

                  <div className="form-group dropdowns">
                    <select
                      className="browser-default custom-select"
                      onChange={(e) => setStatusStage(e.currentTarget.value)}
                    >
                      <option defaultValue>Select Stage Status</option>
                      <option value="Not started">Not started</option>
                      <option value="Initiated">Initiated</option>
                      <option value="In progress">In progress</option>
                      <option value="On hold">On hold</option>
                      <option value="Complete">Complete</option>
                      {/* <option value="Deployed">Deployed</option> */}
                    </select>
                  </div>
                  <div className="form-group dropdowns">
                    {/* <label for="exampleFormControlTextarea2">Stage Update Description</label> */}
                    <textarea
                      className="form-control rounded-0"
                      id="exampleFormControlTextarea2"
                      rows="3"
                      onChange={(e) => setStageDescription(e.target.value)}
                      placeholder="Stage Update Description"
                    ></textarea>
                  </div>
                  <button
                    onClick={() => {
                      handleFormSubmit(project.Project_name);
                    }}
                    className="submit"
                    type="submit"
                    align="center"
                    style={{ margin: "0 auto" }}
                  >
                    Submit
                  </button>
                </Card.Body>
                <Card.Footer className="text-muted">
                  Due {format(project.Ending_date)}!
                </Card.Footer>
                {/* <Card.Body
                style={{
                  width: "400px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Card.Title>{project.Project_name}</Card.Title>
                <Card.Text>
                  Assigned Date: {project.Assign_date} <br />
                  Due Date: {project.Ending_date}
                </Card.Text>
                <Card.Text>{project.Project_description}</Card.Text>
              </Card.Body> */}
              </Card>

              <br />
              <br />
            </>
          ))}
        {!projectArray.length && (
          <h1
            style={{ borderBottom: "2px solid blueviolet" }}
            data-aos="zoom-in"
            data-aos-duration="800"
          >
            Hooray!! No Projects!!
          </h1>
        )}
      </div>
    </div>
  );
};

export default ReportP;
