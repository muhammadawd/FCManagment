<template>
  <div>
    <card class="card" :title="$ml.get('top_50_student')">
      <div class="row direction text-left">
        <div class="col-md-4">
          <label>{{$ml.get('level')}}</label>
          <select class="form-control" v-model="idprogram_levels">
            <option v-for="(level ,key) in programLevels" :value="level.idprogram_levels">{{level.name}}</option>
          </select>
        </div>
        <div class="col-md-12 mt-2">
          <button class="btn btn-danger" @click="findTopStudent()">{{$ml.get('filter')}}</button>
        </div>
      </div>
    </card>

    <card class="card">
      <div class="table-responsive">
        <table class="table table-bordered direction text-left">
          <thead>
          <tr>
            <th class="font-weight-bold">{{$ml.get('code')}}</th>
            <th class="font-weight-bold">{{$ml.get('name')}}</th>
            <th class="font-weight-bold">{{$ml.get('mobile')}}</th>
            <th class="font-weight-bold">{{$ml.get('address')}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(student , k) in students">
            <td>{{student.student_code}}</td>
            <td>{{student.name}}</td>
            <td>{{student.mobile}}</td>
            <td>{{student.address}}</td>
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
    name: "top50student",
    components: {
      multiSelect,
      VueCropper
    },
    data() {
      return {
        isLoading: false,
        idprogram_levels: null,
        programLevels: [],
        students: [],
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

      // await vm.getAllCountries();
      // await vm.getAllSecDepts();
      await vm.getAllProgramLevels();
      // await vm.findTopStudent();
    },
    watch: {},
    methods: {
      findTopStudent() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        // let id = vm.$route.params.id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.GET_TOP_STUDENTS, {
            params: {
              idprogram_levels: vm.idprogram_levels
            }
          })
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data.data.result;
              // console.log(response)
              vm.students = response;
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
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
      }
    }
  }
</script>

<style scoped>

</style>
