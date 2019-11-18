<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-9 text-left">
        <router-link :to="{name:'add_course'}" class="btn btn-wd btn-default btn-fill btn-rotate">
          <i class="ti-plus"></i>
          {{$ml.get('add_course')}}
        </router-link>
      </div>
      <div class="col-md-3 text-right">
        <input type="text" class="form-control" @keyup.enter="getAllCourse" v-model="search_query"
               :placeholder="$ml.get('search')">
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('name')}}</th>
            <th>{{$ml.get('requires')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in all_courses" :key="index" :id="'course'+item.idcourses">
              <td>{{index+1}}</td>
              <td>
                <b>{{item.name}}</b>
              </td>
              <td>
                <router-link :to="{name:'course_requirement',params:{'course_id':item.idcourses}}"
                             class="btn btn-outline-primary">
                  <b>{{$ml.get('requires')}}</b>
                </router-link>
              </td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger" @click="deleteCourse(item)">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_course',params:{'id':item.idcourses}}" class="btn btn-info">
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
    name: "Courses",
    data() {
      return {
        all_courses: [],
        search_query: ''
      }
    },
    methods: {
      deleteCourse(course) {
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
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_COURSE + `/${course.idcourses}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#course${course.idcourses}`).remove()
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
          window.serviceAPI.API().get(window.serviceAPI.ALL_COURSE + `?search_query=${vm.search_query}`)
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
      }
    },
    mounted() {
      let vm = this;
      vm.getAllCourse();
    }
  }
</script>
