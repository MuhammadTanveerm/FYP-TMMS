const loginController = require("./authentication/login.controller");
const registerController = require("./authentication/register.controller");
const createDepartmentController = require("./departments/create-department.controller");
const fetchDepartmentController = require("./departments/fetch-department.controller");
const deleteDepartmentController = require("./departments/delete-department.controller");
const fetchProgramController = require("./programs/fetch-program.controller");
const createProgramController = require("./programs/create-program.controller");
const fetchSemesterController = require("./semester/fetch-semester.controller");
const fetchSessionController = require("./sessions/fetch-session.controller");
const createNewTimetableController = require("./timetable/create-new-timetable.controller");
const deleteTimetableController = require("./timetable/delete-timetable.controller");
const fetchTimetableController = require("./timetable/fetch-timetable.controller");
const deleteProgramController = require("./programs/delete-program.controller");
const createAllController = require("./upload/create-all.controller");
const fetchByTbController = require("./subjects/fetch-by-tb.controller");

module.exports = {
  createNewTimetableController,
  deleteTimetableController,
  loginController,
  registerController,
  createDepartmentController,
  deleteDepartmentController,
  fetchDepartmentController,
  fetchProgramController,
  fetchTimetableController,
  fetchSessionController,
  fetchSemesterController,
  createProgramController,
  deleteProgramController,
  createAllController,
  fetchByTbController,
};
