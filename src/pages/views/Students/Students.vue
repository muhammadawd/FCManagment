<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-9 text-left">
        <router-link :to="{name:'add_student'}" class="btn btn-wd btn-default btn-fill btn-rotate">
          <i class="ti-plus"></i>
          {{$ml.get('add_student')}}
        </router-link>
      </div>
      <div class="col-md-3 text-right">
        <input type="text" class="form-control" @keyup.enter="getAllStudents" v-model="search_query"
               :placeholder="$ml.get('search')">
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
              <td><b>-</b></td>
              <td><b>-</b></td>
              <td><b>-</b></td>
              <td>
                <b>{{item.address}}</b>
              </td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger" @click="deleteStudent(item)">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_student',params:{'id':item.idstudents}}" class="btn btn-info">
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
  </card>
</template>

<script>
  export default {
    name: "Students",
    data() {
      return {
        all_students: [],
        search_query: ''
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
      getAllStudents() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_STUDENTS + `?search_query=${vm.search_query}`)
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
      vm.getAllStudents();
    }
  }
</script>

<
style
scoped >

< /style>
