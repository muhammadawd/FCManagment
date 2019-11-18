<template>

  <card class="card" :title="$ml.get('add_program')">
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
                    @click.native.prevent="addProgram">
            {{$ml.get('add')}}
          </p-button>
        </div>
        <div class="clearfix"></div>
      </form>
    </div>
  </card>
</template>

<script>
  export default {
    name: "AddProgram",
    data() {
      return {
        name: null,
        maxPercentageAssignedForFailedCourses: null,
        minSemestersForGrad: null,
        numOfHourForGrad: null
      }
    },
    methods: {
      prepareData() {
        let vm = this;
        return {
          name: vm.name,
          maxPercentageAssignedForFailedCourses: vm.maxPercentageAssignedForFailedCourses,
          minSemestersForGrad: vm.minSemestersForGrad,
          numOfHourForGrad: vm.numOfHourForGrad,
        };
      },
      prepareValidationInputs() {
        return {
          maxPercentageAssignedForFailedCourses: 'input',
          name: 'input',
          minSemestersForGrad: 'input',
          numOfHourForGrad: 'input',
        };
      },
      addProgram() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_PROGRAMS, request_data)
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
