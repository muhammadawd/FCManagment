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
        path: "edit_lecturer/:id",
        name: "edit_lecturer",
        component: EditLecturer
      },
      {
        path: "add_lecturer",
        name: "add_lecturer",
        component: AddLecturer
      },

      {
        path: "countries",
        name: "country",
        component: Country
      },
      {
        path: "edit_country/:id",
        name: "edit_country",
        component: EditCountry
      },
      {
        path: "edit_government/:id",
        name: "edit_government",
        component: EditGovernment
      },
      {
        path: "add_country",
        name: "add_country",
        component: AddCountry
      },
      {
        path: "add_government",
        name: "add_government",
        component: AddGovernment
      },

      {
        path: "sec_section",
        name: "sec_section",
        component: Sec_Sections
      },
      {
        path: "edit_sec_section/:id",
        name: "edit_sec_section",
        component: EditSec_Sections
      },
      {
        path: "add_sec_section",
        name: "add_sec_section",
        component: AddSec_Sections
      },

      {
        path: "programs",
        name: "programs",
        component: Programs
      },
      {
        path: "edit_program/:id",
        name: "edit_program",
        component: EditProgram
      },
      {
        path: "add_program",
        name: "add_program",
        component: AddProgram
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
