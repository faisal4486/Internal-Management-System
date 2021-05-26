import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminPage from "./components/AdminPage";
import AssignedP from "./components/AssignedP";
import DailyTask from "./components/DailyTask";
import Employee from "./components/Employee";
import EmployeePage from "./components/EmployeePage";
import Home from "./components/Home";
import LeaderPage from "./components/LeaderPage";
import Member from "./components/Member";
import Project from "./components/Project";
import Report from "./components/Report";
import ReportP from "./components/ReportP";
import SATeamReport from "./components/SATeamReport";
import TaskReport from "./components/TaskReport";
import Team from "./components/Team";
import TeamM from "./components/TeamM";
import TeamReport from "./components/TeamReport";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/superadmin" exact>
            <AdminPage />
          </Route>
          <Route path="/superadmin/addEmployee" exact>
            <Employee />
          </Route>
          <Route path="/superadmin/addTeam" exact>
            <Team />
          </Route>
          <Route path="/superadmin/addMember" exact>
            <Member />
          </Route>
          <Route path="/superadmin/assignProject" exact>
            <Project />
          </Route>
          <Route path="/superadmin/dailyTask" exact>
            <DailyTask />
          </Route>
          <Route path="/superadmin/progressReport" exact>
            <Report />
          </Route>
          <Route path="/superadmin/taskReport" exact>
            <TaskReport />
          </Route>
          <Route path="/superadmin/progressReport/:team" exact>
            <SATeamReport />
          </Route>
          
          
          <Route path="/employee/:team" exact>
            <EmployeePage />
          </Route>
          <Route path="/employee/:team/projectAssigned" exact>
            <AssignedP />
          </Route>
          <Route path="/employee/:team/viewReport" exact>
            <TeamReport />
          </Route>
          <Route path="/employee/:team/teamMembers" exact>
            <TeamM />
          </Route>

          <Route path="/admin/:team" exact>
            <LeaderPage />
          </Route>
          <Route path="/admin/:team/projectAssigned" exact>
            <AssignedP />
          </Route>
          <Route path="/admin/:team/projectReport" exact>
            <ReportP />
          </Route>
          <Route path="/admin/:team/teamMembers" exact>
            <TeamM />
          </Route>

          <Route path="/admin/:team/viewReport" exact>
            <TeamReport />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
