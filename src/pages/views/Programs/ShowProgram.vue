<template>
  <div>
    <card class="card" :title="$ml.get('show_program')">
      <div>
        <form @submit.prevent>
          <div class="row">
            <div class="col-md-3">

              <fg-input type="text"
                        :label="$ml.get('name')"
                        value="Bio"
                        :placeholder="$ml.get('name')">
              </fg-input>
            </div>
            <div class="col-md-3">
              <fg-input type="text"
                        :label="$ml.get('hours_need_grade')"
                        value="150"
                        :placeholder="$ml.get('hours_need_grade')">
              </fg-input>
            </div>
            <div class="col-md-12"></div>
            <div class="col-md-3">
              <fg-input type="text"
                        :label="$ml.get('min_number_grade')"
                        value="10"
                        :placeholder="$ml.get('min_number_grade')">
              </fg-input>
            </div>
            <div class="col-md-3">
              <fg-input type="text"
                        :label="$ml.get('max_fail_percent')"
                        value="35"
                        :placeholder="$ml.get('max_fail_percent')">
              </fg-input>
            </div>
          </div>


          <!--        <div class="text-center">-->
          <!--          <p-button type="info"-->
          <!--                    round-->
          <!--                    @click.native.prevent="updateLecturer">-->
          <!--            {{$ml.get('edit')}}-->
          <!--          </p-button>-->
          <!--        </div>-->
          <div class="clearfix"></div>
        </form>
      </div>
    </card>
    <card class="card">
      <ProgramsGrades :programId="pId"/>
    </card>
    <card class="card">
      <ProgramRequires :programId="pId"/>
    </card>
    <card class="card">
      <ProgramsLevels :programId="pId"/>
    </card>
  </div>
</template>

<script>
  import ProgramsGrades from '@/pages/views/Programs/ProgramGrades/ProgramsGrades'
  import ProgramsLevels from '@/pages/views/Programs/ProgramLevels/ProgramsLevels'
  import ProgramRequires from '@/pages/views/Programs/ProgramRequires/ProgramRequires'

  export default {
    name: "EditLecturer",
    components: {
      ProgramsGrades,
      ProgramsLevels,
      ProgramRequires,
    },
    data() {
      return {
        pId: null
      }
    },
    mounted() {
      let vm = this;
      vm.pId = vm.$route.params.id;
    },
    methods: {
      updateLecturer() {
        alert('test')
      }
    }
  }
</script>

<style scoped>

</style>
