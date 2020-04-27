<template>
  <card class="card-user direction"
        :title="$ml.get('course_requirement') +  ($route.query.name ? '('+$route.query.name+')' : '')">
    <div class="row">
      <div class="col-md-4 text-left">
        <label>{{$ml.get('name')}}
        </label>
        <multi-select :placeholder="$ml.get('type_to_search')" v-model="selectedUnder" label="name"
                      track-by="name"
                      :options="all_courses" open-direction="bottom" :multiple="false" :searchable="true"
                      :loading="isLoading" :internal-search="true" :clear-on-select="false"
                      :close-on-select="true"></multi-select>
        <div class="text-danger text-left" id="idprerequisite_courses_error"></div>
        <div class="text-danger text-left" id="idcourses_error"></div>
        <br>
        <button class="btn btn-black mt-2" v-if="$helper.hasAccessPermission('add-courseprerequiste')"
                @click="addCourseRequirement()">
          {{$ml.get('add')}}
        </button>
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('name')}}</th>
            <th>{{$ml.get('name_en')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in all_courses_require" :key="index"
                :id="'course_required'+item.idprerequisite_courses">
              <td>{{index + 1}}</td>
              <td>
                <b>{{item.name}}</b>
              </td>
              <td>
                <b>{{item.name_en}}</b>
              </td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger" @click="deleteCourseRequire(item)"
                          v-if="$helper.hasAccessPermission('delete-courseprerequiste-by-id')">
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
    name: "FIND_COURSE_REQUIRE",
    components: {
      multiSelect
    },
    data() {
      return {
        isLoading: true,
        all_courses: [],
        all_courses_require: [],
        selectedUnder: null,
      }
    },
    created() {
      let vm = this;
      vm.findCourseRequirement();
      vm.getAllCourse();
    },
    methods: {
      prepareData() {
        let vm = this;
        return {
          idcourses: vm.$route.params.course_id,
          idprerequisite_courses: vm.selectedUnder ? vm.selectedUnder.idcourses : null,
        };
      },
      prepareValidationInputs() {
        return {
          idprerequisite_courses: 'input',
          idcourses: 'input'
        }
      },
      getAllCourse() {
        let vm = this;
        vm.isLoading = true;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_COURSE)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              vm.isLoading = false;
              if (response.status) {
                vm.all_courses = response.data.result;
                return null;
              }
              vm.all_courses = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.isLoading = false;
            vm.all_courses = [];
          });
        } catch (e) {
          console.log(e)
        }
      },
      deleteCourseRequire(courseRequire) {
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
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_COURSE_REQUIRE + `/${courseRequire.idprerequisite_courses}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#course_required${courseRequire.idprerequisite_courses}`).remove()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
      },
      findCourseRequirement() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let course_id = vm.$route.params.course_id;
        // let program_id = vm.$route.params.program_id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.FIND_COURSE_REQUIRE + `/${course_id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              vm.all_courses_require = response.data.data.result;
              // vm.name = response[0].name;
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.showMessage('danger', vm);
            vm.$router.push({name: 'courses'});
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          window.helper.showMessage('danger', vm);
          vm.$router.push({name: 'courses'});
          console.log(e)
        }

      },
      addCourseRequirement() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let course_id = vm.$route.params.course_id;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_COURSE_REQUIRE, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.showMessage('success', vm);
              vm.$router.push({name: 'courses'});
              // vm.$router.push({name: 'course_requirement',params:{course_id:course_id}});
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }

      },
    }
  }
</script>
<!--FIND_COURSE_REQUIRE-->
