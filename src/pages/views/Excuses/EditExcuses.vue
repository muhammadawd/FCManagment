<template>

  <card class="card" :title="$ml.get('edit_excuses')">
    <div>
      <form @submit.prevent>
        <div class="row">

          <div class="col-md-3 text-left">
            <label> {{$ml.get('student_name')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedStudent"
                          :options="[]"></multi-select>
          </div>

          <div class="col-md-3 text-left">
            <label> {{$ml.get('course_name')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedCourse"
                          :options="[]"></multi-select>
          </div>

        </div>

        <div class="row">

          <div class="col-md-3 text-left">
            <label> {{$ml.get('date')}} </label>
            <flat-pickr v-model="date" class="form-control"></flat-pickr>
          </div>

          <div class="col-md-3 text-left">
            <label> {{$ml.get('status')}} </label>
            <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedStatus"
                          :options="[]"></multi-select>
          </div>

        </div>

        <div class="row">
          <div class="col-md-7 text-left">
            <label> {{$ml.get('notes')}} </label>
            <textarea class="form-control" rows="5"></textarea>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="updateLecturer">
            {{$ml.get('edit')}}
          </p-button>
        </div>

        <div class="row">
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
  import flatPickr from 'vue-flatpickr-component';

  export default {
    name: "AddLecturer",
    components: {
      multiSelect,
      flatPickr
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
    },
    data() {
      return {
        filesToUpload: [],
        selectedStatus: null,
        date: new Date(),
        selectedStudent: null,
        selectedCourse: null,
      }
    }
  }
</script>

<style scoped>

</style>
