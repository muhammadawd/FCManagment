<template>

  <card class="card" :title="$ml.get('add_program_grades')">
    <div>
      <form @submit.prevent>
        <div class="row">
          <div class="col-md-3">

            <fg-input type="text"
                      v-model="gradeString"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
            <div class="text-left text-danger" id="gradeString_error"></div>
          </div>
          <div class="col-md-12"></div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="fromPercentage"
                      :label="$ml.get('from_grade')"
                      :placeholder="$ml.get('from_grade')">
            </fg-input>
            <div class="text-left text-danger" id="fromPercentage_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="toPercentage"
                      :label="$ml.get('to_grade')"
                      :placeholder="$ml.get('to_grade')">
            </fg-input>
            <div class="text-left text-danger" id="toPercentage_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="gradePoints"
                      :label="$ml.get('points')"
                      :placeholder="$ml.get('points')">
            </fg-input>
            <div class="text-left text-danger" id="gradePoints_error"></div>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="addProgramGrade">
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
    name: "AddProgramGrade",
    data() {
      return {
        gradeString: null,
        fromPercentage: null,
        toPercentage: null,
        gradePoints: null,
      }
    },
    methods: {
      prepareData() {
        let vm = this;
        return {
          gradeString: vm.gradeString,
          fromPercentage: vm.fromPercentage,
          toPercentage: vm.toPercentage,
          gradePoints: vm.gradePoints,
        };
      },
      prepareValidationInputs() {
        return {
          gradeString: 'input',
          fromPercentage: 'input',
          toPercentage: 'input',
          gradePoints: 'input',
        };
      },
      addProgramGrade() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let idprogram = vm.$route.params.program_id;
        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_PROGRAM_GRADES + `?idprogram=${idprogram}`, request_data)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              window.helper.showMessage('success', vm);
              vm.$router.push({name: 'show_program', params: {id: idprogram}});
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
