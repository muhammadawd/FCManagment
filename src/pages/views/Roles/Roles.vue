<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-9 text-left">
        <router-link :to="{name:'add_role'}" class="btn btn-wd btn-default btn-fill btn-rotate"
                     v-if="$helper.hasAccessPermission('add_roles')">
          <i class="ti-plus"></i>
          {{$ml.get('add_role')}}
        </router-link>
      </div>
      <div class="col-md-3 text-right">
        <input type="text" class="form-control" @keyup.enter="getAllRoles" v-model="search_query"
               :placeholder="$ml.get('search')">
      </div>
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('name')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in roles" :key="index" :id="'stuff_members'+item.id">
              <td><b>{{index+1}}</b></td>
              <td><b>{{item.name}}</b></td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger" @click="deleteRole(item)"
                          v-if="$helper.hasAccessPermission('del_roles')">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_role',params:{'id':item.id}}" class="btn btn-info"
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
    name: "Roles",
    data() {
      return {
        roles: [],
        search_query: ''
      }
    },
    methods: {
      deleteRole(item) {
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
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_ROLES + `/${item.id}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#stuff_members${item.id}`).remove()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
      },
      getAllRoles() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_ROLES + `?search_query=${vm.search_query}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.roles = response.data.result;
                return null;
              }
              vm.roles = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.roles = [];
          });
        } catch (e) {
          console.log(e)
        }
      }
    },
    mounted() {
      let vm = this;
      vm.getAllRoles();
    }
  }
</script>

<style>
  .card-header-tabs {
    direction: rtl;
    font-size: 14px;
  }
</style>
