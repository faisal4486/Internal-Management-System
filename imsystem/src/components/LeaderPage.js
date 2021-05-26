import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/LeaderPage.css";
import axios from "axios";
import Aos from "aos";
import "aos/dist/aos.css";
import { useHistory } from "react-router-dom";
import DailyTaskModal from "./DailyTaskModal";
import PasswordUpdate from "./PasswordUpdate";

const LeaderPage = () => {
  const user = localStorage.getItem("user");
  const history = useHistory();
  const { team } = useParams();
  const [teamImage, setTeamImage] = useState("");
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

  // console.log(dailyTask);

  const fetchUser = async () => {
    const response = await axios.get(
      `http://localhost/IMS/API/User_Fetch.php?username=${user}`
    );

    setImsUser(response.data[0]);
  };

  const openSideBar = () => {
    document.querySelector(".leader").classList.add("active");
  };

  const closeSideBar = () => {
    document.querySelector(".leader").classList.remove("active");
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

  // console.log(teamImage);

  useEffect(() => {
    fetchUser();
    fetchTeam();
    fetchTask();
    Aos.init({ duration: 2000 });
  }, [dailyTask]);

  // useEffect(() => {
  //   fetchTask();
  //   Aos.init({ duration: 2000 });
  // }, [dailyTask]);

  return (
    <div
      className="leader"
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

              {/* <div className="team_img">
                <img
                  src={teamImage}
                  style={{
                    width: "100px",
                    borderRadius: "50%",
                    objectFit: "contain",
                  }}
                  alt="team_img"
                />
              </div> */}

              {/* <h5 className="user-team">Team {imsuser.team}</h5>
              <h4 className="skills">Skills:</h4>
              <p className="user-skills">{imsuser.skills}</p>
               */}

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
          borderBottom: "2px solid blueviolet",
          textAlign: "center",
        }}
        data-aos="fade-down"
        data-aos-duration="800"
      >
        Team {team} (Admin)
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

      <div className="leader-img">
        <div
          className="leader-imgs"
          data-aos="fade-right"
          data-aos-duration="800"
        >
          <Link to={`/admin/${team}/projectAssigned`} className="hover">
            <img src="/images/A_Project.svg" alt="" className="leaders" />
          </Link>
          <p className="des">Project Assigned</p>
        </div>

        <div
          className="leader-imgs"
          data-aos="fade-left"
          data-aos-duration="800"
        >
          <Link to={`/admin/${team}/projectReport`} className="hover">
            <img src="/images/P_Report.svg" alt="" className="leaders" />
          </Link>
          <p className="des">Project Report</p>
        </div>

        <div
          className="leader-imgs"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <Link to={`/admin/${team}/teamMembers`} className="hover">
            <img src="/images/T_Members.svg" alt="" className="leaders" />
          </Link>
          <p className="des">Team Members</p>
        </div>

        <div
          className="leader-imgs"
          data-aos="fade-left"
          data-aos-duration="1000"
        >
          <Link to={`/admin/${team}/viewReport`} className="hover">
            <img src="/images/V_Report.svg" alt="" className="leaders" />
          </Link>
          <p className="des">View Report</p>
        </div>
      </div>
    </div>
  );
};

export default LeaderPage;
