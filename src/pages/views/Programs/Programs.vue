<template>
  <div>

    <div class="row">
      <div class="col-xl-8 offset-xl-2">
        <div class="row">
          <div class="col-md-6 col-xl-4" v-for="stats in statsCards" :key="stats.title">
            <router-link :to="{name:stats.route}">
              <stats-card>
                <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
                  <i :class="stats.icon"></i>
                </div>
                <div class="numbers" slot="content">
                  <p>{{stats.title}}</p>
                  {{stats.value}}
                </div>
                <div class="stats text-center" slot="footer">
                  <i :class="stats.footerIcon"></i> {{stats.footerText}}
                </div>
              </stats-card>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <card class="card-user">
      <div class="row">
        <div class="col-md-9 text-left">
          <router-link :to="{name:'add_program'}" class="btn btn-wd btn-default btn-fill btn-rotate">
            <i class="ti-plus"></i>
            {{$ml.get('add_program')}}
          </router-link>
        </div>
        <div class="col-md-3 text-right">
          <input type="text" class="form-control" @keyup.enter="getAllPrograms" v-model="search_query"
                 :placeholder="$ml.get('search')">
        </div>
        <div class="col-md-12 text-left">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
              <th width="50">#</th>
              <th>{{$ml.get('name')}}</th>
              <th>{{$ml.get('hours_need_grade')}}</th>
              <th>{{$ml.get('min_number_grade')}}</th>
              <th>{{$ml.get('max_fail_percent')}}</th>
              <th width="50"></th>
              </thead>
              <tbody>
              <tr v-for="(item, index) in all_programs" :key="index" :id="'program'+item.idprogram">
                <td>1</td>
                <td><b>{{item.name}}</b></td>
                <td><b>{{item.numOfHourForGrad}}</b></td>
                <td><b>{{item.minSemestersForGrad}}</b></td>
                <td><b>{{item.maxPercentageAssignedForFailedCourses}}</b></td>
                <td>
                  <div class="btn-group direction-inverse">
                    <button class="btn btn-danger" @click="deleteProgram(item)">
                      <i class="ti-trash"></i>
                    </button>
                    <router-link :to="{name:'show_program',params:{'id':item.idprogram}}" class="btn btn-warning">
                      <i class="ti-eye"></i>
                    </router-link>
                    <router-link :to="{name:'edit_program',params:{'id':item.idprogram}}" class="btn btn-info">
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
    name: "Programs",
    components: {
      StatsCard,
    },
    data() {
      return {
        all_programs: [],
        statsCards: [],
        search_query: '',
        // statsCards: [
        //   {
        //     route: "program_grades",
        //     type: "warning",
        //     icon: "ti-pulse",
        //     title: this.$ml.get('program_grades'),
        //     value: "0",
        //     footerText: this.$ml.get('show'),
        //     footerIcon: "ti-eye"
        //   },
        //   {
        //     route: "program_requires",
        //     type: "danger",
        //     icon: "ti-pulse",
        //     title: this.$ml.get('program_requires'),
        //     value: "0",
        //     footerText: this.$ml.get('show'),
        //     footerIcon: "ti-eye"
        //   },
        //   {
        //     route: "program_levels",
        //     type: "info",
        //     icon: "ti-pulse",
        //     title: this.$ml.get('program_levels'),
        //     value: "0",
        //     footerText: this.$ml.get('show'),
        //     footerIcon: "ti-eye"
        //   }
        // ],
      }
    },
    methods: {
      deleteProgram(program) {
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
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_PROGRAMS + `/${program.idprogram}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#program${program.idprogram}`).remove()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
      },
      getAllPrograms() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.ALL_PROGRAMS + `?search_query=${vm.search_query}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data;
              if (response.status) {
                console.log(response.data)
                vm.all_programs = response.data;
                return null;
              }
              vm.all_programs = [];

            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
            vm.all_programs = [];
          });
        } catch (e) {
          console.log(e)
        }
      }
    },
    mounted() {
      let vm = this;
      vm.getAllPrograms();
    }
  }
</script>
