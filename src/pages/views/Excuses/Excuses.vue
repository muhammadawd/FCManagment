<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-3 text-left">
        <router-link :to="{name:'add_excuses'}" class="btn btn-wd btn-default btn-fill btn-rotate">
          <i class="ti-plus"></i>
          {{$ml.get('add_excuses')}}
        </router-link>
      </div>
      <div class="col-md-9 text-right">
        <div class="row">

          <div class="col-md-6 text-left">
            <label> {{$ml.get('student_name')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedStudent" label="name"
                          track-by="name"
                          :options="allStudents" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
            <div class="text-danger text-left" id="idstudents_error"></div>
          </div>

          <div class="col-md-6 text-left">
            <label> {{$ml.get('date')}} </label>
            <flat-pickr
              v-model="date"
              :config="config"
              class="form-control"
              placeholder="Select date"
              name="date">
            </flat-pickr>
          </div>

          <div class="col-md-6 text-left">
            <label>{{$ml.get('term')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedTerm" label="name"
                          track-by="name"
                          @select="termChanged()"
                          :options="all_terms" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>

          </div>
          <div class="col-md-6 text-left">
            <label>{{$ml.get('course_name')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedOpenSemesterCourse" label="name"
                          track-by="name"
                          :options="all_term_courses" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
            <div class="text-danger text-left" id="idopen_semester_course_error"></div>
          </div>
          <!--          <div class="col-md-6">-->
          <!--            <select class="form-control mt-3" v-model="status">-->
          <!--              <option value="all">{{$ml.get('all')}}</option>-->
          <!--              <option value="accepted">{{$ml.get('status_accepted')}}</option>-->
          <!--              <option value="rejected">{{$ml.get('status_rejected')}}</option>-->
          <!--            </select>-->
          <!--          </div>-->
        </div>
        <div class="text-left mt-2">
          <button class="btn btn-secondary" @click="getAllExceptions()">
            <i class="ti-search"></i>
            {{$ml.get('filter')}}
          </button>
        </div>
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('student_father_name')}}</th>
            <th>{{$ml.get('house_address')}}</th>
            <th>{{$ml.get('date')}}</th>
            <th>{{$ml.get('type')}}</th>
            <th>{{$ml.get('status')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in all_exceptions" :key="index"
                :id="'exception'+item.idexception_decision_council">
              <td>{{index+1}}</td>
              <td>
                <b>{{item.father_full_name}}</b> <br>
                <span class="text-secondary">{{item.mobile}}</span>
              </td>
              <td><b>{{item.house_address}}</b></td>
              <td><b>{{item.created_date}}</b></td>
              <td><b>{{$ml.get(item.ex_type)}}</b></td>
              <td><b class="badge badge-info badge-pill p-2">{{item.status}}</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger" @click="deleteException(item)">
                    <i class="ti-trash"></i>
                  </button>
                  <button class="btn btn-primary" v-if="item.status == 'جديد'" @click="acceptException(item)">
                    {{$ml.get('accept')}}
                  </button>
                  <button class="btn btn-warning" v-if="item.status == 'جديد'" @click="cancelException(item)">
                    {{$ml.get('cancel')}}
                  </button>
                  <router-link :to="{name:'edit_excuses',params:{'id':item.idexception_decision_council}}"
                               class="btn btn-info">
                    <i class="ti-save"></i>
                  </router-link>
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
  import flatPickr from 'vue-flatpickr-component';
  import 'flatpickr/dist/flatpickr.css';
  import {Arabic} from 'flatpickr/dist/l10n/ar.js';
  import multiSelect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css';

  export default {
    name: "Excuses",
    data() {
      return {
        all_exceptions: [],
        isLoading: false,
        programId: null,
        notes: null,

        selectedStudent: null,
        allStudents: [],
        selectedTerm: null,
        all_terms: [],

        selectedOpenSemesterCourse: null,
        all_term_courses: [],
        // Initial value
        date: '',
        // Get more form https://chmln.github.io/flatpickr/options/
        config: {
          dateFormat: "Y-m-d",
          mode: 'range',
          maxDate: "today",
          locale: Arabic, // locale for this instance only
        },
        search_query: '',
        status: 'all',
      }
    },
    mounted() {
      let vm = this;
      try {
        let auth_data = window.ls.getFromStorage('auth_data');
        vm.programId = JSON.parse(auth_data).userInfo.idprogram;
      } catch (e) {
        vm.programId = null;
      }
      vm.getAllExceptions();
      vm.getAllStudents();
      vm.getAllSemester();

    },
    methods: {
      deleteException(exception) {
        // DELETE_EXCEPTIONS
        let vm = this;
        vm.$swal({
          title: vm.$ml.get('confirm_warning'),
          text: vm.$ml.get('are_you_sure'),
          type: 'warning',
          showLoaderOnConfirm: true,
          showCancelButton: true,
          confirmButtonText: vm.$ml.get('yes'),
          cancelButtonText: vm.$ml.get('no')
        }).then((result) => {
          if (result.value) {
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_EXCEPTIONS + `/${exception.idexception_decision_council}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#exception${exception.idexception_decision_council}`).remove()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });

      },
      cancelException(exception) {
        // CANCEL_EXCEPTIONS
        let vm = this;
        vm.$swal({
          title: vm.$ml.get('confirm_warning'),
          text: vm.$ml.get('are_you_sure'),
          type: 'warning',
          showLoaderOnConfirm: true,
          showCancelButton: true,
          confirmButtonText: vm.$ml.get('yes'),
          cancelButtonText: vm.$ml.get('no')
        }).then((result) => {
          if (result.value) {
            window.serviceAPI.API().post(window.serviceAPI.CANCEL_EXCEPTIONS, {'idexception_decision_council': exception.idexception_decision_council})
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                // location.reload()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });

      },
      acceptException(exception) {
        // CANCEL_EXCEPTIONS
        let vm = this;
        vm.$swal({
          title: vm.$ml.get('confirm_warning'),
          text: vm.$ml.get('are_you_sure'),
          type: 'warning',
          showLoaderOnConfirm: true,
          showCancelButton: true,
          confirmButtonText: vm.$ml.get('yes'),
          cancelButtonText: vm.$ml.get('no')
        }).then((result) => {
          if (result.value) {
            window.serviceAPI.API().post(exception.url, {'idexception_decision_council': exception.idexception_decision_council})
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                // location.reload()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });

      },
      getAllExceptions() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let idstudents = vm.selectedStudent ? vm.selectedStudent.idstudents : '';
        let idopen_semester_course = vm.selectedOpenSemesterCourse ? vm.selectedOpenSemesterCourse.idopen_semester_course : '';
        let idsemester = vm.selectedTerm ? vm.selectedTerm.idsemester : '';
        let start_date = '';
        let end_date = '';

        if (vm.date) {
          let splitted = vm.date.split(' - ');
          start_date = splitted[0];
          end_date = splitted[1];
        }

        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_EXCEPTIONS + `?idopen_semester_course=${idopen_semester_course}&idsemester=${idsemester}&idstudents=${idstudents}&startdate=${start_date}&enddate=${end_date}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.all_exceptions = response.data.result;
                return null;
              }
              vm.all_exceptions = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_exceptions = [];
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
                if (vm.all_terms.length > 0) {
                  vm.getAllOpenedCourse(vm.all_terms[0].idsemester)
                }
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

      termChanged() {
        let vm = this;
        let idsemester = vm.selectedTerm ? vm.selectedTerm.idsemester : null;
        if (idsemester) {
          vm.getAllOpenedCourse(idsemester);
        }
      },

      getAllOpenedCourse(term_id) {
        // ALL_OPENED_COURSE_SEMESTER
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_OPENED_COURSE_SEMESTER + `/${term_id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.selectedOpenSemesterCourse = null;
                vm.all_term_courses = response.data.result;
                return null;
              }
              vm.selectedOpenSemesterCourse = null;
              vm.all_term_courses = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.selectedOpenSemesterCourse = null;
            vm.all_term_courses = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
    },
    components: {
      flatPickr, multiSelect
    },
  }
</script>

