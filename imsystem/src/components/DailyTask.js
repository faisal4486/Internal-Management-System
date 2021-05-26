import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
import Script from "../js/script";
import { useHistory } from "react-router-dom";

function DailyTask() {
  Script($);

  const history = useHistory();

  const [name, setName] = useState("");
  const [dailyTask, setDailyTask] = useState("");
  const [memberArray, setMemberArray] = useState([]);

  let newMemberArr = [];

  newMemberArr = memberArray.filter((team) => {
    console.log(team);
    if (team.name !== "") {
      return team;
    }
  });

  const fetchMember = async () => {
    const response = await axios.get(
      `http://localhost/IMS/API/Member_fetch.php`
    );

    setMemberArray(response.data);
  };

  useEffect(() => {
    fetchMember();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `http://localhost/IMS/API/daily_task_insert.php`,
      {
        emp_name: name,
        task_of_day: dailyTask,
        task_date: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
        status: 0,
        task_completion_time: null,
      }
    );

    history.push("/superadmin");

    console.log(res);
  };

  return (
    <div>
      <form className="row login_form" onSubmit={handleFormSubmit}>
        <div id="login-page" className="container open">
          <h1 style={{ marginBottom: "-10px" }}>Daily Task</h1>
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
              <label for="exampleFormControlTextarea2">Daily-Task</label>
              <textarea
                className="form-control rounded-0"
                id="exampleFormControlTextarea2"
                rows="5"
                onChange={(e) => setDailyTask(e.target.value)}
              ></textarea>
            </div>
            <button className="submit" type="submit" align="center">
              Assign
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default DailyTask;
