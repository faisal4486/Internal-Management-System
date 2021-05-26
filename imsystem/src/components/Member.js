import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import Script from "../js/script";
import { useHistory } from "react-router-dom";

function Member() {
  Script($);

  const history = useHistory();

  const [name, setName] = useState("");
  const [team, setTeam] = useState();
  const [jobRole, setJobRole] = useState("");
  const [status, setStatus] = useState();
  const [teamArray, setTeamArray] = useState([]);
  const [memberArray, setMemberArray] = useState([]);

  const fetchTeam = async () => {
    const response = await axios.get(`http://localhost/IMS/API/Team_fetch.php`);

    setTeamArray(response.data);
  };

  let newTeamArr = [];
  let newMemberArr = [];

  newTeamArr = teamArray.filter((team) => {
    console.log(team);
    if (team.Team_name !== "") {
      return team;
    }
  });

  newMemberArr = memberArray.filter((team) => {
    console.log(team);
    if (team.name !== "") {
      return team;
    }
  });

  // console.log(teamArray);

  const fetchMember = async () => {
    const response = await axios.get(
      `http://localhost/IMS/API/Member_fetch.php`
    );

    setMemberArray(response.data);
  };

  // console.log(memberArray);

  useEffect(() => {
    fetchTeam();
    fetchMember();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost/IMS/API/Member_insert.php`, {
      name: name,
      team: team,
      status: status,
      jobrole: jobRole,
    });

    history.push("/superadmin");

    console.log(res);
    console.log(team);
  };

  return (
    <div className="member">
      <form className="row login_form" onSubmit={handleFormSubmit}>
        <div id="login-page" className="container open">
          <h1 style={{ marginBottom: "-10px" }}>Edit Member</h1>
          <div className="form-set">
            <div className="form-group">
              <select
                className="browser-default custom-select"
                onChange={(e) => setName(e.currentTarget.value)}
              >
                <option defaultValue>Select Member Name</option>
                {newMemberArr.map(({ userid, name }) => (
                  <option key={userid} value={name}>
                    {name}
                  </option>
                ))}
              </select>
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
              <label htmlFor="exampleFormControlTextarea2">Job Role</label>
              <textarea
                className="form-control rounded-0"
                id="exampleFormControlTextarea2"
                rows="10"
                onChange={(e) => setJobRole(e.target.value)}
              ></textarea>
            </div>
            <button className="submit" type="submit" align="center">
              Edit Member
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Member;
