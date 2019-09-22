<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-9 text-left">
        <router-link :to="{name:'add_lecturer'}" class="btn btn-wd btn-default btn-fill btn-rotate">
          <i class="ti-plus"></i>
          {{$ml.get('add_lecturer')}}
        </router-link>
      </div>
      <div class="col-md-3 text-right">
        <fg-input type="text"
                  :placeholder="$ml.get('search')">
        </fg-input>
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th width="160">{{$ml.get('id')}}</th>
            <th>{{$ml.get('name')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(lecture, index) in all_lectures" :key="index">
              <td><b>{{index+1}}</b></td>
              <td><b>{{lecture.nationalNum}}</b></td>
              <td><b>{{lecture.name}}</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_lecturer',params:{'id':lecture.idstuff_members}}" class="btn btn-info">
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
    name: "Lecturer",
    data() {
      return {
        all_lectures: []
      }
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
              // console.log(response)
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
      }
    },
    mounted() {
      let vm = this;
      vm.getAllStuffMembers();
    }
  }
</script>

<
style
scoped >

< /style>
