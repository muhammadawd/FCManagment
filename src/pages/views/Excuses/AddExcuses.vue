<template>

  <card class="card" :title="$ml.get('add_excuses')">
    <div>
      <form @submit.prevent>
        <div class="row">

          <div class="col-md-8 text-left">
            <label> {{$ml.get('student_name')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedStudent" label="name"
                          track-by="name"
                          :options="allStudents" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
            <div class="text-danger text-left" id="idstudents_error"></div>
          </div>

          <div class="col-md-12"></div>

          <div class="col-md-4 text-left">
            <label>{{$ml.get('term')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedTerm" label="name"
                          track-by="name"
                          @select="termChanged()"
                          :options="all_terms" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>

          </div>
          <div class="col-md-4 text-left">
            <label>{{$ml.get('course_name')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedOpenSemesterCourse" label="name"
                          track-by="name"
                          :options="all_term_courses" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
            <div class="text-danger text-left" id="idopen_semester_course_error"></div>
          </div>
          <div class="col-md-2 text-left">
            <label>{{$ml.get('type')}}</label>
            <select class="form-control" v-model="type">
              <option v-for="(_type, index) in all_types" :value="_type" :key="index">{{$ml.get(_type)}}</option>
            </select>
            <div class="text-danger text-left" id="type_error"></div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-8 text-left">
            <label> {{$ml.get('notes')}} </label>
            <textarea v-model="notes" class="form-control" rows="5"></textarea>
            <div class="text-danger text-left" id="notes_error"></div>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="addExcuse()">
            {{$ml.get('add')}}
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
  import multiSelect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css';

  export default {
    name: "AddExcuse",
    components: {
      multiSelect
    },
    data() {
      return {
        isLoading: false,
        programId: null,
        notes: null,
        search_query: '',

        selectedStudent: null,
        allStudents: [],
        type: '',
        all_types: [
          'final_exam', 'attend'
        ],
        selectedTerm: null,
        all_terms: [],

        selectedOpenSemesterCourse: null,
        all_term_courses: [],
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

      prepareData() {
        let vm = this;
        return {
          type: vm.type,
          notes: vm.notes,
          idstudents: vm.selectedStudent ? vm.selectedStudent.idstudents : null,
          idopen_semester_course: vm.selectedOpenSemesterCourse ? vm.selectedOpenSemesterCourse.idopen_semester_course : null,
        };
      },

      prepareValidationInputs() {
        return {
          type: 'input',
          notes: 'input',
          idstudents: 'input',
          idopen_semester_course: 'input',
        };
      },

      addExcuse() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_EXCEPTIONS, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.showMessage('success', vm);
              vm.$router.push({name: 'excuses'});
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style scoped>

</style>
