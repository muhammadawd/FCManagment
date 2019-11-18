<template>
  <card class="card-user" :title="$ml.get('term_subjects')">
    <div class="row">
      <div class="col-md-4 text-left">
        <label>{{$ml.get('name')}}</label>
        <select class="form-control" v-model="idcourses">
          <option v-for="(item , key) in all_courses" :key="key" :value="item.idcourses">{{item.name}}</option>
        </select>
        <div class="text-left text-danger" id="idsemester_error"></div>
        <div class="text-left text-danger" id="idcourses_error"></div>
        <button class="btn btn-black mt-2" @click="addOpenCourse()">{{$ml.get('add')}}</button>
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('name')}}</th>
            <th>{{$ml.get('code')}}</th>
            <th>{{$ml.get('admins')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in all_opened_courses" :key="index"
                :id="'open_course'+item.idopen_semester_course">
              <td>{{index+1}}</td>
              <td>
                <b>{{item.name}} </b>
              </td>
              <td>
                <b>
                  <span class="text-danger">{{item.code}}</span>
                </b>
              </td>
              <td>
                <router-link :to="{name:'term_subject_admin',params:{course_id:item.idcourses,open_course_sem_id:item.idopen_semester_course,term_id:$route.params.term_id}}"
                             class="btn btn-outline-primary">
                  {{$ml.get('admins')}}
                </router-link>
              </td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger" @click="deleteTermSubject(item)">
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
  export default {
    name: "termCourses",
    data() {
      return {
        all_courses: [],
        all_opened_courses: [],
        idcourses: null,
      }
    },
    mounted() {
      let vm = this;
      vm.getAllCourse();
      vm.getAllOpenedCourse();
    },
    methods: {
      prepareData() {
        let vm = this;
        return {
          idcourses: vm.idcourses,
          idsemester: vm.$route.params.term_id,

        };
      },
      prepareValidationInputs() {
        return {
          idcourses: 'input',
          idsemester: 'input',
        };
      },
      deleteTermSubject(open_course) {
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
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_OPENED_COURSE_SEMESTER + `/${open_course.idopen_semester_course}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#open_course${open_course.idopen_semester_course}`).remove()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
      },
      getAllCourse() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_COURSE)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.all_courses = response.data.result;
                return null;
              }
              vm.all_courses = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_courses = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      addOpenCourse() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let _request_data = vm.prepareData();
        let request_data = window.helper.prepareObjectToSend(_request_data);

        console.log(_request_data)
        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_OPENED_COURSE_SEMESTER, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              console.log(response)
              location.reload()
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },
      getAllOpenedCourse() {
        // ALL_OPENED_COURSE_SEMESTER
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let term_id = vm.$route.params.term_id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_OPENED_COURSE_SEMESTER + `/${term_id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.all_opened_courses = response.data.result;
                return null;
              }
              vm.all_opened_courses = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_opened_courses = [];
          });
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>
