<template>

  <card class="card" :title="$ml.get('edit_program')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3">

            <fg-input type="text"
                      v-model="name"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
            <div class="text-left text-danger" id="name_error"></div>
          </div>
          <div class="col-md-3">

            <fg-input type="text"
                      v-model="name_en"
                      :label="$ml.get('name_en')"
                      :placeholder="$ml.get('name_en')">
            </fg-input>
            <div class="text-left text-danger" id="name_en_error"></div>
          </div>
          <div class="col-md-3">

            <fg-input type="text"
                      v-model="student_prefix"
                      :label="$ml.get('student_prefix')"
                      :placeholder="$ml.get('student_prefix')">
            </fg-input>
            <div class="text-left text-danger" id="student_prefix_error"></div>
          </div>
          <div class="col-md-12"></div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="numOfHourForGrad"
                      :label="$ml.get('hours_need_grade')"
                      :placeholder="$ml.get('hours_need_grade')">
            </fg-input>
            <div class="text-left text-danger" id="numOfHourForGrad_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="minSemestersForGrad"
                      :label="$ml.get('min_number_grade')"
                      :placeholder="$ml.get('min_number_grade')">
            </fg-input>
            <div class="text-left text-danger" id="minSemestersForGrad_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="maxPercentageAssignedForFailedCourses"
                      :label="$ml.get('max_fail_percent')"
                      :placeholder="$ml.get('max_fail_percent')">
            </fg-input>
            <div class="text-left text-danger" id="maxPercentageAssignedForFailedCourses_error"></div>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="updateProgram">
            {{$ml.get('edit')}}
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
  export default {
    name: "EditProgram",
    data() {
      return {
        name: null,
        name_en: null,
        student_prefix: null,
        maxPercentageAssignedForFailedCourses: null,
        minSemestersForGrad: null,
        numOfHourForGrad: null
      }
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
              vm.name_en = response[0].name_en;
               vm.student_prefix = response[0].student_prefix;
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
      prepareData() {
        let vm = this;
        return {
          name: vm.name,
          name_en: vm.name_en,
          student_prefix: vm.student_prefix,
          maxPercentageAssignedForFailedCourses: vm.maxPercentageAssignedForFailedCourses,
          minSemestersForGrad: vm.minSemestersForGrad,
          numOfHourForGrad: vm.numOfHourForGrad,
        };
      },
      prepareValidationInputs() {
        return {
          maxPercentageAssignedForFailedCourses: 'input',
          name: 'input',
          name_en: 'input',
          student_prefix: 'input',
          minSemestersForGrad: 'input',
          numOfHourForGrad: 'input',
        };
      },
      updateProgram() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let id = vm.$route.params.id;
        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().put(window.serviceAPI.UPDATE_PROGRAMS+ `/${id}`, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.showMessage('success', vm);
              vm.$router.push({name: 'programs'});
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          console.log(e)
        }
      }
    }
  }
</script>

<style scoped>

</style>
