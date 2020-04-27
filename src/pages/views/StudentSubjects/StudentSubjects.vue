<template>
  <card class="card-user">
    <div class="row">

      <div class="col-md-12 mb-2 text-left">
        <router-link :to="{name:'add_student_subject'}" class="btn btn-wd btn-default btn-fill btn-rotate"
                     v-if="$helper.hasAccessPermission('add-pay-hours')">
          <i class="ti-plus"></i>
          {{$ml.get('add_student_subject')}}
        </router-link>
        &nbsp;
        <router-link :to="{name:'confirm_payment_student_subject'}"
                     v-if="$helper.hasAccessPermission('confirm-pay-hours')"
                     class="btn btn-wd btn-default btn-fill btn-rotate">
          <i class="ti-money"></i>
          {{$ml.get('confirm_payment_student_subject')}}
        </router-link>
      </div>
    </div>


    <div class="row">
      <div class="col-md-9 text-left">
        <div class="row">

          <div class="col-md-8 text-left">
            <label> {{$ml.get('student_name')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedStudent" label="name"
                          track-by="name"
                          :options="allStudents" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
            <div class="text-left text-danger" id="idStudent_error"></div>
          </div>

          <div class="col-md-4 text-left">
            <label>{{$ml.get('term')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedTerm" label="name"
                          track-by="name"
                          :options="all_terms" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
            <div class="text-left text-danger" id="idSemister_error"></div>
          </div>
        </div>

      </div>

      <div class="col-md-12 text-center mt-2">
        <button class="btn btn-default" @click="getStudentSubjects()" :disabled="!selectedTerm || !selectedStudent">
          {{$ml.get('search')}}
        </button>
        <div class="text-left text-danger" id="idPrograme_error"></div>
        <div class="text-left text-danger" id="coursesIds_error"></div>
      </div>

      <div class="col-md-3 text-right">
        <!--<fg-input type="text"-->
        <!--:placeholder="$ml.get('search')">-->
        <!--</fg-input>-->
      </div>

      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('course_name')}}</th>
            <th>{{$ml.get('hour_count')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in allAvailableSelectedCourses" :key="index">
              <td>{{index+1}}</td>
              <td><b>{{item.name}} </b> <span class="text-danger" dir="ltr"> ({{item.code}}) </span></td>
              <td>
                <b>{{item.actualLectureHourNum + item.actualPracticalHourNum}}</b>
              </td>
              <!--              <td>-->
              <!--                <div class="text-danger"><i class="ti-close"></i></div>-->
              <!--              </td>-->
              <td>

                <div class="btn-group direction-inverse">
                  <!--                  <button class="btn btn-danger">-->
                  <!--                    <i class="ti-trash"></i>-->
                  <!--                  </button>-->
                  <button class="btn btn-info" @click="withDrawCourse(item)"
                          v-if="$helper.hasAccessPermission('add-withdraw-Course-For-Student')"
                          :disabled="!selectedTerm || !selectedStudent">
                    {{$ml.get('get_back')}}
                  </button>
                  <!--                  <router-link :to="{name:'edit_student_subject',params:{'id':1}}" class="btn btn-info">-->
                  <!--                    <i class="ti-save"></i>-->
                  <!--                  </router-link>-->
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </card>
</template>

<script>
  import multiSelect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css';

  export default {
    components: {
      multiSelect
    },
    name: "Subject_Student",
    data() {
      return {
        isLoading: false,
        search_query: '',
        programId: null,
        notes: null,

        selectedStudent: null,
        allStudents: [],

        selectedTerm: null,
        all_terms: [],
        checked_courses: [],

        allAvailableSelectedCourses: [],
      }
    },
    mounted() {
      let vm = this;
      try {
        let auth_data = window.ls.getFromStorage('auth_data');
        vm.programId = vm.$helper.getCurrentProgramId();
      } catch (e) {
        vm.programId = null;
      }
      vm.getAllStudents();
      vm.getAllSemester();
    },
    methods: {

      withDrawCourse(item) {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let course_id = item.idcourses;
        let program_id = vm.programId;
        let idstudents = vm.selectedStudent ? vm.selectedStudent.idstudents : null;
        let idsemester = vm.selectedTerm ? vm.selectedTerm.idsemester : null;

        try {
          window.serviceAPI.API().post(window.serviceAPI.WITHDRAW_STUDENT_COURSE,
            {
              "idStudent": idstudents,
              "idSemister": idsemester,
              "idPrograme": program_id,
              "courseId": course_id,
              "notes": ""
            })
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              let status = response.data.status;
              let data = response.data.data;
              console.log(data)
              if (status) {

                return
              }

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
        let program_id = vm.programId;
        let idstudents = vm.selectedStudent ? vm.selectedStudent.idstudents : null;
        let idsemester = vm.selectedTerm ? vm.selectedTerm.idsemester : null;

        try {
          window.serviceAPI.API().get(window.serviceAPI.GET_STUDENT_COURSE_CONFIG + `?idStudent=${idstudents}&idSemister=${idsemester}&idPrograme=${program_id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              let status = response.data.status;
              let data = response.data.data;
              if (status) {
                vm.allAvailableSelectedCourses = data.allAvailableSelectedCourses;
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
      prepareData() {
        let vm = this;
        return {
          idStudent: vm.selectedStudent ? vm.selectedStudent.idstudents : null,
          idSemister: vm.selectedTerm ? vm.selectedTerm.idsemester : null,
          idPrograme: vm.programId,
          coursesIds: vm.checked_courses,
        };
      },
      prepareValidationInputs() {
        return {
          idStudent: 'input',
          idSemister: 'input',
          idPrograme: 'input',
          coursesIds: 'input',
        };
      },
      studentRegisterSubjects() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let _request_data = vm.prepareData();
        let request_data = window.helper.prepareObjectToSend(_request_data);
        console.log(_request_data)
        console.log(request_data)
        try {
          window.serviceAPI.API().post(window.serviceAPI.REGISTER_STUDENT_COURSE, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              let status = response.data.status;
              let data = response.data.data;
              console.log(data)

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },

      getAllStudents() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_STUDENTS + `?search_query=${vm.search_query}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.allStudents = response.data.result;
                return null;
              }
              vm.allStudents = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.allStudents = [];
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
    }
  }
</script>
