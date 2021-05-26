import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import Script from "../js/script";
import { useHistory } from "react-router-dom";

function Employee() {
  Script($);

  const history = useHistory();
  const [name, setName] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [username, setUserName] = useState("");
  const [status, setStatus] = useState();
  const [pass, setPass] = useState("");
  const [team, setTeam] = useState();
  const [skills, setSkills] = useState("");
  const [teamArray, setTeamArray] = useState([]);
  const [image, setImage] = useState("");

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
          .post("http://localhost/IMS/API/Employee_insert.php", {
            employeeid: employeeId,
            jobrole: jobRole,
            name: name,
            username: username,
            status: status,
            pass: pass,
            team: team,
            skills: skills,
            image: reader.result,
          })
          .then(() => history.push("/superadmin"))
          .catch((err) => alert(err));
      });
    }
  };

  return (
    <div className="employee">
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
          <h1 style={{ marginBottom: "-10px" }}>Add Employee</h1>
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
              <label className="form-label">User Name</label>
              <input
                type="text"
                name="user-name"
                className="form-control"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={status}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Employee ID</label>
              <input
                type="number"
                name="employee-id"
                className="form-control"
                // value={status}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea2">Job Role</label>
              <textarea
                className="form-control rounded-0"
                id="exampleFormControlTextarea2"
                rows="10"
                onChange={(e) => setJobRole(e.target.value)}
              ></textarea>
            </div>
            {/* <div className="form-group">
              <label className="form-label">Job Role</label>
              <input
                type="text"
                name="job-role"
                className="form-control"
                onChange={(e) => setJobRole(e.target.value)}
              />
            </div> */}
            <div className="form-group">
              <label for="chooseImg">Insert Employee Image</label>
              <input
                type="file"
                className="form-control-file"
                id="chooseImg"
                accept="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="form-group">
              <select
                className="browser-default custom-select"
                onChange={(e) => setStatus(e.currentTarget.value)}
              >
                <option defaultValue>Select Status</option>
                <option value="Admin">Admin</option>
                <option value="Intern">Intern</option>
                <option value="Employee">Employee</option>
              </select>
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
            <div className="form-group">
              <label htmlFor="exampleFormControlTextarea2">
                Employee Skills
              </label>
              <textarea
                className="form-control rounded-0"
                id="exampleFormControlTextarea2"
                rows="10"
                onChange={(e) => setSkills(e.target.value)}
              ></textarea>
            </div>
            {/* <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" name="password" className="form-control" />
            </div> */}
            <button className="submit" type="submit" align="center">
              Add Employee
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

export default Employee;
