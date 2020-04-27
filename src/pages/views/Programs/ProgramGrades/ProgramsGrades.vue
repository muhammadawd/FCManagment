<template>
  <div>
    <card class="card-user">
      <div class="row">
        <div class="col-md-3 text-left">
          <h3 class="font-weight-bold">{{$ml.get('program_grade')}}</h3>
        </div>
        <div class="col-md-9 text-right">
          <router-link :to="{name:'add_program_grades',params:{'program_id':programId}}"
                       v-if="$helper.hasAccessPermission('add-grades')"
                       class="btn btn-wd btn-default btn-fill btn-rotate">
            <i class="ti-plus"></i>
            {{$ml.get('add_program_grades')}}
          </router-link>
        </div>
        <div class="col-md-12 text-left">
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
              <th width="50">#</th>
              <th>{{$ml.get('name')}}</th>
              <th>{{$ml.get('from_grade')}}</th>
              <th>{{$ml.get('to_grade')}}</th>
              <th>{{$ml.get('points')}}</th>
              <th width="50"></th>
              </thead>
              <tbody>
              <tr v-for="(item, index) in all_grades" :key="index" :id="'program_grade'+item.idgrade">
                <td>{{index+1}}</td>
                <td><b>{{item.gradeString}}</b></td>
                <td><b>{{item.fromPercentage}}</b></td>
                <td><b>{{item.toPercentage}}</b></td>
                <td><b>{{item.gradePoints}}</b></td>
                <td>
                  <div class="btn-group direction-inverse">
                    <button class="btn btn-danger" @click="deleteGrade(item)"
                            v-if="$helper.hasAccessPermission('delete-grades-by-id')">
                      <i class="ti-trash"></i>
                    </button>
                    <router-link :to="{name:'edit_program_grades',params:{'program_id':programId,'id':item.idgrade}}"
                                 v-if="$helper.hasAccessPermission('update-grades-by-id')"
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
    name: "programGrades",
    components: {
      StatsCard,
    },
    props: ['programId'],
    mounted() {
      let vm = this;
      vm.findProgramGrades();
    },
    data() {
      return {
        all_grades: []
      }
    },
    methods: {
      deleteGrade(grade) {
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
            window.serviceAPI.API().delete(window.serviceAPI.DELETE_PROGRAM_GRADE + `/${grade.idgrade}`)
              .then((response) => {
                vm.$root.$children[0].$refs.loader.show_loader = false;
                $(`#program_grade${grade.idgrade}`).remove()
              }).catch((error) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.handleError(error, vm);
            });

          }
        });
      },
      findProgramGrades() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        try {
          window.serviceAPI.API().get(window.serviceAPI.FIND_PROGRAM_GRADES + `?idprogram=${vm.programId}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              vm.all_grades = response.data.data.result;
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            vm.all_grades = [];
            // window.helper.showMessage('danger', vm);
            // vm.$router.push({name: 'programs'});
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          vm.all_grades = [];
          // window.helper.showMessage('danger', vm);
          // vm.$router.push({name: 'programs'});
          console.log(e)
        }
      }
    }
  }
</script>
