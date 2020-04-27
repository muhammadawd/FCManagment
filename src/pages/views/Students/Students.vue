<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-6 text-left">
        <router-link :to="{name:'add_student'}" class="btn btn-wd btn-default btn-fill btn-rotate"
                     v-if="$helper.hasAccessPermission('add-students')">
          <i class="ti-plus"></i>
          {{$ml.get('add_student')}}
        </router-link>
        &nbsp;
        <button class="btn btn-danger" @click="refreshStudentLevels()">
          {{$ml.get('refresh_data')}}
        </button>
      </div>
      <div class="col-md-6 text-right">
        <div class="row">
          <div class="col-md-6">
            <input type="text" class="form-control" @keyup.enter="getAllStudents" v-model="search_query"
                   :placeholder="$ml.get('search')">
          </div>
          <div class="col-md-6">
            <select class="form-control" v-model="program_level_id">
              <option v-for="(item , key) in programLevels" :value="item.idprogram_levels">{{item.name}}</option>
            </select>
          </div>
        </div>
        <button @click="getAllStudentsFilter()" class="btn btn-primary mt-2 btn-block">{{$ml.get('filter')}}</button>
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th width="160">{{$ml.get('ssn')}}</th>
            <th>{{$ml.get('name')}}</th>
            <th>{{$ml.get('country')}}</th>
            <th>{{$ml.get('government')}}</th>
            <th>{{$ml.get('sec_section')}}</th>
            <th>{{$ml.get('program_levels')}}</th>
            <th>{{$ml.get('full_address')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in all_students" :key="index" :id="'student'+item.idstudents">
              <td>{{index +1 }}</td>
              <td><b>{{item.nationalNum}}</b></td>
              <td>
                <b>{{item.name}}</b>
              </td>
              <td><b>{{item.country_name}}</b></td>
              <td><b>{{item.governate_name}}</b></td>
              <td><b>{{item.secondry_depts_name}}</b></td>
              <td><b>{{item.program_level_name}}</b></td>
              <td>
                <b>{{item.address}}</b>
              </td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger" @click="deleteStudent(item)"
                          v-if="$helper.hasAccessPermission('delete-students-by-id')">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_student',params:{'id':item.idstudents}}" class="btn btn-info"
                               v-if="$helper.hasAccessPermission('update-students-by-id')">
                    <i class="ti-save"></i>
                  </router-link>
                  <!--<router-link :to="{name:'profile_student',params:{'id':item.idstudents}}" class="btn btn-warning">-->
                  <!--<i class="ti-user"></i>-->
                  <!--</router-link>-->
                  <!--<router-link :to="{name:'top_50_student',params:{'id':item.idstudents}}" class="btn btn-">-->
                  <!--<i class="ti-user"></i>-->
                  <!--</router-link>-->
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-12 mt-3">
        <nav aria-label="Page navigation">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" :disabled="page_num == 0" @click.prevent="goPrev()" href="#">Previous</a>
            </li>

            <li class="page-item"><a class="page-link" @click.prevent="goNext()" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </card>
</template>

<script>
  export default {
    name: "Students",
    data() {
      return {
        all_students: [],
        programLevels: [],
        search_query: '',
        program_level_id: '',
        page_num: 0,
      }
    },
    methods: {
      deleteStudent(student) {
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
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_SEC_DEPTS + `/${student.idstudents}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#student${student.idstudents}`).remove()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
      },
      getAllSProgramLevels() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let current_program_id = JSON.parse(localStorage.getItem('current_program_id'));
        console.log(current_program_id);
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_PROGRAM_LEVELS + `?idprogram=${current_program_id}`)
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
      },
      refreshStudentLevels() {

        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().post(window.serviceAPI.REFERSH_STUDENT_LEVELS)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              location.reload()

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      },
      getAllStudentsFilter() {
        this.getAllStudents();
      },
      goPrev() {

        if (this.page_num != 0) {
          this.page_num -= 1;
          this.getAllStudents()
        }
      },
      goNext() {
        this.page_num += 1;
        this.getAllStudents()
      },
      getAllStudents() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_STUDENTS, {
            params: {
              id_program_query: vm.program_level_id,
              search_query: vm.search_query,
              page_num: vm.page_num,
              page_limit: 10,
              ispaginated: 1,
            }
          })
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.all_students = response.data.result;
                return null;
              }
              vm.all_students = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_students = [];
          });
        } catch (e) {
          console.log(e)
        }
      }
    },
    mounted() {
      let vm = this;
      vm.getAllSProgramLevels();
      vm.getAllStudents();
    }
  }
</script>

<
style
scoped >

< /style>
