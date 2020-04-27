<template>
  <div>
    <card class="card" :title="$ml.get('show_program')">
      <div>
        <form @submit.prevent>
          <div class="row">
            <div class="col-md-4">
              <fg-input type="text"
                        :label="$ml.get('name')"
                        v-model="name"
                        :placeholder="$ml.get('name')">
              </fg-input>
            </div>
            <div class="col-md-4">
              <fg-input type="text"
                        :label="$ml.get('hours_need_grade')"
                        v-model="maxPercentageAssignedForFailedCourses"
                        :placeholder="$ml.get('hours_need_grade')">
              </fg-input>
            </div>
            <div class="col-md-12"></div>
            <div class="col-md-4">
              <fg-input type="text"
                        :label="$ml.get('min_number_grade')"
                        v-model="minSemestersForGrad"
                        :placeholder="$ml.get('min_number_grade')">
              </fg-input>
            </div>
            <div class="col-md-4">
              <fg-input type="text"
                        :label="$ml.get('max_fail_percent')"
                        v-model="maxPercentageAssignedForFailedCourses"
                        :placeholder="$ml.get('max_fail_percent')">
              </fg-input>
            </div>
          </div>
          <div class="clearfix"></div>
        </form>
      </div>
    </card>
    <card class="card" v-if="$helper.hasAccessPermission('get-grades-by-programid')">
      <ProgramsGrades :programId="pId"/>
    </card>
    <card class="card" v-if="$helper.hasAccessPermission('get-courseprerequiste')">
      <ProgramRequires :programId="pId"/>
    </card>
    <card class="card" v-if="$helper.hasAccessPermission('get-programLevelsByProgramID')">
      <ProgramsLevels :programId="pId"/>
    </card>
  </div>
</template>

<script>
  import ProgramsGrades from '@/pages/views/Programs/ProgramGrades/ProgramsGrades'
  import ProgramsLevels from '@/pages/views/Programs/ProgramLevels/ProgramsLevels'
  import ProgramRequires from '@/pages/views/Programs/ProgramRequires/ProgramRequires'

  export default {
    name: "showProgram",
    components: {
      ProgramsGrades,
      ProgramsLevels,
      ProgramRequires,
    },
    data() {
      return {
        pId: null,
        name: null,
        maxPercentageAssignedForFailedCourses: null,
        minSemestersForGrad: null,
        numOfHourForGrad: null
      }
    },
    created() {
      let vm = this;
      vm.pId = vm.$route.params.id;
    },
    mounted() {
      let vm = this;
      vm.findProgram();
    },
    methods: {
      findProgram() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let id = vm.$route.params.id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.FIND_PROGRAMS + `/${id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data.data.result;
              vm.name = response[0].name;
              vm.maxPercentageAssignedForFailedCourses = response[0].maxPercentageAssignedForFailedCourses;
              vm.minSemestersForGrad = response[0].minSemestersForGrad;
              vm.numOfHourForGrad = response[0].numOfHourForGrad;
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.showMessage('danger', vm);
            vm.$router.push({name: 'programs'});
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          window.helper.showMessage('danger', vm);
          vm.$router.push({name: 'programs'});
          console.log(e)
        }
      },
    }
  }
</script>

<style scoped>

</style>
