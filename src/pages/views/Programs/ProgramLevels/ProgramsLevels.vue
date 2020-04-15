<template>
  <div>
    <card class="card-user">
      <div class="row">
        <div class="col-md-3 text-left">
          <h3 class="font-weight-bold">{{$ml.get('program_levels')}}</h3>
        </div>
        <div class="col-md-9 text-right">
          <router-link :to="{name:'add_program_levels',params: {'program_id':programId}}"
                       class="btn btn-wd btn-default btn-fill btn-rotate">
            <i class="ti-plus"></i>
            {{$ml.get('add_program_levels')}}
          </router-link>
        </div>
        <div class="col-md-12 text-left">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
              <th width="50">#</th>
              <th>{{$ml.get('name')}}</th>
              <th>{{$ml.get('name_en')}}</th>
              <th>{{$ml.get('min_hour_level')}}</th>
              <th width="50"></th>
              </thead>
              <tbody>
              <tr v-for="(item, index) in all_levels" :key="index" :id="'level'+item.idprogram_levels">
                <td>{{index +1}}</td>
                <td><b>{{item.name}}</b></td>
                <td><b>{{item.name_en}}</b></td>
                <td><b>{{item.requiredHourToBeInThisLevel}}</b></td>
                <td>
                  <div class="btn-group direction-inverse">
                    <button class="btn btn-danger" @click="deleteLevel(item)">
                      <i class="ti-trash"></i>
                    </button>
                    <router-link
                      :to="{name:'edit_program_levels',params:{'program_id':programId,'id':item.idprogram_levels}}"
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
    name: "programLevels",
    components: {
      StatsCard,
    },
    props: ['programId'],
    mounted() {
      let vm = this;
      vm.findProgramLevel();
    },
    data() {
      return {
        all_levels: []
      }
    },
    methods: {
      deleteLevel(level) {
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
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_PROGRAM_LEVELS + `/${level.idprogram_levels}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#level${level.idprogram_levels}`).remove()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
      },
      findProgramLevel() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_PROGRAM_LEVELS + `?idprogram=${vm.programId}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              vm.all_levels = response.data.data.result;
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            vm.all_levels = [];
            // window.helper.showMessage('danger', vm);
            // vm.$router.push({name: 'programs'});
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          vm.all_levels = [];
          // window.helper.showMessage('danger', vm);
          // vm.$router.push({name: 'programs'});
          console.log(e)
        }
      }
    }
  }
</script>
