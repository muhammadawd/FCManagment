<template>

  <card class="card" :title="$ml.get('edit_excuses')">
    <div>
      <form @submit.prevent>
        <div class="row">

          <div class="col-md-8 text-left">
            <label> {{$ml.get('student_name')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedStudent" label="name"
                          track-by="name"
                          disabled=""
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
                          disabled=""
                          @select="termChanged()"
                          :options="all_terms" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>

          </div>
          <div class="col-md-4 text-left">
            <label>{{$ml.get('course_name')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedOpenSemesterCourse" label="name"
                          track-by="name"
                          disabled=""
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
          <div class="col-md-7 text-left">
            <label> {{$ml.get('notes')}} </label>
            <textarea class="form-control" v-model="notes" rows="5"></textarea>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="editExcuse()">
            {{$ml.get('edit')}}
          </p-button>
        </div>

        <!--        <div class="row">-->
        <!--          <div class="col-md-12 text-left">-->
        <!--            <button class="btn btn-info btn-round" @click="triggerFileClick()">-->
        <!--              <i class="ti-files"></i>-->
        <!--            </button>-->
        <!--            <input type="file" class="d-none" :ref="'file_input'"-->
        <!--                   @change="uploadFile()">-->
        <!--          </div>-->
        <!--          <div class="col-md-12 text-left">-->
        <!--            <table class="table table-striped">-->
        <!--              <thead>-->
        <!--              <tr>-->
        <!--                <th>{{$ml.get('file')}}</th>-->
        <!--                <th></th>-->
        <!--              </tr>-->
        <!--              </thead>-->
        <!--              <tbody>-->
        <!--              <tr v-for="_filesToUpload in filesToUpload">-->
        <!--                <td>-->
        <!--                  <div>-->
        <!--                    <b>{{_filesToUpload.name}}</b>-->
        <!--                    <br>-->
        <!--                    <div class="font-weight-bold text-info direction-inverse">{{convertSize(_filesToUpload.size)}}-->
        <!--                    </div>-->
        <!--                    <div class="progress">-->
        <!--                      <div class="progress-bar bg-info progress-bar-animated progress-bar-striped"-->
        <!--                           role="progressbar" style="width: 25%;" aria-valuenow="25"-->
        <!--                           aria-valuemin="0" aria-valuemax="100">25%-->
        <!--                      </div>-->
        <!--                    </div>-->

        <!--                  </div>-->
        <!--                </td>-->
        <!--                <td>-->
        <!--                  <button class="btn btn-primary btn-round m-1">-->
        <!--                    <i class="ti-upload"></i>-->
        <!--                  </button>-->
        <!--                  <button class="btn btn-danger btn-round m-1">-->
        <!--                    <i class="ti-trash"></i>-->
        <!--                  </button>-->
        <!--                </td>-->
        <!--              </tr>-->
        <!--              </tbody>-->
        <!--            </table>-->
        <!--          </div>-->
        <!--        </div>-->

        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
  import multiSelect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css';
  import flatPickr from 'vue-flatpickr-component';

  export default {
    name: "EditException",
    components: {
      multiSelect,
      flatPickr
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
        filesToUpload: [],
        selectedStatus: null,
        date: new Date(),
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
      vm.findExcuse();

    },
    methods: {
      getAllStudents(id) {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_STUDENTS + `?search_query=${vm.search_query}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.allStudents = response.data.result;
                $.each(vm.allStudents, function (index, item) {
                  if (item.idstudents == id) {
                    vm.selectedStudent = item;
                    return
                  }
                });
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

      getAllSemester(id) {
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
                  vm.getAllOpenedCourse(vm.all_terms[0].idsemester, id)
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

      getAllOpenedCourse(term_id, id) {
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

                $.each(vm.all_term_courses, function (index, item) {
                  console.log(item)
                  if (item.idcourses == id) {
                    vm.selectedOpenSemesterCourse = item;
                    return
                  }
                });
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

      findExcuse() {

        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);
        let id = vm.$route.params.id;

        try {
          window.serviceAPI.API().get(window.serviceAPI.FIND_EXCEPTION + `/${id}`,)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              let status = response.data.status;
              let data = response.data.data;
              if (status) {
                let excuse = data.result[0]
                console.log(excuse)
                vm.notes = excuse.notes;
                vm.type = excuse.ex_type;
                vm.getAllStudents(excuse.idstudents);
                vm.getAllSemester(excuse.idopen_semester_course);
              }
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },
      editExcuse() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        let id = vm.$route.params.id;
        try {
          window.serviceAPI.API().put(window.serviceAPI.UPDATE_EXCEPTION + `/${id}`, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.showMessage('success', vm);
              // vm.$router.push({name: 'excuses'});
              location.reload()
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },

      convertSize(size) {
        return (size / 1024).toFixed(2) + ' KB';
      },
      uploadFile() {
        let vm = this;
        let files = vm.$refs.file_input.files[0];
        vm.filesToUpload.push(files);
      },
      triggerFileClick() {
        let vm = this;
        vm.$refs.file_input.click()
      },
    }
  }
</script>

<style scoped>

</style>
