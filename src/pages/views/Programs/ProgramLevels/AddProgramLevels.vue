<template>

  <card class="card" :title="$ml.get('add_program_levels')">
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
                    @click.native.prevent="addProgramLevel">
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
    name: "AddProgramLevel",
    data() {
      return {
        name: null,
        name_en: null,
        requiredHourToBeInThisLevel: null,
      }
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
      addProgramLevel() {
        let vm = this;
        vm.$root.$children[0].$refs.loader.show_loader = true;

        let idprogram = vm.$route.params.program_id;

        let request_data = vm.prepareData();
        request_data = window.helper.prepareObjectToSend(request_data);

        try {
          window.serviceAPI.API().post(window.serviceAPI.ADD_PROGRAM_LEVELS + `?idprogram=${idprogram}`, request_data)
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
