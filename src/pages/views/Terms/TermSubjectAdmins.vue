<template>
  <card class="card-user" :title="$ml.get('admins')">
    <div class="row">
      <div class="col-md-4 text-left">
        <label>{{$ml.get('name')}}</label>
        <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedLecturer" label="name"
                      track-by="name"
                      :options="all_lectures"></multi-select>
        <div class="text-danger text-left" id="idprogram_categories_error"></div>
        <label class="mt-2">{{$ml.get('is_admin')}}</label>
        <select class="form-control" v-model="isAdmin">
          <option value="1">{{$ml.get('yes')}}</option>
          <option value="0">{{$ml.get('no')}}</option>
        </select>
        <button class="btn btn-black mt-2">{{$ml.get('add')}}</button>
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('name')}}</th>
            <th>{{$ml.get('is_admin')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in all_stuff" :key="index" :id="'stuff'+item">
              <td>1</td>
              <td>
                <b>Mohamed Awd</b>
              </td>
              <td>
                <b><span class="text-danger">{{$ml.get('no')}}</span></b>
              </td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger">
                    <i class="ti-trash"></i>
                  </button>
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
    name: "termLecturer",
    components: {
      multiSelect
    },
    data() {
      return {
        all_stuff: [],
        isAdmin: 0,
        selectedLecturer: null,
        all_lectures: []
      }
    },
    mounted() {
      let vm = this;
      vm.getAllStuffMembers();
      vm.getAllStuffSemester();
    },
    methods: {
      getAllStuffMembers() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_STUFF_MEMBERS)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.all_lectures = response.data.result;
                return null;
              }
              vm.all_lectures = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_lectures = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      getAllStuffSemester() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let term_id = vm.$route.params.term_id;
        let course_id = vm.$route.params.course_id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_STUFF_COURSE_SEMESTER + `?idsemester=${term_id}&course_id=${course_id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.all_stuff = response.data.result;
                return null;
              }
              vm.all_stuff = [];
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_stuff = [];
          });
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>
