import React, { useState } from "react";
import $ from "jquery";
import axios from "axios";
import Script from "../js/script";
import { useHistory } from "react-router-dom";

function Team() {
  Script($);

  const history = useHistory();

  const [name, setName] = useState("");

  const [image, setImage] = useState("");
  // const [error, setError] = useState(null);

  // const types = ["image/png", "image/jpeg", "image/jpg"];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!image?.type?.match("image.*")) {
      alert("select image only");
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(image);
      reader.addEventListener("load", async () => {
        await axios
          .post("http://localhost/IMS/API/Team_insert.php", {
            Team_name: name,
            Team_image: reader.result,
          })
          .then(() => history.push("/superadmin"))
          .catch((err) => alert(err));
      });
    }
  };

  return (
    <div className="team">
      <form className="row login_form" onSubmit={handleFormSubmit}>
        <div id="login-page" className="container open">
          <h1 style={{ marginBottom: "-10px" }}>Add Team</h1>
          <div className="form-set">
            <div className="form-group">
              <label className="form-label">Team Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label for="chooseImg">Insert Team Image</label>
              <input
                type="file"
                className="form-control-file"
                id="chooseImg"
                accept="image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button
              className="submit"
              type="submit"
              name="upload"
              align="center"
            >
              Add Team
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Team;
