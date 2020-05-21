<template>

  <card class="card" :title="$ml.get('edit_degrees')">
    <div>
      <form @submit.prevent v-if="degree">

        <div class="row">

          <div class="col-md-4 text-left">
            <label> {{$ml.get('student_name')}} </label>
            <input type="text" class="form-control" v-model="selectedStudent" :disabled="true">
            <div class="text-left text-danger" id="studentId_error"></div>
            <div class="text-left text-danger" id="idopen_semester_course_error"></div>
          </div>

          <div class="col-md-4 text-left">
            <!--            <label> {{$ml.get('course_name')}} </label>-->
            <!--            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedCourse"-->
            <!--                          :options="[]"></multi-select>-->
          </div>
          <div class="pull-right position-absolute text-center" style="top: 0;"
               :style="$ml.current == 'ar' ? 'left:0' : 'right:0'">
            <div class="card">
              <div class="card-body bg-secondary text-white shadow"
                   :class="degree.gradePoints == 4 ? 'bg-success' : degree.gradePoints < 4 && degree.gradePoints > 3  ? 'bg-info' : degree.gradePoints < 3 && degree.gradePoints > 2 ? 'bg-warning' : 'bg-danger'">
                <h4 style="font-size: 60px;direction: ltr">
                  {{selectedGrade}}
                  <sub style="font-size: 15px">{{degree.gradePoints}}</sub>
                </h4>
                <b>{{selectedStatus}}</b>
              </div>
            </div>
          </div>

        </div>

        <div class="row">
          <div class="col-md-3">
            <fg-input type="text"
                      :label="$ml.get('final')"
                      v-model="finalMark"
                      :placeholder="$ml.get('final')">
            </fg-input>
            <div class="text-left text-danger" id="finalMark_error"></div>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      v-model="practicalMark"
                      :label="$ml.get('working_task')"
                      :placeholder="$ml.get('working_task')">
            </fg-input>
            <div class="text-left text-danger" id="practicalMark_error"></div>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      v-model="attendancePercentage"
                      :label="$ml.get('absence_percent')"
                      :placeholder="$ml.get('absence_percent')">
            </fg-input>
            <div class="text-left text-danger" id="attendancePercentage_error"></div>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 text-left">
            <label>{{$ml.get('student_status')}}</label>
            <select v-model="status" class="form-control">
              <option v-for="(status , key) in all_degree_status" :value="status.idstatus">{{status.name}}</option>
            </select>
            <div class="text-left text-danger" id="idstatus_error"></div>
          </div>
          <div class="col-md-8 text-left">
            <label>{{$ml.get('notes')}}</label>
            <textarea v-model="notes" class="form-control"></textarea>
            <div class="text-left text-danger" id="notes_error"></div>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="updateDegreeInfo()">
            {{$ml.get('edit')}}
          </p-button>
        </div>

        <!--        <div class="row d-none">-->
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

  export default {
    name: "editDegree",
    components: {
      multiSelect
    },
    data() {
      return {
        filesToUpload: [],
        all_degree_status: [],
        selectedStudent: null,
        selectedStatus: null,
        selectedCourse: null,
        status: null,
        degree: null,
        attendancePercentage: null,
        finalMark: null,
        practicalMark: null,
        idstatus: null,
        notes: null,
      }
    },
    mounted() {
      let vm = this;
      vm.getDegreeInfo();
      vm.getAllStatus();
    },
    methods: {
      getDegreeInfo() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let studentId = vm.$route.params.studentId;
        let idopen_semester_course = vm.$route.params.idopen_semester_course;
        try {
          window.serviceAPI.API().post(window.serviceAPI.GET_DEGREE_INFO + `?idopen_semester_course=${idopen_semester_course}&studentId=${studentId}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.degree = response.data.result[0];
                vm.attendancePercentage = vm.degree.attendancePercentage;
                vm.finalMark = vm.degree.finalMark;
                vm.practicalMark = vm.degree.practicalMark;
                vm.status = vm.degree.idstatus;
                vm.selectedStudent = vm.degree['Student Name'];
                vm.selectedStatus = vm.degree['Student Status'];
                vm.selectedGrade = vm.degree.gradeString;
                vm.notes = vm.degree.notes;
                return null;
              }
              vm.degree = null;

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.degree = null;
          });
        } catch (e) {
          console.log(e)
        }
      },
      prepareData() {
        let vm = this;
        return {
          studentId: vm.studentId,
          idopen_semester_course: vm.idopen_semester_course,
          attendancePercentage: vm.attendancePercentage,
          practicalMark: vm.practicalMark,
          finalMark: vm.finalMark,
          notes: vm.notes,
          idstatus: vm.status,

        };
      },
      prepareValidationInputs() {
        return {
          studentId: 'input',
          idopen_semester_course: 'input',
          attendancePercentage: 'input',
          practicalMark: 'input',
          finalMark: 'input',
          notes: 'input',
          idstatus: 'input',
        };
      },
      updateDegreeInfo() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let studentId = vm.$route.params.studentId;
        let idopen_semester_course = vm.$route.params.idopen_semester_course;
        let _request_data = vm.prepareData();
        let request_data = window.helper.prepareObjectToSend(_request_data);

        try {
          window.serviceAPI.API().put(window.serviceAPI.UPDATE_DEGREE_INFO + `/${studentId}/${idopen_semester_course}`, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                window.helper.showMessage('success', vm);
                location.reload();
                // vm.$router.push({name: 'terms'});
              }

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
      getAllStatus() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.GET_DEGREE_STATUS)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.all_degree_status = response.data.result;
                $.each(vm.all_degree_status, function (index, item) {
                  if (item.idstatus == vm.idstatus) {
                    vm.status = item;
                    return
                  }
                })
                return null;
              }
              vm.all_degree_status = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_degree_status = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
    },
  }
</script>

<style scoped>

</style>
