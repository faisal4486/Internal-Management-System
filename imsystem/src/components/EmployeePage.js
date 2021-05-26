import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/EmployeePage.css";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import PasswordUpdate from "./PasswordUpdate";
import { useHistory } from "react-router-dom";
import DailyTaskModal from "./DailyTaskModal";

const EmployeePage = () => {
  const user = localStorage.getItem("user");
  const { team } = useParams();
  const [teamImage, setTeamImage] = useState("");
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [imsuser, setImsUser] = useState("");
  const [dailyTask, setDailyTask] = useState([]);

  const fetchTask = async () => {
    const response = await axios.get(
      `http://localhost/IMS/API/daily_task_fetch.php?emp_name=${imsuser.name}`
    );

    setDailyTask(response.data);
  };

  const fetchUser = async () => {
    const response = await axios.get(
      `http://localhost/IMS/API/User_Fetch.php?username=${user}`
    );

    setImsUser(response.data[0]);
  };

  const openSideBar = () => {
    document.querySelector(".employee").classList.add("active");
  };

  const closeSideBar = () => {
    document.querySelector(".employee").classList.remove("active");
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const showTaskModal = () => {
    setIsTaskOpen(true);
  };

  const hideTaskModal = () => {
    setIsTaskOpen(false);
  };

  const directToHome = () => {
    history.push("/");
    localStorage.clear();
  };

  const fetchTeam = async () => {
    const response = await axios.get(
      `http://localhost/IMS/API/TeamName_fetch.php?Team_name=${team}`
    );

    setTeamImage(response.data[0].Team_image);
  };

  console.log(teamImage);

  useEffect(() => {
    fetchUser();
    fetchTeam();
    fetchTask();
    Aos.init({ duration: 2000 });
  }, [dailyTask]);
  return (
    <div
      className="employee"
      style={{
        marginTop: 0,
        paddingTop: "55px",
        backgroundImage: `url(${teamImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <PasswordUpdate checkOpen={isOpen} hideModal={hideModal} />
      <DailyTaskModal
        checkTaskOpen={isTaskOpen}
        dailyTask={dailyTask}
        hideTaskModal={hideTaskModal}
      />
      <div className="sidebar">
        <div className="bg_shadow"></div>
        <div className="sidebar__inner">
          <div className="close">
            <i
              className="fas fa-times"
              style={{ color: "white", margin: "5px 10px 0 0" }}
              onClick={closeSideBar}
            ></i>
          </div>
          <div className="profile_info">
            <div className="profile_img">
              <img src={imsuser.image} alt="profile_img" />
            </div>
            <div className="profile_data">
              <h3 className="name">{imsuser.name}</h3>
              <h4 className="role">{imsuser.status}</h4>

              <p className="other-details">User-Name:</p>
              <h4 className="user-name">{imsuser.username}</h4>
              <p className="other-details">Employee ID:</p>
              <h4 className="user-id">{imsuser.employeeid}</h4>
              <p className="other-details">Job-Role:</p>
              <h6 className="user-name wrapword">{imsuser.jobrole}</h6>
              <button
                className="submit profile"
                type="submit"
                align="center"
                // data-aos="fade-right"
                // data-aos-duration="800"
                onClick={showModal}
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="submit user"
        type="submit"
        align="right"
        data-aos="fade-down-right"
        data-aos-duration="800"
        onClick={openSideBar}
      >
        <i class="fas fa-user-edit" style={{ color: "white" }}></i>
      </button>
      <h2
        style={{
          color: "#fff",
          textAlign: "center",
          borderBottom: "2px solid blueviolet",
        }}
        data-aos="fade-down"
        data-aos-duration="800"
      >
        Team {team} (Employee)
      </h2>
      <p data-aos="fade-up" data-aos-duration="800">
        Team {team} panel!
      </p>
      <button
        className="submit daily-task"
        type="submit"
        align="right"
        data-aos="zoom-out"
        data-aos-duration="800"
        onClick={showTaskModal}
      >
        Check Out Daily Task!
      </button>
      <button
        className="submit logout"
        type="submit"
        align="right"
        data-aos="fade-down-left"
        data-aos-duration="800"
        onClick={directToHome}
      >
        <i className="fas fa-sign-out-alt" style={{ color: "white" }}></i> Log
        out
      </button>

      <div className="employee-img">
        <div
          className="employee-imgs"
          data-aos="fade-right"
          data-aos-duration="800"
        >
          <Link to={`/employee/${team}/projectAssigned`} className="hover">
            <img src="/images/A_Project.svg" alt="" className="employees" />
          </Link>
          <p className="des">Project Assigned</p>
        </div>

        <div
          className="employee-imgs"
          data-aos="fade-left"
          data-aos-duration="800"
        >
          <Link to={`/employee/${team}/teamMembers`} className="hover">
            <img src="/images/T_Members.svg" alt="" className="employees" />
          </Link>
          <p className="des">Team Members</p>
        </div>

        <div
          className="employee-imgs"
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <Link to={`/employee/${team}/viewReport`} className="hover">
            <img src="/images/V_Report.svg" alt="" className="employees" />
          </Link>
          <p className="des">View Report</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
