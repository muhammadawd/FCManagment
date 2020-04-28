<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-9 text-left">
        <router-link :to="{name:'add_user'}" class="btn btn-wd btn-default btn-fill btn-rotate"
                     v-if="$helper.hasAccessPermission('add_users')">
          <i class="ti-plus"></i>
          {{$ml.get('add_user')}}
        </router-link>
      </div>
      <div class="col-md-3 text-right">
        <input type="text" class="form-control" @keyup.enter="getAllUsers" v-model="search_query"
               :placeholder="$ml.get('search')">
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('name')}}</th>
            <th>{{$ml.get('email')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in users" :key="index" :id="'stuff_members'+item.idusers">
              <td><b>{{index+1}}</b></td>
              <td><b>{{item.firstName}} {{item.lastName}}</b></td>
              <td><b>{{item.email}}</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger" @click="deleteUser(item)"
                          v-if="$helper.hasAccessPermission('del_users')">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_user',params:{'id':item.idusers}}" class="btn btn-info"
                               v-if="$helper.hasAccessPermission('ALLOW_ALL')">
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
        users: [],
        search_query: ''
      }
    },
    methods: {
      deleteUser(item) {
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
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_USERS + `/${item.idusers}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#stuff_members${item.idusers}`).remove()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
      },
      getAllUsers() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_USERS + `?search_query=${vm.search_query}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.users = response.data.result;
                return null;
              }
              vm.users = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.users= [];
          });
        } catch (e) {
          console.log(e)
        }
      }
    },
    mounted() {
      let vm = this;
      vm.getAllUsers();
    }
  }
</script>

<
style
scoped >

< /style>
