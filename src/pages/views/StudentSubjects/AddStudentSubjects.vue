<template>
  <card class="card-user">
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

        <!--<router-link :to="{name:'add_lecturer'}" class="btn btn-wd btn-default btn-fill btn-rotate">-->
        <!--<i class="ti-plus"></i>-->
        <!--{{$ml.get('add_lecturer')}}-->
        <!--</router-link>-->
      </div>

      <div class="col-md-12 text-center mt-2">
        <button class="btn btn-default" @click="getStudentSubjects()">
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
            <th>{{$ml.get('hour_price')}}</th>
            <th>{{$ml.get('total')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in allAvailableCourses" :key="index">
              <td>{{index+1}}</td>
              <td><b>{{item.name}} </b> <span class="text-danger" dir="ltr"> ({{item.code}}) </span></td>
              <td>
                <b>{{item.actualLectureHourNum + item.actualPracticalHourNum}}</b>
              </td>
              <td>
                <b>300 ج م</b>
              </td>
              <td>
                <b>{{(item.actualLectureHourNum + item.actualPracticalHourNum) * 300}} ج م</b>
              </td>
              <td>
                <input type="checkbox" class="form-control" v-model="checked_courses" :value="item.idcourses">
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="col-md-8">
        <div class="alert alert-warning text-left">
          <span>
              <b> {{$ml.get('note')}} </b> {{$ml.get('note_hint')}}</span>
        </div>
      </div>
      <div class="col-md-12 text-center">
        <button class="btn btn-secondary" @click="studentRegisterSubjects()">{{$ml.get('add')}}</button>
        <!--        <button class="btn btn-secondary" @click="showModal()">{{$ml.get('add')}}</button>-->
      </div>
    </div>
    <sweet-modal :ref="'invoiceModal'" hide-close-button blocking overlay-theme="dark">

      <div id="printMe">
        <h4 class="text-left direction">
          <span class="text-black">{{$ml.get('student_name')}}: </span>
          <span class="text-secondary">Ahmed Mohamed Ali</span>
        </h4>
        <table class="table table-full-width table-bordered direction">
          <thead>
          <tr>
            <th class="text-left font-weight-bold text-black">{{$ml.get('course_name')}}</th>
            <th class="text-left font-weight-bold text-black">{{$ml.get('price')}}</th>
          </tr>
          </thead>
          <tbody class="text-left text-black font-weight-bold">
          <tr>
            <td>Software Engineering</td>
            <td>1200.00 ج م</td>
          </tr>
          <tr>
            <td>Introduction To Computer Science</td>
            <td>1600.00 ج م</td>
          </tr>
          </tbody>
          <tfoot>
          <tr>
            <td class="text-secondary font-weight-bold text-left">{{$ml.get('sub_total')}}</td>
            <td class="text-secondary font-weight-bold text-left">2800.00 ج م</td>
          </tr>
          <tr>
            <td class="text-danger font-weight-bold text-left">{{$ml.get('discount')}}</td>
            <td class="text-danger font-weight-bold text-left">(0.00) ج م</td>
          </tr>
          <tr>
            <td class="text-info font-weight-bold text-left">{{$ml.get('total')}}</td>
            <td class="text-info font-weight-bold text-left">2800.00 ج م</td>
          </tr>
          </tfoot>
        </table>
      </div>

      <template slot="box-action">
        <button class="btn btn-primary" @click="closeModal('invoiceModal')">
          <i class="ti-printer"></i>
        </button>
      </template>
    </sweet-modal>
  </card>
</template>

<script>
  import multiSelect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css';
  import {SweetModal, SweetModalTab} from 'sweet-modal-vue'

  export default {
    components: {
      multiSelect,
      SweetModal,
      SweetModalTab
    },
    name: "AddStudentSubject",
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

        allAvailableCourses: [],
      }
    },
    mounted() {
      let vm = this;
      try {
        let auth_data = window.ls.getFromStorage('auth_data');
        vm.programId = JSON.parse(auth_data).idprogram;
      } catch (e) {
        vm.programId = null;
      }
      vm.getAllStudents();
      vm.getAllSemester();
    },
    methods: {
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
                vm.allAvailableCourses = data.allAvailableCourses;
                return
              }
              vm.allAvailableCourses = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            vm.allAvailableCourses = [];
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

      showModal() {
        let vm = this;
        vm.$refs.invoiceModal.open();
      },
      closeModal(modal) {
        let vm = this;
        vm.$htmlToPaper('printMe');
        vm.$refs[modal].close();
      }
    }
  }
</script>

<style scoped>
</style>
