<template>

  <card class="card" :title="$ml.get('edit_degrees')">
    <div>
      <form @submit.prevent>

        <div class="row">

          <div class="col-md-4 text-left">
            <label> {{$ml.get('student_name')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedStudent"
                          :options="[]"></multi-select>
          </div>

          <div class="col-md-4 text-left">
            <label> {{$ml.get('course_name')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedCourse"
                          :options="[]"></multi-select>
          </div>
        </div>

        <div class="row">
          <div class="col-md-3">
            <fg-input type="text"
                      :label="$ml.get('final')"
                      :placeholder="$ml.get('final')">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      :label="$ml.get('working_task')"
                      :placeholder="$ml.get('working_task')">
            </fg-input>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      :label="$ml.get('absence_percent')"
                      :placeholder="$ml.get('absence_percent')">
            </fg-input>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4 text-left">
            <label>{{$ml.get('student_status')}}</label>
            <select v-model="status"  class="form-control">
              <option v-for="(status , key) in all_degree_status" :value="status.idstatus">{{status.name}}</option>
            </select>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="updateLecturer">
            {{$ml.get('edit')}}
          </p-button>
        </div>

        <div class="row d-none">
          <div class="col-md-12 text-left">
            <button class="btn btn-info btn-round" @click="triggerFileClick()">
              <i class="ti-files"></i>
            </button>
            <input type="file" class="d-none" :ref="'file_input'"
                   @change="uploadFile()">
          </div>
          <div class="col-md-12 text-left">
            <table class="table table-striped">
              <thead>
              <tr>
                <th>{{$ml.get('file')}}</th>
                <th></th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="_filesToUpload in filesToUpload">
                <td>
                  <div>
                    <b>{{_filesToUpload.name}}</b>
                    <br>
                    <div class="font-weight-bold text-info direction-inverse">{{convertSize(_filesToUpload.size)}}
                    </div>
                    <div class="progress">
                      <div class="progress-bar bg-info progress-bar-animated progress-bar-striped"
                           role="progressbar" style="width: 25%;" aria-valuenow="25"
                           aria-valuemin="0" aria-valuemax="100">25%
                      </div>
                    </div>

                  </div>
                </td>
                <td>
                  <button class="btn btn-primary btn-round m-1">
                    <i class="ti-upload"></i>
                  </button>
                  <button class="btn btn-danger btn-round m-1">
                    <i class="ti-trash"></i>
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
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
    name: "AddLecturer",
    components: {
      multiSelect
    },
    mounted() {
      this.getAllStatus();
    },
    methods: {
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
    data() {
      return {
        filesToUpload: [],
        all_degree_status: [],
        selectedStudent: null,
        selectedCourse: null,
        status: null,
      }
    }
  }
</script>

<style scoped>

</style>
