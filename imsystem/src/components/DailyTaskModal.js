import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/PasswordUpdate.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
// import Checkbox from "./Checkbox";

function DailyTaskModal({ dailyTask, checkTaskOpen, hideTaskModal }) {
  let index = 1;

  const submitAsDone = async (task) => {
    if (window.confirm("Are you sure you have completed your task?!")) {
      const response = await axios.post(
        `http://localhost/IMS/API/daily_task_report_insert.php`,
        {
          status: 1,
          task_of_day: task,
          task_completion_time: Date.now(),
        }
      );

      hideTaskModal();
    }
  };

  return (
    <div className="modal">
      <Modal
        show={checkTaskOpen}
        onHide={hideTaskModal}
        backdrop="static"
        keyboard={false}
        centered
        scrollable={true}
        className="b_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">
            <i class="fas fa-tasks"></i> Assigned Tasks!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dailyTask.length &&
            dailyTask.map((task) => (
              <div
                className="daily-task-des"
                style={{
                  borderBottom: "1px solid blueviolet",
                  marginTop: "20px",
                }}
              >
                <div style={{ display: "flex" }}>
                  <h3
                    style={{ color: "blueviolet", textDecoration: "underline" }}
                  >
                    Task #{index++}
                  </h3>
                  <button
                    className="submit update"
                    onClick={() => submitAsDone(task.task_of_day)}
                  >
                    <i className="far fa-smile" style={{ color: "white" }}></i>{" "}
                    Done
                  </button>
                  {/* <input
                    type="checkbox"
                    id={task.emp_id}
                    style={{ margin: "10px 0 0 10px" }}
                    // onClick={handleChange}
                    checked={checked}
                    onChange={(e) => setChecked(!checked)}
                  /> */}
                </div>
                <h5 style={{ color: "blueviolet" }}>Date:</h5>

                <p style={{ color: "#5e60ce " }}>{task.task_date}</p>

                <h5 style={{ color: "blueviolet" }}>Task Assigned:</h5>

                <p style={{ color: "#5e60ce " }}>{task.task_of_day}</p>
              </div>
            ))}
          {!dailyTask.length && (
            <h4 style={{ color: "#5e60ce " }}>No projects remaining!</h4>
          )}
        </Modal.Body>
        {/* <Modal.Footer>
          
          <button
            className="submit update"
            onClick={() => {
              hideTaskModal();
              // submitAsNotDone();
            }}
          >
            <i className="far fa-frown" style={{ color: "white" }}></i> Not Done
          </button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}

export default DailyTaskModal;
