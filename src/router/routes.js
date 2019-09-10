import DashboardLayout from "@/layout/dashboard/DashboardLayout.vue";
// GeneralViews
import NotFound from "@/pages/NotFoundPage.vue";

// guest pages
import Login from "@/pages/views/Login.vue";

// Admin pages
import Dashboard from "@/pages/views/Dashboard.vue";

import Lecturer from "@/pages/views/Lecturer/Lecturer.vue";
import AddLecturer from "@/pages/views/Lecturer/AddLecturer.vue";
import EditLecturer from "@/pages/views/Lecturer/EditLecturer.vue";

import Programs from "@/pages/views/Programs/Programs.vue";
import AddProgram from "@/pages/views/Programs/AddProgram.vue";
import EditProgram from "@/pages/views/Programs/EditProgram.vue";
import ShowProgram from "@/pages/views/Programs/ShowProgram.vue";
import ProgramsGrades from "@/pages/views/Programs/ProgramGrades/ProgramsGrades.vue";
import AddProgramGrades from "@/pages/views/Programs/ProgramGrades/AddProgramGrades.vue";
import EditProgramGrades from "@/pages/views/Programs/ProgramGrades/EditProgramGrades.vue";
import ProgramsLevels from "@/pages/views/Programs/ProgramLevels/ProgramsLevels.vue";
import AddProgramLevels from "@/pages/views/Programs/ProgramLevels/AddProgramLevels.vue";
import EditProgramLevels from "@/pages/views/Programs/ProgramLevels/EditProgramLevels.vue";
import ProgramRequires from "@/pages/views/Programs/ProgramRequires/ProgramRequires.vue";
import AddProgramRequires from "@/pages/views/Programs/ProgramRequires/AddProgramRequires.vue";
import EditProgramRequires from "@/pages/views/Programs/ProgramRequires/EditProgramRequires.vue";

import Term from "@/pages/views/Terms/Term.vue";
import AddTerm from "@/pages/views/Terms/AddTerm.vue";
import EditTerm from "@/pages/views/Terms/EditTerm.vue";
import TermSubject from "@/pages/views/Terms/TermSubject.vue";
import TermSubjectAdmins from "@/pages/views/Terms/TermSubjectAdmins.vue";
import TermSubjectHours from "@/pages/views/Terms/TermSubjectHours.vue";

import Students from "@/pages/views/Students/Students.vue";
import AddStudent from "@/pages/views/Students/AddStudent.vue";
import EditStudent from "@/pages/views/Students/EditStudent.vue";

import Excuses from "@/pages/views/Excuses/Excuses.vue";
import AddExcuses from "@/pages/views/Excuses/AddExcuses.vue";
import EditExcuses from "@/pages/views/Excuses/EditExcuses.vue";

import Courses from "@/pages/views/Courses/Courses.vue";
import CoursesRequirement from "@/pages/views/Courses/CoursesRequirement.vue";
import AddCourse from "@/pages/views/Courses/AddCourse.vue";
import EditCourse from "@/pages/views/Courses/EditCourse.vue";

import Country from "@/pages/views/Country/Country.vue";
import AddCountry from "@/pages/views/Country/AddCountry.vue";
import AddGovernment from "@/pages/views/Country/AddGovernment.vue";
import EditCountry from "@/pages/views/Country/EditCountry.vue";
import EditGovernment from "@/pages/views/Country/EditGovernment.vue";

import Sec_Sections from "@/pages/views/Sec_Sections/Sec_Sections.vue";
import AddSec_Sections from "@/pages/views/Sec_Sections/AddSec_Sections.vue";
import EditSec_Sections from "@/pages/views/Sec_Sections/EditSec_Sections.vue";

import Degrees from "@/pages/views/Degrees/Degrees.vue";
import EditDegrees from "@/pages/views/Degrees/EditDegrees.vue";

import StudentSubjects from "@/pages/views/StudentSubjects/StudentSubjects.vue";
import AddStudentSubjects from "@/pages/views/StudentSubjects/AddStudentSubjects.vue";
import EditStudentSubjects from "@/pages/views/StudentSubjects/EditStudentSubjects.vue";


