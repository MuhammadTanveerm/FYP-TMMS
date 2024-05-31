module.exports = {
  //
  API_VERSION: "/api/v1",

  // delete routes
  DeleteTimeTableById: "/deletett/:id",
  DeleteDepartmentById: "/delete-department/:id",
  DeleteProgramById: "/delete-program/:id",

  //   auth routes
  Register: "/register",
  Login: "/login",

  //   fetch routes
  FetchTimeTableById: "/fetch-timetable",
  FetchDepartment: "/fetch-department",
  FetchProgram: "/fetch-program",
  FetchSession: "/fetch-session",
  FetchSemester: "/fetch-semester",
  FetchSubjectsByTbId: "/fetch-subjects-by-tb",

  // create routes
  CreateTimeTable: "/create-timetable",
  CreateDepartment: "/create-department",
  CreateProgram: "/create-program",
  CreateAll: "/create-all",
};
