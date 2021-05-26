import React, { useEffect, useState } from "react";
import "../styles/AdminPage.css";
import { Link } from "react-router-dom";
import $ from "jquery";
import Aos from "aos";
import "aos/dist/aos.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import PasswordUpdate from "./PasswordUpdate";

function AdminPage() {
  const user = localStorage.getItem("user");
  const history = useHistory();
  const [teamImage, setTeamImage] = useState("");
  const [imsuser, setImsUser] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const userTeam = imsuser.team;

  const fetchUser = async () => {
    const response = await axios.get(
      `http://localhost/IMS/API/User_Fetch.php?username=${user}`
    );

    setImsUser(response.data[0]);

    // fetchUserTeam();

    // const res = await axios.get(
    //   `http://localhost/IMS/API/TeamName_fetch.php?Team_name=${imsuser.team}`
    // );

    // setTeamImage(res.data[0]?.Team_image);
  };

  const fetchUserTeam = async () => {
    const response = await axios.get(
      `http://localhost/IMS/API/TeamName_fetch.php?Team_name=${userTeam}`
    );

    setTeamImage(response.data[0]?.Team_image);
    // console.log(response.data[0].Team_image);
  };

  // console.log(imsuser);
  // console.log(teamImage);

  const openSideBar = () => {
    document.querySelector(".admin").classList.add("active");
  };

  const closeSideBar = () => {
    document.querySelector(".admin").classList.remove("active");
  };

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  // console.log(teamImage);

  // const [{ user }] = useStateValue();
  // console.log(localStorage.getItem("user"));

  const directToHome = () => {
    history.push("/");
    localStorage.clear();
  };

  useEffect(() => {
    fetchUser();
    // fetchUserTeam();
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    fetchUserTeam();
    Aos.init({ duration: 2000 });
  }, [imsuser]);

  return (
    <div className="admin" style={{ marginTop: "55px" }}>
      <PasswordUpdate checkOpen={isOpen} hideModal={hideModal} />
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
        // align="right"
        data-aos="fade-down-right"
        data-aos-duration="800"
        onClick={openSideBar}
      >
        <i className="fas fa-user-edit" style={{ color: "white" }}></i>
      </button>
      <h2
        style={{ borderBottom: "2px solid blueviolet", textAlign: "center" }}
        data-aos="fade-down"
        data-aos-duration="800"
      >
        Super-Admin Panel
      </h2>
      <p data-aos="fade-up" data-aos-duration="800">
        Welcome to super-admin panel!
      </p>
      {/* <button
        className="submit daily-task"
        type="submit"
        align="right"
        data-aos="zoom-out"
        data-aos-duration="800"
        // onClick={directToHome}
      >
        Check Out Daily Task!
      </button> */}
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

      <div className="admin-img">
        <div className="admin-imgs" data-aos="zoom-in" data-aos-duration="200">
          <Link to="/superadmin/addEmployee" className="hover">
            <img src="/images/Employee.svg" alt="" className="admins" />
          </Link>
          <p className="des">Add Employee</p>
        </div>

        <div className="admin-imgs" data-aos="zoom-in" data-aos-duration="400">
          <Link to="/superadmin/addTeam" className="hover">
            <img src="/images/Team.svg" alt="" className="admins" />
          </Link>
          <p className="des">Add Team</p>
        </div>

        <div className="admin-imgs" data-aos="zoom-in" data-aos-duration="600">
          <Link to="/superadmin/addMember" className="hover">
            <img src="/images/Member.svg" alt="" className="admins" />
          </Link>
          <p className="des">Edit Member</p>
        </div>

        <div className="admin-imgs" data-aos="zoom-in" data-aos-duration="800">
          <Link to="/superadmin/assignProject" className="hover">
            <img src="/images/Project.svg" alt="" className="admins" />
          </Link>
          <p className="des">Assign Project</p>
        </div>

        <div className="admin-imgs" data-aos="zoom-in" data-aos-duration="1000">
          <Link to="/superadmin/dailyTask" className="hover">
            <img src="/images/Task.svg" alt="" className="admins" />
          </Link>
          <p className="des">Assign Daily Task</p>
        </div>

        <div className="admin-imgs" data-aos="zoom-in" data-aos-duration="1200">
          <Link to="/superadmin/progressReport" className="hover">
            <img src="/images/Report.svg" alt="" className="admins" />
          </Link>
          <p className="des">View Progress Report</p>
        </div>

        <div className="admin-imgs" data-aos="zoom-in" data-aos-duration="800">
          <Link to="/superadmin/taskReport" className="hover">
            <img src="/images/taskReport.svg" alt="" className="admins" />
          </Link>
          <p className="des">View Task Report</p>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
