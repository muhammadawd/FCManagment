<template>

  <card class="card" :title="$ml.get('edit_program_levels')">
    <div>
      <form @submit.prevent>

        <div class="row">
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="name"
                      :label="$ml.get('name')"
                      :placeholder="$ml.get('name')">
            </fg-input>
            <div class="text-left text-danger" id="name_error"></div>
          </div>
          <div class="col-md-4">
            <fg-input type="text"
                      v-model="name_en"
                      :label="$ml.get('name_en')"
                      :placeholder="$ml.get('name_en')">
            </fg-input>
            <div class="text-left text-danger" id="name_en_error"></div>
          </div>
          <div class="col-md-3">
            <fg-input type="text"
                      v-model="requiredHourToBeInThisLevel"
                      :label="$ml.get('min_hour_level')"
                      :placeholder="$ml.get('min_hour_level')">
              <div class="text-left text-danger" id="requiredHourToBeInThisLevel_error"></div>
            </fg-input>
          </div>
        </div>

        <div class="text-center">
          <p-button type="info"
                    round
                    @click.native.prevent="editProgramLevel">
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
    name: "EditProgramLevel",
    data() {
      return {
        name: null,
        name_en: null,
        requiredHourToBeInThisLevel: null,
      }
    },
    mounted(){
      this.findProgramLevel()
    },
    methods: {
      prepareData() {
        let vm = this;
        return {
          name: vm.name,
          name_en: vm.name_en,
          requiredHourToBeInThisLevel: vm.requiredHourToBeInThisLevel,
        };
      },
      prepareValidationInputs() {
        return {
          name: 'input',
          name_en: 'input',
          requiredHourToBeInThisLevel: 'input',
        };
      },
      findProgramLevel() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;
        let idprogram = vm.$route.params.program_id;
        let id = vm.$route.params.id;
        try {
          window.serviceAPI.API().get(window.serviceAPI.FIND_PROGRAM_LEVELS+ `/${id}`)
            .then((response) => {
              vm.$root.$children[0].$refs.loader.show_loader = false;
              response = response.data.data.result;
              vm.name = response[0].name;
              vm.name_en = response[0].name_en;
              vm.requiredHourToBeInThisLevel = response[0].requiredHourToBeInThisLevel;
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
      editProgramLevel() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let idprogram = vm.$route.params.program_id;
        let id = vm.$route.params.id;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().put(window.serviceAPI.UPDATE_PROGRAMS_LEVELS + `/${id}`, request_data)
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
