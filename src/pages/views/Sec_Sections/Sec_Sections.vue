<template>
  <card class="card-user">
    <div class="row">
      <div class="col-md-9 text-left">
        <router-link :to="{name:'add_sec_section'}" class="btn btn-wd btn-default btn-fill btn-rotate"
                     v-if="$helper.hasAccessPermission('add-secondaryDepts')">
          <i class="ti-plus"></i>
          {{$ml.get('add_sec_section')}}
        </router-link>
      </div>
      <!--      <div class="col-md-3 text-right">-->
      <!--        <fg-input type="text"-->
      <!--                  :placeholder="$ml.get('search')">-->
      <!--        </fg-input>-->
      <!--      </div>-->
      <div class="col-md-12 text-left">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
            <th width="50">#</th>
            <th>{{$ml.get('name')}}</th>
            <th>{{$ml.get('name_en')}}</th>
            <th>{{$ml.get('note')}}</th>
            <th width="50"></th>
            </thead>
            <tbody>
            <tr v-for="(item, index) in all_sections" :key="index" :id="'sec_dept'+item.idsecondary_depts">
              <td>{{index+1}}</td>
              <td>
                <b>{{item.name}}</b>
              </td>
              <td>
                <b>{{item.name_en}}</b>
              </td>
              <td>
                <b>{{item.note}}</b>
              </td>
              <td>
                <div class="btn-group direction-inverse">
                  <button class="btn btn-danger" @click="deleteSecDept(item)"
                          v-if="$helper.hasAccessPermission('delete-secondaryDepts-by-id')">
                    <i class="ti-trash"></i>
                  </button>
                  <router-link :to="{name:'edit_sec_section',params:{'id':item.idsecondary_depts}}" class="btn btn-info"
                               v-if="$helper.hasAccessPermission('update-secondaryDepts-by-id')">
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
    name: "SecondaryDepartments",
    data() {
      return {
        all_sections: []
      }
    },
    methods: {
      deleteSecDept(dept) {
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
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_SEC_DEPTS + `/${dept.idsecondary_depts}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#sec_dept${dept.idsecondary_depts}`).remove()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
      },
      getAllSecDepts() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_SEC_DEPTS)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                vm.all_sections = response.data.result;
                return null;
              }
              vm.all_sections = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_sections = [];
          });
        } catch (e) {
          console.log(e)
        }
      }
    },
    mounted() {
      let vm = this;
      vm.getAllSecDepts();
    }
  }
</script>

<
style
scoped >

< /style>
