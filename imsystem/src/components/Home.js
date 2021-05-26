import React, { useEffect, useState } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "../styles/Home.css";
import { useHistory } from "react-router-dom";
import $ from "jquery";
import Script from "../js/script";

function Home() {
  Script($);

  // const [{ user }, dispatch] = useStateValue();
  const history = useHistory();
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState("");
  const [team, setTeam] = useState("");
  // const [image, setImage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // dispatch({
    //   type: "SET_USER",
    //   user: name,
    // });

    localStorage.setItem("user", name);

    const res = await axios.get(
      `http://localhost/IMS/API/Employee_fetch.php?name=${name}&password=${pass}`
    );
    setStatus(res.data[0]?.status);
    setTeam(res.data[0]?.team);
    // setImage(res.data[0]?.image);
    // console.log(id);
    // console.log(res);
  };

  useEffect(() => {
    if (status == "Super-Admin") history.push("/superadmin");
    else if (status == "Admin" && team) history.push(`/admin/${team}`);
    else if (status == "Employee" && team) history.push(`/employee/${team}`);
    else if (status && status != "Admin" && status != "Employee")
      alert("Incorrect UserName or Password!");
  }, [status, team]);

  return (
    <div className="home">
      <form className="row login_form" onSubmit={handleFormSubmit}>
        <div id="login-page" className="container open">
          <h1>CodeSprout</h1>
          <h2>Login</h2>
          <div className="form-set">
            <div className="form-group">
              <label className="form-label">User Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                name="name"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                onChange={(e) => setPass(e.target.value)}
                name="password"
                className="form-control"
              />
            </div>
            <button className="submit" type="submit" align="center">
              Sign in
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

export default Home;
