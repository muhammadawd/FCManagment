<template>
  <div>
    <card class="card-user">
      <div class="row">
        <div class="col-md-3 text-left">
          <h3 class="font-weight-bold">{{$ml.get('program_requires')}}</h3>
        </div>
        <div class="col-md-9 text-right">
          <router-link :to="{name:'add_program_requires',params:{'program_id':programId}}"
                       v-if="$helper.hasAccessPermission('add-categories')"
                       class="btn btn-wd btn-default btn-fill btn-rotate">
            <i class="ti-plus"></i>
            {{$ml.get('add_program_requires')}}
          </router-link>
        </div>
        <div class="col-md-12 text-left">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
              <th width="50">#</th>
              <th>{{$ml.get('name')}}</th>
              <th>{{$ml.get('count_hours')}}</th>
              <th>{{$ml.get('under_requires')}}</th>
              <th width="50"></th>
              </thead>
              <tbody>
              <tr v-for="(item, index) in all_caregories" :key="index" :id="'category'+item.idprogram_categories">
                <td>{{index+1}}</td>
                <td>
                  <b>
                    <span class="text-danger">({{item.idprogram_categories}})</span>
                    {{item.name}}
                  </b>
                </td>
                <td><b>{{item.hoursRequired}}</b></td>
                <td>
                  <b>
                    <span class="text-danger" v-if="item.parentIdprogram_categories">({{item.parentName}}-{{item.parentIdprogram_categories}})</span>
                  </b>
                </td>
                <td>
                  <div class="btn-group direction-inverse">
                    <button class="btn btn-danger" @click="deleteRequire(item)"
                            v-if="$helper.hasAccessPermission('delete-categories-by-id')">
                      <i class="ti-trash"></i>
                    </button>
                    <router-link
                      v-if="$helper.hasAccessPermission('get-categories-by-programid')"
                      :to="{name:'edit_program_requires',params:{'program_id':programId,'id':item.idprogram_categories}}"
                      class="btn btn-info">
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
  </div>
</template>

<script>
  import {StatsCard, ChartCard} from "@/components/index";

  export default {
    name: "programRequires",
    components: {
      StatsCard,
    },
    props: ['programId'],
    mounted() {
      let vm = this;
      vm.findProgramRequire();
    },
    data() {
      return {
        all_caregories: []
      }
    },
    methods: {
      deleteRequire(required) {
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
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_PROGRAM_REQUIRE + `/${required.idprogram_categories}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#category${required.idprogram_categories}`).remove()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
      },
      findProgramRequire() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_PROGRAM_REQUIRE + `?idprogram=${vm.programId}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              vm.all_caregories = response.data.data.result;
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            vm.all_caregories = [];
            // window.helper.showMessage('danger', vm);
            // vm.$router.push({name: 'programs'});
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          vm.all_caregories = [];
          // window.helper.showMessage('danger', vm);
          // vm.$router.push({name: 'programs'});
          console.log(e)
        }
      }
    }
  }
</script>

<
style
scoped >

< /style>
