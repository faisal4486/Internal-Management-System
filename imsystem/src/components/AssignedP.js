import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "../styles/AssignedP.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
// import { Card } from "react-bootstrap";

const AssignedP = () => {
  const { team } = useParams();
  const [projectArray, setProjectArray] = useState([]);
  const [teamImage, setTeamImage] = useState("");
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

  console.log(projectArray);

  useEffect(() => {
    fetchProject();
    fetchTeam();
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div
      className="assigned-project"
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
        Projects Assigned
      </h2>
      <p data-aos="fade-up" data-aos-duration="800">
        Projects assigned to your team!
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

      <div className="assigned-projects">
        {projectArray.length &&
          projectArray.map((project) => (
            <>
              <Card
                className="bg-light text-white card-projects"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "1000px",
                  height: "300px",
                }}
                key={project.Project_id}
                data-aos="zoom-in"
                data-aos-duration={index > 400 ? 800 : (index += 200)}
              >
                <Card.Img
                  src={project.Project_image}
                  alt="Card image"
                  class="projects"
                  style={{ width: "350px" }}
                  // variant="bottom"
                />
                <Card.Body
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
                </Card.Body>
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

export default AssignedP;
