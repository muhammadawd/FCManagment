<template>

  <card class="card" :title="$ml.get('edit_program_grades')">
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
                    @click.native.prevent="editProgramGrade">
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
    name: "EditProgramGrade",
    data() {
      return {
        gradeString: null,
        fromPercentage: null,
        toPercentage: null,
        gradePoints: null,
      }
    },
    mounted(){
      this.findProgramGrade()
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
      findProgramGrade() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let idprogram = vm.$route.params.program_id;
        let id = vm.$route.params.id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.GET_PROGRAM_GRADES+ `/${id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data.data.result;
              vm.gradeString = response[0].gradeString;
              vm.fromPercentage = response[0].fromPercentage;
              vm.toPercentage = response[0].toPercentage;
              vm.gradePoints = response[0].gradePoints;
            }).catch((error) => {
            vm.$root.$children[0].$refs.loader.show_loader = false;
            window.helper.showMessage('danger', vm);
            vm.$router.push({name: 'show_program', params: {id: idprogram}});
            window.helper.handleError(error, vm);
          });
        } catch (e) {
          window.helper.showMessage('danger', vm);
          vm.$router.push({name: 'show_program', params: {id: idprogram}});
          console.log(e)
        }
      },
      editProgramGrade() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let idprogram = vm.$route.params.program_id;
        let id = vm.$route.params.id;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().put(window.serviceAPI.UPDATE_PROGRAMS_GRADES + `/${id}`, request_data)
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
