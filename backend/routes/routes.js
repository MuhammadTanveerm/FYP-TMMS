const express = require("express");
const { userExists } = require("../utils/utils");
const loginUserController = require("../modules/authentication/login.controller");
const verifyJWT = require("../utils/verifyJWT");
const {
  createNewTimetableController,
  deleteTimetableController,
  registerController,
  fetchDepartmentController,
  fetchProgramController,
  fetchTimetableController,
  fetchSessionController,
  fetchSemesterController,
  createDepartmentController,
  createProgramController,
  deleteProgramController,
  deleteDepartmentController,
  createAllController,
  fetchByTbController,
} = require("../modules");
const Defaults = require("../contants/defaults");

const router = express.Router();

// auth routes
router.post(Defaults.Register, userExists, registerController);
router.post(Defaults.Login, loginUserController);

// fetch
router.get(Defaults.FetchDepartment, verifyJWT, fetchDepartmentController);
router.get(Defaults.FetchProgram, verifyJWT, fetchProgramController);
router.get(Defaults.FetchSession, verifyJWT, fetchSessionController);
router.get(Defaults.FetchSemester, verifyJWT, fetchSemesterController);
router.get(Defaults.FetchSubjectsByTbId, verifyJWT, fetchByTbController);

// create
router.post(Defaults.CreateDepartment, verifyJWT, createDepartmentController);
router.post(Defaults.CreateTimeTable, verifyJWT, createNewTimetableController);
router.post(Defaults.CreateProgram, verifyJWT, createProgramController);
router.post(Defaults.CreateAll, verifyJWT, createAllController);

// Delete
router.delete(
  Defaults.DeleteTimeTableById,
  verifyJWT,
  deleteTimetableController
);
router.delete(
  Defaults.DeleteDepartmentById,
  verifyJWT,
  deleteDepartmentController
);
router.delete(Defaults.DeleteProgramById, verifyJWT, deleteProgramController);

router.get(Defaults.FetchTimeTableById, verifyJWT, fetchTimetableController);
router.post("/", (req, res) => {
  res.send("server running!");
});
router.get("/", (req, res) => {
  res.send("server running!");
});

module.exports = router;
