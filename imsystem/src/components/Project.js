import React, { useEffect, useState } from "react";
import $ from "jquery";
import "../styles/Project.css";
import axios from "axios";
import Script from "../js/script";

import "react-datepicker/dist/react-datepicker.css";
import { useHistory } from "react-router-dom";

function Project() {
  Script($);

  const history = useHistory();

  const [name, setName] = useState("");
  const [team, setTeam] = useState();
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [teamArray, setTeamArray] = useState([]);

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

  console.log(teamArray[0]);

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!image?.type?.match("image.*")) {
      alert("select image only");
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.addEventListener("load", async () => {
        await axios
          .post("http://localhost/IMS/API/Project_insert.php", {
            project_name: name,
            description: description,
            assign_date: startDate,
            ending_date: endDate,
            Project_image: reader.result,
            Project_team: team,
          })
          .then(() => history.push("/superadmin"))
          .catch((err) => alert(err));
      });
    }
  };

  // const handleFormSubmit = async (e) => {
  //   e.preventDefault();
  //   const res = await axios.post(
  //     `http://localhost/IMS/API/Project_insert.php`,
  //     {
  //       project_name: name,
  //       description: description,
  //       assign_date: startDate,
  //       ending_date: endDate,
  //       Project_image: image.name,
  //       Project_team: team,
  //     }
  //   );

  //   console.log(res);
  // };

  return (
    <div className="project">
      <form className="row login_form" onSubmit={handleFormSubmit}>
        <div
          id="login-page"
          className="container open"
          style={{
            width: "500px",
            marginTop: "15px",
            overflowY: "scroll",
            height: "700px",
          }}
        >
          <h1 style={{ marginBottom: "-10px" }}>Assign Project</h1>
          <div className="form-set" style={{ width: "500px" }}>
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <select
                className="browser-default custom-select"
                onChange={(e) => setTeam(e.currentTarget.value)}
              >
                <option defaultValue>Select Team</option>
                {newTeamArr.map(({ Team_id, Team_name }) => (
                  <option key={Team_id} value={Team_name}>
                    {Team_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group ">
              <label for="assign-date">Assign Date</label>
              <div>
                <input
                  className="form-control"
                  type="datetime-local"
                  onChange={(e) => setStartDate(e.target.value)}
                  id="assign-date"
                  selected={startDate}
                />
              </div>
            </div>
            <div className="form-group">
              <label for="assign-date">End Date</label>
              <div>
                <input
                  className="form-control"
                  type="datetime-local"
                  onChange={(e) => setEndDate(e.target.value)}
                  id="assign-date"
                  selected={startDate}
                />
              </div>
            </div>

            <div className="form-group">
              <label for="chooseImg">Insert Project Image</label>
              <input
                type="file"
                className="form-control-file"
                id="chooseImg"
                accept="image"
                name="image"
                // multiple
                // data-show-upload="true"
                // data-show-caption="true"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <label for="exampleFormControlTextarea2">Description</label>
              <textarea
                className="form-control rounded-0"
                id="exampleFormControlTextarea2"
                rows="5"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            {/* <div className="form-group">
        <label className="form-label">Password</label>
        <input type="password" name="password" className="form-control" />
      </div> */}
            <button className="submit" type="submit" align="center">
              Assign
            </button>
            {/* <button className="btn" name="btn" type="submit">
  Log in
</button> */}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Project;
