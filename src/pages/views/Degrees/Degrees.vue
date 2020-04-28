<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-12" v-if="!selectedFileType || !selectedOpenSemesterCourse">
        <div class="alert alert-danger text-left">
              <span>
                  <b> {{$ml.get('note')}} </b>
                {{$ml.get('degree_hint')}}
              </span>
        </div>
      </div>
      <div class="col-md-8 text-left">

        <div class="row">
          <div class="col-md-12">
            <label>{{$ml.get('student_name')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedStudent" label="name"
                          track-by="name"
                          :options="allStudents" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
            <div class="text-danger text-left" id="studentId_error"></div>
            <!--          <div class="text-danger text-left" id="idsecondary_depts_error"></div>-->
          </div>
          <div class="col-md-6">
            <label>{{$ml.get('term')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedTerm" label="name"
                          track-by="name"
                          @select="termChanged()"
                          :options="all_terms" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
          </div>
          <div class="col-md-6">
            <label>{{$ml.get('course_name')}}</label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedOpenSemesterCourse" label="name"
                          track-by="name"
                          :options="all_term_courses" open-direction="bottom" :multiple="false" :searchable="true"
                          :loading="isLoading" :internal-search="true" :clear-on-select="false"
                          :close-on-select="true"></multi-select>
            <div class="text-danger text-left" id="idopen_semester_course_error"></div>
          </div>
        </div>
        <br>
        <button @click="getAllStudentGrades()" class="btn btn-secondary"
                :disabled="!selectedOpenSemesterCourse">{{$ml.get('search')}}
        </button>
      </div>


      <div class="col-md-4 text-right">
        <label> </label>
        <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedFileType" label="name"
                      track-by="name"
                      :options="allFileTypes" open-direction="bottom" :multiple="false" :searchable="true"
                      :loading="isLoading" :internal-search="true" :clear-on-select="false"
                      :close-on-select="true"></multi-select>
        <br>
        <button @click="triggerFileClick()" class="btn btn-success btn-outline-success"
                :disabled="!selectedFileType || !selectedOpenSemesterCourse">
          <i class="ti-upload"></i>
          {{$ml.get('upload_file')}}
        </button>
        &nbsp;
        <button @click="getFileDownload()" class="btn btn-success btn-outline-success"
                :disabled="!selectedFileType || !selectedOpenSemesterCourse">
          <i class="ti-download"></i>
          {{$ml.get('download_file')}}
        </button>

        <input type="file" class="d-none" :ref="'file_input'"
               @change="uploadFile()">
      </div>


      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('student_name')}}</th>
            <!--            <th>{{$ml.get('course_name')}}</th>-->
            <th>{{$ml.get('absence_percent')}}</th>
            <th>{{$ml.get('working_task')}}</th>
            <th>{{$ml.get('final')}}</th>
            <th>{{$ml.get('student_status')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in allStudentGrades" :key="index">
              <td>{{item.idstudents}}</td>
              <td><b>{{item['Student Name']}}</b></td>
              <!--              <td><b>JAVA SE</b></td>-->
              <td><b>{{item.attendancePercentage}}</b></td>
              <td><b>{{item.practicalMark}}</b></td>
              <td><b>{{item.finalMark}}</b></td>
              <td>
                <b>{{item['Student Status']}}</b>
                <span class="text-info">({{item.gradeString}})</span>
              </td>
              <td>
                <div class="btn-group direction-inverse">
                  <!--                  idopen_semester_course=8&studentId=2-->
                  <router-link
                    :to="{name:'edit_degrees',params:{'studentId':item.idstudents,'idopen_semester_course':(selectedOpenSemesterCourse ? selectedOpenSemesterCourse.idopen_semester_course : '')}}"
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
    <sweet-modal :ref="'xlsxModal'" hide-close-button blocking overlay-theme="dark" width="50%">

      <div class="row">
        <div class="col-md-12  text-danger text-left" v-if="import_error">
          <i class="ti ti-info-alt"></i> {{import_error}}
        </div>
        <div class="col-md-12">
          <table class="table table-bordered">
            <thead>
            <tr>
              <td v-for="(row , key) in dataFromXlsx[0]">{{row}}</td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row , key) in preparedDataFromXlsx" :key="key">
              <td v-for="(item , _key) in row" :key="key+'_'+_key">
                {{item}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <template slot="box-action">
        <button class="btn btn-success" @click="closeModal('xlsxModal')">
          {{$ml.get('upload_data')}}
        </button>
      </template>
    </sweet-modal>

  </card>
</template>

<script>
  import multiSelect from 'vue-multiselect'
  import {SweetModal, SweetModalTab, Sweet} from 'sweet-modal-vue'
  import 'vue-multiselect/dist/vue-multiselect.min.css';
  import XLSX from 'xlsx'
  // import readXlsxFile from 'read-excel-file'


  const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x, i) => ({
    name: XLSX.utils.encode_col(i),
    key: i
  }));
  const _SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
  ].map(function (x) {
    return "." + x;
  }).join(",");

  export default {
    name: "Degrees",
    components: {
      multiSelect,
      SweetModal,
      SweetModalTab
    },
    data() {
      return {
        search_query: '',
        import_error: '',
        isLoading: false,
        allStudentGrades: [],
        selectedStudent: null,
        allStudents: [],
        selectedFileType: null,
        allFileTypes: [
          {
            id: 1,
            name: 'Attendance Degree File'
          },
          {
            id: 2,
            name: 'Practical Degree File'
          },
          {
            id: 3,
            name: 'Final Degree File'
          },
          {
            id: 4,
            name: 'All Student Degrees'
          },
        ],

        selectedTerm: null,
        all_terms: [],

        selectedOpenSemesterCourse: null,
        all_term_courses: [],
        programId: null,

        dataFromXlsx: [],
        preparedDataFromXlsx: [],
        SheetJSFT: _SheetJSFT
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

      switchGetFileService() {
        let vm = this;
        let expression = vm.selectedFileType.id;
        switch (expression) {
          case 1:
            return {
              key: 'studentsAttendancePercentage',
              imports: window.serviceAPI.POST_STUDENT_COURSE_SEM_ATTENDANCE,
              exports: window.serviceAPI.GET_STUDENT_COURSE_SEM_ATTENDANCE
            };
            break;
          case 2:
            return {
              key: 'studentsGradesPractical',
              imports: window.serviceAPI.POST_STUDENT_COURSE_SEM_PRACTICAL,
              exports: window.serviceAPI.GET_STUDENT_COURSE_SEM_PRACTICAL
            };
            break;
          case 3:
            return {
              key: 'studentsFinalMarks',
              imports: window.serviceAPI.POST_STUDENT_COURSE_SEM_FINAL,
              exports: window.serviceAPI.GET_STUDENT_COURSE_SEM_FINAL
            };
            break;
          case 4:
            return {
              key: 'allStudentDegrees',
              imports: window.serviceAPI.POST_STUDENT_ALL_DEGREES,
              exports: window.serviceAPI.GET_STUDENT_ALL_DEGREES
            };
            break;
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

      getFileDownload() {
        let vm = this;
        let url = vm.switchGetFileService();
        vm.getDownloadFileData(url);
      },

      getDownloadFileData(url) {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let current_course_sem_id = vm.selectedOpenSemesterCourse ? vm.selectedOpenSemesterCourse.idopen_semester_course : null;
        let current_student_id = vm.selectedStudent ? vm.selectedStudent.idstudents : null;
        try {
          window.serviceAPI.API().post(url.exports + `?idopen_semester_course=${current_course_sem_id}&studentId=${current_student_id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              let status = response.data.status;
              if (status) {
                let data = response.data.data.result;

                // export data here
                vm.exportDataXlsx(data, url);
              }
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },

      exportDataToCsv(arrData) {
        console.log(arrData)
        let csvContent = "data:text/csv;charset=utf-8,";
        csvContent += [
          Object.keys(arrData[0]).join(";"),
          ...arrData.map(item => Object.values(item).join(";"))
        ]
          .join("\n")
          .replace(/(^\[)|(\]$)/gm, "");

        const data = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", data);
        link.setAttribute("download", "export.csv");
        link.click();
      },

      exportDataXlsx(arrData, url) {
        var studentsWS = XLSX.utils.json_to_sheet(arrData)
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, studentsWS, 'students');
        console.log(arrData)
        console.log(studentsWS)
        XLSX.writeFile(wb, url.key + '.xlsx')
      },

      importDataXlsx(files) {
        let vm = this;
        if (files && files[0]) vm._file(files[0]);
      },

      _file(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, {type: 'binary'});
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, {header: 1});

          /* Update state */
          this.dataFromXlsx = data;
          this.$refs.xlsxModal.open();
          // console.log(make_cols(ws['!ref']))
        };
        reader.readAsBinaryString(file);
      },

      uploadFile() {
        let vm = this;
        let files = vm.$refs.file_input.files;
        vm.importDataXlsx(files)
      },

      triggerFileClick() {
        let vm = this;
        vm.$refs.file_input.click()
      },

      closeModal(modal) {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let url = vm.switchGetFileService();

        try {
          let _key = url.key;
          let _request_data = {};
          _request_data[_key] = vm.preparedDataFromXlsx;
          // _request_data[_key] = JSON.stringify(vm.preparedDataFromXlsx);
          let request_data = window.helper.prepareObjectToSend(_request_data);
          console.log(_request_data)
          // console.log(request_data)
          let current_course_sem_id = vm.selectedOpenSemesterCourse ? vm.selectedOpenSemesterCourse.idopen_semester_course : null;
          window.serviceAPI.API().post(url.imports + `?idopen_semester_course=${current_course_sem_id}`, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              let status = response.data.status;
              let data = response.data.data;

              // if (status) {
              //   let data = response.data.data.result;
              vm.dataFromXlsx = [];
              vm.preparedDataFromXlsx = [];
              vm.$refs[modal].close();
              vm.import_error = '';
              // }
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            vm.import_error = vm.$ml.get('import_error');
            // window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }

      },

      getAllStudentGrades() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let student_id = vm.selectedStudent ? vm.selectedStudent.idstudents : ''
        let current_course_sem_id = vm.selectedOpenSemesterCourse ? vm.selectedOpenSemesterCourse.idopen_semester_course : '';
        try {
          window.serviceAPI.API().post(window.serviceAPI.GET_ALL_GRADES_INFO_SPECIFIC + `?idopen_semester_course=${current_course_sem_id}&studentId=${student_id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              let status = response.data.status;

              if (status) {
                vm.allStudentGrades = response.data.data.result;
              }
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      }

    },
    watch: {
      dataFromXlsx: function (newValue, oldValue) {
        let vm = this;

        $.each(newValue, (key, item) => {
          if (newValue.length > 1 && key > 0) {
            let object = _.zipObject(newValue[0], newValue[key]);
            vm.preparedDataFromXlsx.push(object)
          }
        });

      }
    }
  }
</script>
