import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// Admin pages
import Dashboard from "@/pages/views/Dashboard.vue";

import Lecturer from "@/pages/views/Lecturer/Lecturer.vue";
import AddLecturer from "@/pages/views/Lecturer/AddLecturer.vue";
import EditLecturer from "@/pages/views/Lecturer/EditLecturer.vue";

import Programs from "@/pages/views/Programs/Programs.vue";
import AddProgram from "@/pages/views/Programs/AddProgram.vue";
import EditProgram from "@/pages/views/Programs/EditProgram.vue";
import ProgramsGrades from "@/pages/views/Programs/ProgramGrades/ProgramsGrades.vue";
import AddProgramGrades from "@/pages/views/Programs/ProgramGrades/AddProgramGrades.vue";
import EditProgramGrades from "@/pages/views/Programs/ProgramGrades/EditProgramGrades.vue";
import ProgramsLevels from "@/pages/views/Programs/ProgramLevels/ProgramsLevels.vue";
import AddProgramLevels from "@/pages/views/Programs/ProgramLevels/AddProgramLevels.vue";
import EditProgramLevels from "@/pages/views/Programs/ProgramLevels/EditProgramLevels.vue";
import ProgramRequires from "@/pages/views/Programs/ProgramRequires/ProgramRequires.vue";
import AddProgramRequires from "@/pages/views/Programs/ProgramRequires/AddProgramRequires.vue";
import EditProgramRequires from "@/pages/views/Programs/ProgramRequires/EditProgramRequires.vue";

import Students from "@/pages/views/Students/Students.vue";
import AddStudent from "@/pages/views/Students/AddStudent.vue";
import EditStudent from "@/pages/views/Students/EditStudent.vue";

import Country from "@/pages/views/Country/Country.vue";
import AddCountry from "@/pages/views/Country/AddCountry.vue";
import AddGovernment from "@/pages/views/Country/AddGovernment.vue";
import EditCountry from "@/pages/views/Country/EditCountry.vue";
import EditGovernment from "@/pages/views/Country/EditGovernment.vue";

import Sec_Sections from "@/pages/views/Sec_Sections/Sec_Sections.vue";
import AddSec_Sections from "@/pages/views/Sec_Sections/AddSec_Sections.vue";
import EditSec_Sections from "@/pages/views/Sec_Sections/EditSec_Sections.vue";


const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },

      {
        path: "lecturer",
        name: "lecturer",
        component: Lecturer
      },
      {
        path: "lecturer/edit_lecturer/:id",
        name: "edit_lecturer",
        component: EditLecturer
      },
      {
        path: "lecturer/add_lecturer",
        name: "add_lecturer",
        component: AddLecturer
      },

      {
        path: "countries",
        name: "country",
        component: Country
      },
      {
        path: "countries/edit_country/:id",
        name: "edit_country",
        component: EditCountry
      },
      {
        path: "countries/edit_government/:id",
        name: "edit_government",
        component: EditGovernment
      },
      {
        path: "countries/add_country",
        name: "add_country",
        component: AddCountry
      },
      {
        path: "countries/add_government",
        name: "add_government",
        component: AddGovernment
      },

      {
        path: "sec_section",
        name: "sec_section",
        component: Sec_Sections
      },
      {
        path: "sec_section/edit_sec_section/:id",
        name: "edit_sec_section",
        component: EditSec_Sections
      },
      {
        path: "sec_section/add_sec_section",
        name: "add_sec_section",
        component: AddSec_Sections
      },

      {
        path: "programs",
        name: "programs",
        component: Programs
      },
      {
        path: "programs/edit_program/:id",
        name: "edit_program",
        component: EditProgram
      },
      {
        path: "programs/add_program",
        name: "add_program",
        component: AddProgram
      },

      {
        path: "programs/program_grades",
        name: "program_grades",
        component: ProgramsGrades
      },
      {
        path: "programs/add_program_grades",
        name: "add_program_grades",
        component: AddProgramGrades
      },
      {
        path: "programs/edit_program_grades/:id",
        name: "edit_program_grades",
        component: EditProgramGrades
      },

      {
        path: "programs/add_program_levels",
        name: "add_program_levels",
        component: AddProgramLevels
      },
      {
        path: "programs/program_levels",
        name: "program_levels",
        component: ProgramsLevels
      },
      {
        path: "programs/edit_program_levels/:id",
        name: "edit_program_levels",
        component: EditProgramLevels
      },

      {
        path: "programs/add_program_requires",
        name: "add_program_requires",
        component: AddProgramRequires
      },
      {
        path: "programs/program_requires",
        name: "program_requires",
        component: ProgramRequires
      },
      {
        path: "programs/edit_program_requires/:id",
        name: "edit_program_requires",
        component: EditProgramRequires
      },

      {
        path: "students",
        name: "students",
        component: Students
      },
      {
        path: "students/edit_student/:id",
        name: "edit_student",
        component: EditStudent
      },
      {
        path: "students/add_student",
        name: "add_student",
        component: AddStudent
      },
    ]
  },
  {path: "*", component: NotFound}
];

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
 function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes;