const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {requiresAuth: false}
  },
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {requiresAuth: true}
      },

      {
        path: "degrees",
        name: "degrees",
        component: Degrees,
        meta: {requiresAuth: true}
      },
      {
        path: "degrees/edit_degrees/:id",
        name: "edit_degrees",
        component: EditDegrees,
        meta: {requiresAuth: true}
      },

      {
        path: "lecturer",
        name: "lecturer",
        component: Lecturer,
        meta: {requiresAuth: true}
      },
      {
        path: "lecturer/edit_lecturer/:id",
        name: "edit_lecturer",
        component: EditLecturer,
        meta: {requiresAuth: true}
      },
      {
        path: "lecturer/add_lecturer",
        name: "add_lecturer",
        component: AddLecturer,
        meta: {requiresAuth: true}
      },

      {
        path: "student_subject",
        name: "student_subject",
        component: StudentSubjects,
        meta: {requiresAuth: true}
      },
      {
        path: "student_subject/edit_student_subject/:id",
        name: "edit_student_subject",
        component: EditStudentSubjects,
        meta: {requiresAuth: true}
      },
      {
        path: "student_subject/add_student_subject",
        name: "add_student_subject",
        component: AddStudentSubjects,
        meta: {requiresAuth: true}
      },

      {
        path: "excuses",
        name: "excuses",
        component: Excuses,
        meta: {requiresAuth: true}
      },
      {
        path: "excuses/edit_excuses/:id",
        name: "edit_excuses",
        component: EditExcuses,
        meta: {requiresAuth: true}
      },
      {
        path: "excuses/add_excuses",
        name: "add_excuses",
        component: AddExcuses,
        meta: {requiresAuth: true}
      },

      {
        path: "countries",
        name: "country",
        component: Country,
        meta: {requiresAuth: true}
      },
      {
        path: "countries/edit_country/:id",
        name: "edit_country",
        component: EditCountry,
        meta: {requiresAuth: true}
      },
      {
        path: "countries/edit_government/:id",
        name: "edit_government",
        component: EditGovernment,
        meta: {requiresAuth: true}
      },
      {
        path: "countries/add_country",
        name: "add_country",
        component: AddCountry,
        meta: {requiresAuth: true}
      },
      {
        path: "countries/add_government",
        name: "add_government",
        component: AddGovernment,
        meta: {requiresAuth: true}
      },

      {
        path: "sec_section",
        name: "sec_section",
        component: Sec_Sections,
        meta: {requiresAuth: true}
      },
      {
        path: "sec_section/edit_sec_section/:id",
        name: "edit_sec_section",
        component: EditSec_Sections,
        meta: {requiresAuth: true}
      },
      {
        path: "sec_section/add_sec_section",
        name: "add_sec_section",
        component: AddSec_Sections,
        meta: {requiresAuth: true}
      },

      {
        path: "programs",
        name: "programs",
        component: Programs,
        meta: {requiresAuth: true}
      },
      {
        path: "programs/show_program/:id",
        name: "show_program",
        component: ShowProgram
      },
      {
        path: "programs/edit_program/:id",
        name: "edit_program",
        component: EditProgram
      },
      {
        path: "programs/add_program",
        name: "add_program",
        component: AddProgram,
        meta: {requiresAuth: true}
      },

      {
        path: "programs/program_grades",
        name: "program_grades",
        component: ProgramsGrades,
        meta: {requiresAuth: true}
      },
      {
        path: "programs/add_program_grades/program/:program_id",
        name: "add_program_grades",
        component: AddProgramGrades,
        meta: {requiresAuth: true}
      },
      {
        path: "programs/edit_program_grades/:id/program/:program_id",
        name: "edit_program_grades",
        component: EditProgramGrades,
        meta: {requiresAuth: true}
      },

      {
        path: "programs/add_program_levels/program/:program_id",
        name: "add_program_levels",
        component: AddProgramLevels,
        meta: {requiresAuth: true}
      },
      {
        path: "programs/program_levels",
        name: "program_levels",
        component: ProgramsLevels,
        meta: {requiresAuth: true}
      },
      {
        path: "programs/edit_program_levels/:id/program/:program_id",
        name: "edit_program_levels",
        component: EditProgramLevels,
        meta: {requiresAuth: true}
      },

      {
        path: "programs/add_program_requires/program/:program_id",
        name: "add_program_requires",
        component: AddProgramRequires,
        meta: {requiresAuth: true}
      },
      {
        path: "programs/program_requires",
        name: "program_requires",
        component: ProgramRequires,
        meta: {requiresAuth: true}
      },
      {
        path: "programs/edit_program_requires/:id/program/:program_id",
        name: "edit_program_requires",
        component: EditProgramRequires,
        meta: {requiresAuth: true}
      },

      {
        path: "students",
        name: "students",
        component: Students,
        meta: {requiresAuth: true}
      },
      {
        path: "students/edit_student/:id",
        name: "edit_student",
        component: EditStudent,
        meta: {requiresAuth: true}
      },
      {
        path: "students/add_student",
        name: "add_student",
        component: AddStudent,
        meta: {requiresAuth: true}
      },

      {
        path: "courses",
        name: "courses",
        component: Courses,
        meta: {requiresAuth: true}
      },
      {
        path: "courses/course_requirement/:course_id/program/:program_id",
        name: "course_requirement",
        component: CoursesRequirement,
        meta: {requiresAuth: true}
      },
      {
        path: "courses/edit_course/:id",
        name: "edit_course",
        component: EditCourse,
        meta: {requiresAuth: true}
      },
      {
        path: "courses/add_student",
        name: "add_course",
        component: AddCourse,
        meta: {requiresAuth: true}
      },

      {
        path: "terms",
        name: "terms",
        component: Term,
        meta: {requiresAuth: true}
      },
      {
        path: "terms/term_subjects/:term_id/program/:program_id",
        name: "term_subjects",
        component: TermSubject,
        meta: {requiresAuth: true}
      },
      {
        path: "terms/term_subject_admin/:subject_id/program/:program_id",
        name: "term_subject_admin",
        component: TermSubjectAdmins,
        meta: {requiresAuth: true}
      },
      {
        path: "terms/term_subject_hours/:term_id/program/:program_id",
        name: "term_subject_hours",
        component: TermSubjectHours,
        meta: {requiresAuth: true}
      },
      {
        path: "terms/edit_term/:id",
        name: "edit_term",
        component: EditTerm,
        meta: {requiresAuth: true}
      },
      {
        path: "terms/add_term",
        name: "add_term",
        component: AddTerm,
        meta: {requiresAuth: true}
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
