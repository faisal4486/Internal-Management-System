import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PasswordUpdate.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";

function PasswordUpdate(props) {
  const user = localStorage.getItem("user");
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const history = useHistory();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const res = await axios.get(
      `http://localhost/IMS/API/Password_fetch.php?username=${user}&password=${oldPass}`
    );

    console.log(res);
    if (res.data.status == false) {
      alert("Wrong Old Password Entered!");
    } else {
      const response = await axios.post(
        `http://localhost/IMS/API/Password_update.php`,
        {
          username: user,
          password: newPass,
        }
      );
      props.hideModal(false);
      alert("Password Updated Successfully!");
    }
  };

  return (
    <div className="modal">
      <Modal
        show={props.checkOpen}
        onHide={props.hideModal}
        backdrop="static"
        keyboard={false}
        centered
        className="b_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            <i class="fas fa-unlock-alt"></i> Update Password!
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleFormSubmit}>
          <Modal.Body>
            <div className="form-group">
              <label className="form-label">Confirm Old Password:</label>
              <input
                type="password"
                onChange={(e) => setOldPass(e.target.value)}
                name="old_password"
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Enter New Password:</label>
              <input
                type="password"
                onChange={(e) => setNewPass(e.target.value)}
                name="new_password"
                className="form-control"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="submit update">Change Password</button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default PasswordUpdate;
