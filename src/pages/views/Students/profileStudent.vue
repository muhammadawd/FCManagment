<template>
  <div>
    <card class="card" :title="$ml.get('profile_student')">
      <div>
        <table class="table table-bordered direction text-left">
          <thead>
          <tr>
            <th class="font-weight-bold">{{$ml.get('id')}}</th>
            <th class="font-weight-bold">{{$ml.get('student_name')}}</th>
            <th class="font-weight-bold">{{$ml.get('gpa')}}</th>
            <th class="font-weight-bold">{{$ml.get('_program')}}</th>
            <th class="font-weight-bold">{{$ml.get('level')}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="topData">
            <td>{{topData.student_code}}</td>
            <td>{{topData.name}}</td>
            <td>{{gpa}}</td>
            <td>{{topData.program_name}}</td>
            <td>{{topData.program_level_name}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </card>

    <card class="card" :title="$ml.get('filter')">
      <div class="row  direction text-left">
        <!-- <div class="col-md-4">
          <label>{{$ml.get('year')}}</label>
          <select class="form-control" v-model="year">
            <option v-for="_year in years" :value="_year">{{ _year }}</option>
          </select>
        </div>
        <div class="col-md-4">
          <label>{{$ml.get('level')}}</label>
          <select class="form-control" v-model="idprogram_levels">
            <option v-for="(level ,key) in programLevels" :value="level.idprogram_levels">{{level.name}}</option>
          </select>
        </div> -->
        <div class="col-md-4">
          <label>{{$ml.get('term')}}</label>
          <select class="form-control" v-model="idSemester">
            <option v-for="(term ,key) in all_terms" :value="term.idsemester">{{term.name}}</option>
          </select>
        </div>
        <div class="col-md-12 text-center mt-3">
          <button class="btn btn-danger" @click="getStudentSubjects()">{{$ml.get('filter')}}</button>
        </div>
      </div>
    </card>

    <card class="card">
      <div class="table-responsive">
        <table class="table table-bordered direction text-left">
          <thead>
          <tr>
            <th class="font-weight-bold">code</th>
            <th class="font-weight-bold">name</th>
            <th class="font-weight-bold">hours</th>
            <th class="font-weight-bold">year</th>
            <th class="font-weight-bold">grade</th>
            <th class="font-weight-bold">term work</th>
            <th class="font-weight-bold">exam work</th>
            <th class="font-weight-bold">result</th>
            <!-- <th class="font-weight-bold">level</th> -->
            <th class="font-weight-bold">term</th>
            <th class="font-weight-bold">absence</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(co,key) in allAvailableSelectedCourses" :key="key">
            <td>{{co.code}}</td>
            <td>{{co.name}}</td>
            <td>{{co.actualLectureHourNum}}</td>
            <td>{{co.year }}</td>
            <td>{{co.total_grade }}</td>
            <td>{{co.practical_grade  }}</td>
            <td>{{co.final_grade}}</td>
            <td>{{co.total_degree}}</td>
            <!-- <td>{{co.level}}</td> -->
            <td>{{co.term}}</td>
            <td>{{co.attendence_grade}}</td>
          </tr>
          </tbody>
        </table>
      </div>
    </card>
  </div>
</template>

<script>
  import multiSelect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css';
  import VueCropper from 'vue-cropperjs';
  import 'cropperjs/dist/cropper.css';

  export default {
    name: "profilestudent",
    components: {
      multiSelect,
      VueCropper
    },
    computed: {
      years() {
        const year = new Date().getFullYear()
        return Array.from({length: year - 2009}, (value, index) => 2010 + index)
      }
    },
    data() {
      return {
        isLoading: false,
        programId: null,
        gpa: 0,
        all_terms: [],
        programLevels: [],
        year: null,
        idSemester: null,
        idprogram_levels: null,
        topData: null,
        selected_corses: [],
        allAvailableSelectedCourses: [],
      }
    },
    async created() {
      let vm = this;
      try {
        let auth_data = window.ls.getFromStorage('auth_data');
        vm.programId = vm.$helper.getCurrentProgramId();
      } catch (e) {
        vm.programId = null;
      }

      await vm.getAllProgramLevels();
      // await vm.findStudent();
      await vm.getAllSemester();
      await vm.findStudentProfileData();
    },
    watch: {},
    methods: {
      findStudent() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let id = vm.$route.params.id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.FIND_STUDENTS + `/${id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data.data.result;
              console.log(response)
              vm.name = response[0].name;
              vm.stu_img = response[0].stu_img;
              vm.email = response[0].email;
              vm.address = response[0].address;
              vm.nationalNum = response[0].nationalNum;
              vm.country_name = response[0].country_name;
              vm.governate_name = response[0].governate_name;
              vm.secondry_depts_name = response[0].secondry_depts_name;
              vm.stu_img = response[0].stu_img;
              vm.city_name = response[0].city_name;
              $.each(vm.secSecondary, function (index, item) {
                if (response[0].idsecondary_depts == item.idsecondary_depts) {
                  vm.selectedSecondary = item;
                  return
                }
              });
              $.each(vm.programLevels, function (index, item) {
                if (response[0].idprogram_levels == item.idprogram_levels) {
                  vm.selectedProgramLevels = item;
                  return
                }
              });
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },
      getAllSemester() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_SEMESTERS + `?idprogram=${vm.programId}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.all_terms = response.data.result;
                return null;
              }
              vm.all_terms = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_terms = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      getAllProgramLevels() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_PROGRAM_LEVELS + `?idprogram=${vm.programId}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.programLevels = response.data.result;
                return null;
              }
              vm.programLevels = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.programLevels = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      findStudentProfileData() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let id = vm.$route.params.id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.GET_STUDENT_PROFILE_DATA, {
            params: {
              idStudent: id,
              idSemester: vm.idSemester,
              year: vm.year,
              idprogram_levels: vm.idprogram_levels,
            }
          })
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              // console.log(response.data.data.data)
              response = response.data.data.data;
              vm.topData = response.result[0];
              vm.selected_corses = response.selected_corses;
              console.log(response);
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },
      getStudentSubjects() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let program_id = vm.$helper.getCurrentProgramId();
        let idstudents = vm.$route.params.id;
        let idsemester = vm.idSemester;

        try {
          window.serviceAPI.API().get(window.serviceAPI.GET_STUDENT_COURSE_CONFIG + `?idStudent=${idstudents}&idSemister=${idsemester}&idPrograme=${program_id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              let status = response.data.status;
              let data = response.data.data;
              if (status) {
                vm.allAvailableSelectedCourses = data.allAvailableSelectedCourses;
                vm.gpa = data.student.gpa;
                return
              }
              vm.allAvailableSelectedCourses = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            vm.allAvailableSelectedCourses = [];
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },
    }
  }
</script>

<style scoped>

</style>
